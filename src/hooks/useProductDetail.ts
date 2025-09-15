"use client";

import { productService } from "@/services";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useProductDetail(id: number) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
}

export function useRelatedProducts(categoryId?: number, excludeId?: number) {
  return useQuery<Product[]>({
    queryKey: ["related-products", categoryId, excludeId],
    queryFn: () => {
      if (!categoryId) return Promise.resolve([]);
      return productService.getByCategory(categoryId);
    },
    enabled: !!categoryId,
    select: (data) => {
      if (!excludeId) return data.slice(0, 4);
      return data.filter((product) => product.id !== excludeId).slice(0, 4);
    },
  });
}
