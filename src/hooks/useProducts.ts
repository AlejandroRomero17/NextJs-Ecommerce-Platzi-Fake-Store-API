// src/app/hooks/useProducts.ts
"use client";

import { productAPI } from "@/utils/api";
import { Product } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => productAPI.getAll(),
  });
}

export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => productAPI.getById(id),
    enabled: !!id,
  });
}
