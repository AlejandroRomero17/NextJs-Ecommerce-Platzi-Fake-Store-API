// src/app/hooks/useHomeData.ts
"use client";

import { categoryAPI, productAPI } from "@/utils/api";
import { Category, Product } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export function useHomeData() {
  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["home-products"],
    queryFn: () => productAPI.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<
    Category[]
  >({
    queryKey: ["home-categories"],
    queryFn: () => categoryAPI.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });

  // Obtener productos destacados (podrías tener una API específica para esto)
  const featuredProducts = products?.slice(10, 16) || []; // Ejemplo: productos del 10 al 15

  return {
    products: products || [],
    categories: categories || [],
    featuredProducts,
    isLoading: productsLoading || categoriesLoading,
  };
}
