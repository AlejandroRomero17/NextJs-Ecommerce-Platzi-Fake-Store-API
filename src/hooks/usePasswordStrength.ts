// hooks/usePasswordStrength.ts
import { defaultValidationRules } from "./useValidation";

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
