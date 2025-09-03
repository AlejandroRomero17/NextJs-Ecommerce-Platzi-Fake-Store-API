// src/utils/api.ts
import axios from "axios";
import {
  Product,
  Category,
  User,
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "./types";


const API_BASE_URL = "https://api.escuelajs.co/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const productAPI = {
  getAll: (): Promise<Product[]> =>
    api.get("/products").then((res) => res.data),
  getById: (id: number): Promise<Product> =>
    api.get(`/products/${id}`).then((res) => res.data),
  getByCategory: (categoryId: number): Promise<Product[]> =>
    api.get(`/products/?categoryId=${categoryId}`).then((res) => res.data),
};

export const categoryAPI = {
  getAll: (): Promise<Category[]> =>
    api.get("/categories").then((res) => res.data),
};

export const authAPI = {
  login: (credentials: LoginCredentials): Promise<{ access_token: string }> =>
    api.post("/auth/login", credentials).then((res) => res.data),
  register: (userData: RegisterData): Promise<User> =>
    api.post("/users", userData).then((res) => res.data),
  getProfile: (token: string): Promise<User> =>
    api
      .get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data),
};




export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export const registerUser = async (userData: RegisterData): Promise<User> => {
  console.log("Datos enviados al registrar:", userData);

  const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    // Intentar obtener el mensaje de error de la respuesta
    let errorMessage = "Registration failed";

    try {
      const errorData = await response.json();
      console.error("Error detallado del servidor:", errorData);

      // Extraer mensaje de error específico si está disponible
      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.statusCode === 400) {
        errorMessage = "Datos inválidos. Verifica la información.";
      }
    } catch (parseError) {
      console.error("No se pudo parsear la respuesta de error:", parseError);
      errorMessage = `Error ${response.status}: ${response.statusText}`;
    }

    throw new Error(errorMessage);
  }

  return response.json();
};

export const getProfile = async (accessToken: string): Promise<User> => {
  const response = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return response.json();
};

export const checkEmailAvailability = async (email: string): Promise<boolean> => {
  const response = await fetch('https://api.escuelajs.co/api/v1/users/is-available', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Email check failed');
  }

  const data = await response.json();
  return data.isAvailable;
};

export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  const response = await fetch('https://api.escuelajs.co/api/v1/auth/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  return response.json();
};


export default api;
