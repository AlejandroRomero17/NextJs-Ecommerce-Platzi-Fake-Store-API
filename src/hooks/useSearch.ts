// src/app/hooks/useSearch.ts
"use client";

import { categoryAPI, productAPI } from "@/utils/api";
import { Category, Product } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export function useSearchProducts() {
  return useQuery<Product[]>({
    queryKey: ["search-products"],
    queryFn: () => productAPI.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => categoryAPI.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}
