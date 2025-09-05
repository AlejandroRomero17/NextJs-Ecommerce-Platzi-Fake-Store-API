// components/auth/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (error) setError("");
  };

  const isFormValid = () => {
    return formData.email.trim() !== "" && formData.password.trim() !== "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("Please complete all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login({
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });
      router.push("/profile");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-background via-background to-muted/20 flex items-start sm:items-center justify-center">
      <div className="w-full max-w-md mx-auto mt-8 sm:mt-0">
        {/* Card Container */}
        <div className="bg-card border border-border rounded-xl shadow-2xl shadow-black/20 backdrop-blur-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 text-center">
            <div className="mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl mx-auto flex items-center justify-center shadow-lg">
                <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-card-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to your account to continue
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
              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-card-foreground"
                >
                  Email Address
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="pl-10 sm:pl-12 h-11 sm:h-12 bg-input border-border focus:border-primary focus:ring-ring/50 transition-all duration-200 text-card-foreground placeholder:text-muted-foreground text-base"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-card-foreground"
                >
                  Password
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="pl-10 sm:pl-12 pr-11 sm:pr-12 h-11 sm:h-12 bg-input border-border focus:border-primary focus:ring-ring/50 transition-all duration-200 text-card-foreground placeholder:text-muted-foreground text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-muted-foreground hover:text-card-foreground transition-colors touch-manipulation"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
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
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
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
                Don&apos;t have an account?{" "}
                <a
                  href="/auth/register"
                  className="text-primary hover:text-primary/80 font-medium transition-colors hover:underline touch-manipulation"
                >
                  Create one here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 sm:mt-6 text-center px-2">
          <p className="text-xs text-muted-foreground leading-relaxed">
            By signing in, you agree to our{" "}
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
