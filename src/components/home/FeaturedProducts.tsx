// src/components/home/FeaturedProducts.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/utils/types";

interface FeaturedProductsProps {
  products?: Product[]; // Cambiar initialProducts por products
}

export default function FeaturedProducts({
  products: externalProducts, // Renombrar para claridad
}: FeaturedProductsProps) {
  // Si recibimos productos externos, los usamos directamente
  // Si no, usamos el hook useProducts
  const { data: productsFromHook, isLoading } = useProducts();
  const products = externalProducts || productsFromHook || [];

  if (isLoading && !externalProducts) {
    return <FeaturedProductsSkeleton />;
  }

  if (!products || products.length === 0) return null;

  // Mostrar solo 3 productos destacados
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="py-12 bg-background">
      <div className="container">
        {/* Header simple */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Destacados
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Productos Populares
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre los productos más vendidos y mejor valorados
          </p>
        </div>

        {/* Grid de 3 productos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showCategory={true}
              showActions={true}
            />
          ))}
        </div>

        {/* Botón para ver más */}
        <div className="text-center">
          <Link href="/search">
            <Button className="bg-primary hover:bg-primary/90">
              Ver todos los productos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Componente de skeleton simplificado (sin cambios)
function FeaturedProductsSkeleton() {
  return (
    <section className="py-12 bg-background">
      <div className="container">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-40 mx-auto mb-4" />
          <Skeleton className="h-10 w-80 mx-auto mb-3" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </div>
    </section>
  );
}
