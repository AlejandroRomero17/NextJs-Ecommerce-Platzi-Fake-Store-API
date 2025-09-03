// components/auth/LoginForm.tsx - VERSIÓN CORREGIDA
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login({ email, password });
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
    <div className="p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md mx-auto">
        {/* Card Container */}
        <div className="bg-card border border-border rounded-xl shadow-2xl shadow-black/20 backdrop-blur-sm overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl mx-auto flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-card-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form Content */}
          <div className="px-8 pb-8">
            {error && (
              <Alert
                variant="destructive"
                className="mb-6 border-destructive/50 bg-destructive/10"
              >
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-card-foreground"
                >
                  Email Address
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="pl-12 h-12 bg-input border-border focus:border-primary focus:ring-ring/50 transition-all duration-200 text-card-foreground placeholder:text-muted-foreground"
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
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="pl-12 pr-12 h-12 bg-input border-border focus:border-primary focus:ring-ring/50 transition-all duration-200 text-card-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-card-foreground transition-colors"
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
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-200 group"
                disabled={isLoading}
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
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <a
                  href="/auth/register"
                  className="text-primary hover:text-primary/80 font-medium transition-colors hover:underline"
                >
                  Create one here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};
