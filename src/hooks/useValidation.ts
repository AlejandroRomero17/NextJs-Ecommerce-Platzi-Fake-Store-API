// hooks/useValidation.ts
import { useState, useCallback } from "react";

// Tipos para validación
export interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

export interface FieldValidation {
  isValid: boolean;
  message: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

// Reglas de validación reutilizables
export const defaultValidationRules: ValidationRules = {
  name: [
    {
      test: (value: string) => value.length >= 2,
      message: "Mínimo 2 caracteres",
    },
    {
      test: (value: string) => /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(value),
      message: "Solo letras y espacios",
    },
    {
      test: (value: string) => value.length <= 50,
      message: "Máximo 50 caracteres",
    },
  ],
  email: [
    {
      test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Email inválido",
    },
    {
      test: (value: string) => value.length <= 100,
      message: "Email muy largo",
    },
  ],
  password: [
    {
      test: (value: string) => value.length >= 8,
      message: "Mínimo 8 caracteres",
    },
    {
      test: (value: string) => /[A-Z]/.test(value),
      message: "Una mayúscula",
    },
    {
      test: (value: string) => /[a-z]/.test(value),
      message: "Una minúscula",
    },
    { test: (value: string) => /\d/.test(value), message: "Un número" },
    // ELIMINADA la validación de carácter especial:
    // {
    //   test: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    //   message: "Un carácter especial",
    // },
  ],
};

// Hook personalizado para validaciones
export const useValidation = (validationRules: ValidationRules) => {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback(
    (
      name: string,
      value: string,
      allValues?: Record<string, string>
    ): FieldValidation => {
      // Validación especial para confirmación de contraseña
      if (name === "confirmPassword" && allValues) {
        const isValid = value === allValues.password;
        return {
          isValid,
          message: isValid ? "" : "Las contraseñas no coinciden",
        };
      }

      const rules = validationRules[name];
      if (!rules) return { isValid: true, message: "" };

      for (const rule of rules) {
        if (!rule.test(value)) {
          return { isValid: false, message: rule.message };
        }
      }

      return { isValid: true, message: "" };
    },
    [validationRules]
  );

  const validateForm = useCallback(
    (formData: Record<string, string>): Record<string, string> => {
      const errors: Record<string, string> = {};

      Object.keys(formData).forEach((field) => {
        if (field !== "avatar") {
          // Excluir campos que no necesitan validación
          const validation = validateField(field, formData[field], formData);
          if (!validation.isValid) {
            errors[field] = validation.message;
          }
        }
      });

      return errors;
    },
    [validateField]
  );

  return {
    fieldErrors,
    fieldTouched,
    setFieldErrors,
    setFieldTouched,
    validateField,
    validateForm,
  };
};

// Hook para fortaleza de contraseña
export const usePasswordStrength = () => {
  const getPasswordStrength = (password: string) => {
    const rules = defaultValidationRules.password;
    const passedRules = rules.filter((rule) => rule.test(password)).length;

    // Ajustar los porcentajes ya que ahora solo hay 4 reglas en lugar de 5
    if (passedRules <= 1)
      return {
        strength: "weak",
        color: "bg-red-500",
        text: "Débil",
        percentage: 25,
      };
    if (passedRules <= 2)
      return {
        strength: "medium",
        color: "bg-yellow-500",
        text: "Media",
        percentage: 50,
      };
    if (passedRules <= 3)
      return {
        strength: "good",
        color: "bg-blue-500",
        text: "Buena",
        percentage: 75,
      };
    return {
      strength: "strong",
      color: "bg-green-500",
      text: "Fuerte",
      percentage: 100,
    };
  };

  return { getPasswordStrength };
};
