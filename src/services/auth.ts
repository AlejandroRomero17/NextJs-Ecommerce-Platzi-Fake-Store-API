import { api, handleAPIError } from "./api";
import { User, LoginCredentials, RegisterData, AuthResponse } from "../types";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  },

  register: async (userData: RegisterData): Promise<User> => {
    try {
      console.log("Datos enviados al registrar:", userData);
      const response = await api.post("/users", userData);
      return response.data;
    } catch (error) {
      console.error("Error detallado del servidor:", error);
      throw new Error(handleAPIError(error));
    }
  },

  getProfile: async (token?: string): Promise<User> => {
    try {
      // Si se pasa token específico, usar ese token
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await api.get("/auth/profile", { headers });
      return response.data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    try {
      const response = await api.post("/auth/refresh-token", { refreshToken });
      return response.data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  },

  checkEmailAvailability: async (email: string): Promise<boolean> => {
    try {
      const response = await api.post("/users/is-available", { email });
      return response.data.isAvailable;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  },
};
