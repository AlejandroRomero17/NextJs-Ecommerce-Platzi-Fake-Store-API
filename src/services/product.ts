import { api, handleAPIError } from "./api";
import { Product } from "../types/product";

export const productService = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  },

  getById: async (id: number): Promise<Product> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  },

  getByCategory: async (categoryId: number): Promise<Product[]> => {
    try {
      const response = await api.get(`/products/?categoryId=${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  },
};
