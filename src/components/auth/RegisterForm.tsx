"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  useValidation,
  usePasswordStrength,
  defaultValidationRules,
} from "@/hooks/useValidation";
import { ValidatedInput } from "@/components/common/ValidatedInput";
import { PasswordStrengthIndicator } from "@/components/common/PasswordStrengthIndicator";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import {
  User,
  Mail,
  Lock,
  AlertCircle,
  UserPlus,
  ArrowRight,
} from "lucide-react";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "https://i.imgur.com/6VBx3io.png",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  // Validation hooks
  const {
    fieldErrors,
    fieldTouched,
    setFieldErrors,
    setFieldTouched,
    validateField,
    validateForm,
  } = useValidation(defaultValidationRules);

  const { getPasswordStrength } = usePasswordStrength();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldTouched[name]) {
      const validation = validateField(name, value, formData);
      setFieldErrors((prev) => ({
        ...prev,
        [name]: validation.isValid ? "" : validation.message,
      }));
    }

    if (name === "password" && fieldTouched.confirmPassword) {
      const confirmValidation = validateField(
        "confirmPassword",
        formData.confirmPassword,
        { ...formData, password: value }
      );
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: confirmValidation.isValid
          ? ""
          : confirmValidation.message,
      }));
    }

    if (error) setError("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFieldTouched((prev) => ({ ...prev, [name]: true }));

    const validation = validateField(
      name,
      formData[name as keyof typeof formData],
      formData
    );
    setFieldErrors((prev) => ({
      ...prev,
      [name]: validation.isValid ? "" : validation.message,
    }));
  };

  const isFormValid = () => {
    const errors = validateForm(formData);
    return (
      Object.keys(errors).length === 0 &&
      Object.values(formData).every((value) => value.trim() !== "")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const allFields = ["name", "email", "password", "confirmPassword"];
    const newTouched = allFields.reduce(
      (acc, field) => ({ ...acc, [field]: true }),
      {}
    );
    setFieldTouched(newTouched);

    const errors = validateForm(formData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError("Por favor corrige los errores antes de continuar");
      return;
    }

    if (!isFormValid()) {
      setError("Por favor completa todos los campos correctamente");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        avatar: formData.avatar,
      });
      router.push("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error de registro. Por favor intenta de nuevo.";

      if (
        errorMessage.includes("400") ||
        errorMessage.includes("Bad Request")
      ) {
        setError("El correo ya está registrado o los datos son inválidos");
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-xl shadow-lg backdrop-blur-sm overflow-hidden">
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 text-center">
          <div className="mb-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl mx-auto flex items-center justify-center shadow-lg">
              <UserPlus className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-card-foreground mb-2">
            Crear cuenta
          </h1>
          <p className="text-muted-foreground text-sm">
            Únete a nuestra comunidad hoy
          </p>
        </div>

        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          {error && (
            <Alert
              variant="destructive"
              className="mb-6 border-destructive/50 bg-destructive/10"
            >
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <ValidatedInput
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa tu nombre completo"
                label="Nombre completo"
                icon={<User className="w-5 h-5" />}
                error={fieldErrors.name}
                touched={fieldTouched.name}
              />
            </div>

            <div className="space-y-2">
              <ValidatedInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="ejemplo@correo.com"
                label="Correo electrónico"
                icon={<Mail className="w-5 h-5" />}
                error={fieldErrors.email}
                touched={fieldTouched.email}
              />
            </div>

            <div className="space-y-3">
              <ValidatedInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Crea una contraseña segura"
                label="Contraseña"
                icon={<Lock className="w-5 h-5" />}
                error={fieldErrors.password}
                touched={fieldTouched.password}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              {formData.password && (
                <div className="bg-muted/50 border border-border p-3 rounded-md">
                  <PasswordStrengthIndicator
                    password={formData.password}
                    strength={passwordStrength}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <ValidatedInput
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirma tu contraseña"
                label="Confirmar contraseña"
                icon={<Lock className="w-5 h-5" />}
                error={fieldErrors.confirmPassword}
                touched={fieldTouched.confirmPassword}
                showPassword={showConfirmPassword}
                onTogglePassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className={`w-full h-11 sm:h-12 font-medium shadow-lg transition-all duration-200 group touch-manipulation ${
                  isFormValid() && !isLoading
                    ? "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                    : "bg-muted text-muted-foreground cursor-not-allowed hover:bg-muted hover:text-muted-foreground hover:shadow-lg hover:translate-y-0"
                }`}
                disabled={!isFormValid() || isLoading}
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    <>
                      Crear cuenta
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </div>
          </form>

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <a
                href="/auth/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors hover:underline touch-manipulation"
              >
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 text-center px-2">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Al crear una cuenta, aceptas nuestros{" "}
          <a
            href="/terms"
            className="text-muted-foreground hover:text-card-foreground underline transition-colors touch-manipulation"
          >
            Términos de Servicio
          </a>{" "}
          y{" "}
          <a
            href="/privacy"
            className="text-muted-foreground hover:text-card-foreground underline transition-colors touch-manipulation"
          >
            Política de Privacidad
          </a>
        </p>
      </div>
    </div>
  );
};
