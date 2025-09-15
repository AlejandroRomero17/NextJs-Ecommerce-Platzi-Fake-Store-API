"use client";

import { productService } from "@/services";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

// SOLO useProducts, elimina useProduct de aquí
export function useProductList() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => productService.getAll(),
  });
}
