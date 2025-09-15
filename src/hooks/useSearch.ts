"use client";

import { productService, categoryService } from "@/services";
import { Category, Product } from "@/types";

import { useQuery } from "@tanstack/react-query";

export function useSearchProducts() {
  return useQuery<Product[]>({
    queryKey: ["search-products"],
    queryFn: () => productService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}
