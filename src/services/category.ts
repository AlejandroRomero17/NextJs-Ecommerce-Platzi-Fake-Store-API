import { api, handleAPIError } from "./api";
import { Category } from "../types/category";

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await api.get("/categories");
      return response.data;
    } catch (error) {
      throw new Error(handleAPIError(error));
    }
  },
};
