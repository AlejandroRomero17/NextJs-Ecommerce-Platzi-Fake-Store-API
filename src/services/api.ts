import axios, { AxiosError } from "axios";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";

// Configuración base de axios
export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interfaz para errores de API
interface APIErrorResponse {
  message?: string;
  statusCode?: number;
  error?: string;
}

// Helper para manejo centralizado de errores
export const handleAPIError = (error: unknown): string => {
  // Si es un error de Axios
  if (error instanceof AxiosError) {
    if (error.response) {
      // Error de respuesta del servidor
      const { status, data } = error.response;
      const apiError = data as APIErrorResponse;

      if (apiError?.message) {
        return apiError.message;
      }

      switch (status) {
        case 400:
          return "Datos inválidos. Verifica la información.";
        case 401:
          return "No tienes autorización. Inicia sesión nuevamente.";
        case 404:
          return "Recurso no encontrado.";
        case 500:
          return "Error del servidor. Intenta más tarde.";
        default:
          return `Error ${status}: ${error.response.statusText}`;
      }
    }

    if (error.request) {
      return "Error de conexión. Verifica tu internet.";
    }

    return error.message || "Ha ocurrido un error inesperado.";
  }

  // Si es un error genérico con mensaje
  if (error instanceof Error) {
    return error.message;
  }

  // Si es un string
  if (typeof error === "string") {
    return error;
  }

  // Fallback para cualquier otro tipo de error
  return "Ha ocurrido un error inesperado.";
};
