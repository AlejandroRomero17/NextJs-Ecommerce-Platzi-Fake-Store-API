import { User, RegisterData } from "./user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string; // Opcional porque no siempre viene
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<User>; // Devuelve el usuario
  register: (userData: RegisterData) => Promise<User>; // Devuelve el usuario
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<User>; // Devuelve el usuario actualizado
}
