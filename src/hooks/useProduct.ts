// src/app/hooks/useProduct.ts
"use client";

import { productAPI } from "@/utils/api";
import { Product } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => productAPI.getById(id),
    enabled: !!id,
  });
}

export function useRelatedProducts(categoryId?: number, excludeId?: number) {
  return useQuery<Product[]>({
    queryKey: ["related-products", categoryId, excludeId],
    queryFn: () => {
      if (!categoryId) return Promise.resolve([]);
      return productAPI.getByCategory(categoryId);
    },
    enabled: !!categoryId,
    select: (data) => {
      if (!excludeId) return data.slice(0, 4);
      return data.filter((product) => product.id !== excludeId).slice(0, 4);
    },
  });
}
