import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, AlertCircle, Eye, EyeOff } from "lucide-react";

interface ValidatedInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  touched?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  icon,
  error,
  touched,
  showPassword,
  onTogglePassword,
}) => {
  const hasError = touched && error;

  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 flex items-center gap-2"
      >
        {icon}
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`pl-4 pr-10 h-12 text-base transition-all duration-200 ${
            touched
              ? error
                ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                : "border-green-400 focus:border-green-500 focus:ring-green-200"
              : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
          }`}
          placeholder={placeholder}
        />
        {touched && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {error ? (
              <XCircle className="w-5 h-5 text-red-500" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
          </div>
        )}
        {onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {hasError && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};
