// components/ui/PasswordStrengthIndicator.tsx
import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { defaultValidationRules } from "@/hooks/useValidation";

interface PasswordStrengthIndicatorProps {
  password: string;
  strength: {
    strength: string;
    color: string;
    text: string;
    percentage: number;
  };
}

export const PasswordStrengthIndicator: React.FC<
  PasswordStrengthIndicatorProps
> = ({ password, strength }) => {
  const rules = defaultValidationRules.password;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${strength.percentage}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-600">
          {strength.text}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-1">
        {rules.map((rule, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            {rule.test(password) ? (
              <CheckCircle2 className="w-3 h-3 text-green-500" />
            ) : (
              <XCircle className="w-3 h-3 text-gray-400" />
            )}
            <span
              className={
                rule.test(password) ? "text-green-600" : "text-gray-500"
              }
            >
              {rule.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
