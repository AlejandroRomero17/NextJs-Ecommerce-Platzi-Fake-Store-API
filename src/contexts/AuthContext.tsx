"use client";

import { authService } from "@/services";
import { AuthContextType, LoginCredentials, RegisterData, User } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
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
        const userProfile = await authService.getProfile(accessToken);
        setUser(userProfile);
      } else if (refreshTokenValue) {
        // Intentar renovar el token
        try {
          const tokens = await authService.refreshToken(refreshTokenValue);
          localStorage.setItem("access_token", tokens.access_token);
          if (tokens.refresh_token) {
            localStorage.setItem("refresh_token", tokens.refresh_token);
          }
          setToken(tokens.access_token);

          const userProfile = await authService.getProfile(tokens.access_token);
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

  const login = async (credentials: LoginCredentials): Promise<User> => {
    try {
      setIsLoading(true);
      const tokens = await authService.login(credentials);

      // Guardar tokens en localStorage
      localStorage.setItem("access_token", tokens.access_token);
      if (tokens.refresh_token) {
        localStorage.setItem("refresh_token", tokens.refresh_token);
      }
      setToken(tokens.access_token);

      // Obtener perfil del usuario
      const userProfile = await authService.getProfile(tokens.access_token);
      setUser(userProfile);

      return userProfile; // Devolver el usuario como promete el tipo
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<User> => {
    try {
      setIsLoading(true);
      // Registrar usuario
      // const newUser = await authService.register(userData);

      // Iniciar sesión automáticamente después del registro
      const loggedInUser = await login({
        email: userData.email,
        password: userData.password,
      });

      return loggedInUser; // Devolver el usuario como promete el tipo
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

  const updateProfile = async (userData: Partial<User>): Promise<User> => {
    // TODO: Implementar actualización de perfil cuando la API lo soporte
    console.log("Update profile:", userData);

    // Por ahora, actualizar el estado local y devolver el usuario actualizado
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      return updatedUser;
    }

    throw new Error("No hay usuario autenticado para actualizar");
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
