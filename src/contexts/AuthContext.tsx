// contexts/AuthContext.tsx (versión con token)
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthContextType,
} from "@/utils/types";
import { loginUser, registerUser, getProfile, refreshToken } from "@/utils/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const refreshTokenValue = localStorage.getItem("refresh_token");

      if (accessToken) {
        setToken(accessToken);
        // Verificar si el token es válido
        const userProfile = await getProfile(accessToken);
        setUser(userProfile);
      } else if (refreshTokenValue) {
        // Intentar renovar el token
        try {
          const tokens = await refreshToken(refreshTokenValue);
          localStorage.setItem("access_token", tokens.access_token);
          localStorage.setItem("refresh_token", tokens.refresh_token);
          setToken(tokens.access_token);

          const userProfile = await getProfile(tokens.access_token);
          setUser(userProfile);
        } catch {
          // Si el refresh token también es inválido, limpiar todo
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setToken(null);
        }
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const tokens = await loginUser(credentials);

      // Guardar tokens en localStorage
      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);
      setToken(tokens.access_token);

      // Obtener perfil del usuario
      const userProfile = await getProfile(tokens.access_token);
      setUser(userProfile);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      // Registrar usuario
      await registerUser(userData);

      // Iniciar sesión automáticamente después del registro
      await login({ email: userData.email, password: userData.password });
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setToken(null);
  };

  const updateProfile = async (userData: Partial<User>) => {
    // Implementar actualización de perfil
    console.log("Update profile:", userData);
    // Aquí iría la llamada a la API para actualizar el perfil
  };

  const value: AuthContextType = {
    user,
    token, // Agregar token al contexto
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
