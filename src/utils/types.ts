// src/utils/types.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}


export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null; // Agregar esta propiedad
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}
