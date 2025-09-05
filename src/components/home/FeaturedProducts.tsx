// src/components/home/FeaturedProducts.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useProducts } from "@/hooks/useProducts";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Eye,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
} from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/utils/types";
import { useState, useRef } from "react";

interface FeaturedProductsProps {
  products?: Product[];
}

export default function FeaturedProducts({
  products: externalProducts,
}: FeaturedProductsProps) {
  const { data: productsFromHook, isLoading } = useProducts();
  const products = externalProducts || productsFromHook || [];
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const scrollRef = useRef<HTMLDivElement>(null);

  if (isLoading && !externalProducts) {
    return <FeaturedProductsSkeleton />;
  }

  if (!products || products.length === 0) return null;

  const featuredProducts = products.slice(0, 6); // Aumentamos a 6 productos
  const mobileProducts = products.slice(0, 4); // 4 para móvil

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 sm:px-6">
        {/* Mobile Header */}
        <div className="block sm:hidden mb-6">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "default" : "outline"}
                    className="w-8 h-8 p-0"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "outline"}
                    className="w-8 h-8 p-0"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Productos Populares
              </h2>
              <p className="text-sm text-muted-foreground">
                Lo más vendido esta semana
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:block text-center mb-8 lg:mb-12">
          <Badge className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 border-primary/20">
            <Sparkles className="w-4 h-4" />
            Destacados
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Productos Populares
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Descubre los productos más vendidos y mejor valorados por nuestra
            comunidad
          </p>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="block sm:hidden mb-6">
          <div className="relative">
            {/* Scroll Controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>{mobileProducts.length} productos</span>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-8 h-8 p-0"
                  onClick={scrollLeft}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-8 h-8 p-0"
                  onClick={scrollRight}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Scrollable Products - MODIFICADO */}
            <div className="relative">
              <div
                ref={scrollRef}
                className="flex gap-3 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {mobileProducts.map((product) => (
                  <div key={product.id} className="flex-none w-72 snap-start">
                    {viewMode === "grid" ? (
                      <ProductCard
                        product={product}
                        showCategory={true}
                        showActions={true}
                        className="h-full"
                      />
                    ) : (
                      <Card className="h-full">
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm text-foreground truncate mb-1">
                                {product.title}
                              </h3>
                              <p className="text-lg font-bold text-primary mb-1">
                                ${product.price}
                              </p>
                              <Badge variant="secondary" className="text-xs">
                                {product.category?.name}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tablet & Desktop: Grid Layout */}
        <div className="hidden sm:block">
          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="group">
                {/* Featured Badge for first product */}
                {index === 0 && (
                  <div className="relative">
                    <Badge className="absolute -top-2 left-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 text-xs font-bold shadow-lg">
                      #1 Bestseller
                    </Badge>
                  </div>
                )}
                <ProductCard
                  product={product}
                  showCategory={true}
                  showActions={true}
                  className="h-full group-hover:shadow-lg transition-shadow duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section - Mobile */}
        <div className="block sm:hidden mb-6">
          <Card className="bg-card/30 border-border/50">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-foreground">2.5K+</div>
                  <div className="text-xs text-muted-foreground">Products</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">98%</div>
                  <div className="text-xs text-muted-foreground">Satisfied</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">24h</div>
                  <div className="text-xs text-muted-foreground">Shipping</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section - Desktop
        <div className="hidden sm:block mb-8">
          <Card className="bg-gradient-to-r from-card/50 to-card/30 border-border/50">
            <CardContent className="p-6">
              <div className="flex justify-center items-center gap-8 lg:gap-12">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    2.5K+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Products Available
                  </div>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    98%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Customer Satisfaction
                  </div>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    24h
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Fast Shipping
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* CTA Section */}
        <div className="text-center space-y-4">
          {/* Mobile CTA */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
                asChild
              >
                <Link href="/search">
                  <Eye className="w-4 h-4 mr-1" />
                  Ver Todo
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/categories">
                  Categorías
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/search">
                Ver todos los productos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-card hover:bg-card/80 border-border hover:border-primary/50"
              asChild
            >
              <Link href="/categories">Explorar categorías</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente de skeleton mejorado
function FeaturedProductsSkeleton() {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 sm:px-6">
        {/* Mobile Skeleton */}
        <div className="block sm:hidden">
          <Card className="bg-card/50 border-border/50 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-6 w-20" />
                <div className="flex gap-1">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex-none w-64 min-w-[16rem]">
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-32 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 flex-1" />
                      <Skeleton className="h-8 flex-1" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Skeleton */}
        <div className="hidden sm:block">
          <div className="text-center mb-8 lg:mb-12">
            <Skeleton className="h-8 w-32 mx-auto mb-4" />
            <Skeleton className="h-10 w-80 mx-auto mb-3" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-4">
                  <Skeleton className="h-40 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 flex-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex justify-center items-center gap-8 lg:gap-12">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="text-center">
                    <Skeleton className="h-8 w-16 mx-auto mb-2" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <div className="flex justify-center gap-4">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
