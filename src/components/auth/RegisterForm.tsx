// components/auth/RegisterForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  useValidation,
  usePasswordStrength,
  defaultValidationRules,
} from "@/hooks/useValidation";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { PasswordStrengthIndicator } from "@/components/ui/PasswordStrengthIndicator";
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

    // Real-time validation if field was already touched
    if (fieldTouched[name]) {
      const validation = validateField(name, value, formData);
      setFieldErrors((prev) => ({
        ...prev,
        [name]: validation.isValid ? "" : validation.message,
      }));
    }

    // Validate password confirmation if main password changed
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

    // Clear general error
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

    // Mark all fields as touched
    const allFields = ["name", "email", "password", "confirmPassword"];
    const newTouched = allFields.reduce(
      (acc, field) => ({ ...acc, [field]: true }),
      {}
    );
    setFieldTouched(newTouched);

    // Validate all fields
    const errors = validateForm(formData);
    setFieldErrors(errors);

    // Stop if there are errors
    if (Object.keys(errors).length > 0) {
      setError("Please correct the errors before continuing");
      return;
    }

    if (!isFormValid()) {
      setError("Please complete all fields correctly");
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
          : "Registration error. Please try again.";

      if (
        errorMessage.includes("400") ||
        errorMessage.includes("Bad Request")
      ) {
        setError("Email is already registered or data is invalid");
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-background via-background to-muted/20 flex items-start sm:items-center justify-center">
      <div className="w-full max-w-md mx-auto mt-8 sm:mt-0">
        {/* Card Container */}
        <div className="bg-card border border-border rounded-xl shadow-2xl shadow-black/20 backdrop-blur-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 text-center">
            <div className="mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl mx-auto flex items-center justify-center shadow-lg">
                <UserPlus className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-card-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground text-sm">
              Join our community today
            </p>
          </div>

          {/* Form Content */}
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
              {/* Name Field */}
              <div className="space-y-2">
                <ValidatedInput
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  label="Full Name"
                  icon={<User className="w-5 h-5" />}
                  error={fieldErrors.name}
                  touched={fieldTouched.name}
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <ValidatedInput
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="example@email.com"
                  label="Email Address"
                  icon={<Mail className="w-5 h-5" />}
                  error={fieldErrors.email}
                  touched={fieldTouched.email}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <ValidatedInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Create a secure password"
                  label="Password"
                  icon={<Lock className="w-5 h-5" />}
                  error={fieldErrors.password}
                  touched={fieldTouched.password}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="bg-muted/50 border border-border p-3 rounded-md">
                    <PasswordStrengthIndicator
                      password={formData.password}
                      strength={passwordStrength}
                    />
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <ValidatedInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  label="Confirm Password"
                  icon={<Lock className="w-5 h-5" />}
                  error={fieldErrors.confirmPassword}
                  touched={fieldTouched.confirmPassword}
                  showPassword={showConfirmPassword}
                  onTogglePassword={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                />
              </div>

              {/* Submit Button */}
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
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="text-primary hover:text-primary/80 font-medium transition-colors hover:underline touch-manipulation"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 sm:mt-6 text-center px-2">
          <p className="text-xs text-muted-foreground leading-relaxed">
            By creating an account, you agree to our{" "}
            <a
              href="/terms"
              className="text-muted-foreground hover:text-card-foreground underline transition-colors touch-manipulation"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-muted-foreground hover:text-card-foreground underline transition-colors touch-manipulation"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
