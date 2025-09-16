"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  ArrowRight,
  Star,
  Truck,
  Shield,
  Zap,
  ChevronDown,
  Heart,
  Share2,
  TrendingUp,
} from "lucide-react";
import { Product } from "@/types";

// Configuración de categorías destacadas con fallback
const FEATURED_CATEGORIES = [
  { id: 2, name: "Electronics", fallbackTitle: "Latest Tech Innovation" },
];

// Producto de fallback por si todo falla
const FALLBACK_PRODUCT: Product = {
  id: 999,
  title: "Premium Collection",
  price: 199.99,
  description:
    "Discover our carefully curated premium collection featuring the latest trends and highest quality products.",
  images: ["/placeholder-product.jpg"],
  category: { id: 0, name: "Featured", image: "" },
};

export default function HeroSection() {
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // Función para obtener productos de una categoría específica
  async function fetchProductFromCategory(
    categoryId: number
  ): Promise<Product | null> {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${categoryId}/products?limit=10`
      );

      if (!response.ok)
        throw new Error(`Failed to fetch from category ${categoryId}`);

      const products = await response.json();

      if (products && products.length > 0) {
        // Filtrar productos válidos (con título e imagen)
        const validProducts = products.filter(
          (product: Product) =>
            product.title &&
            product.images &&
            product.images.length > 0 &&
            product.images[0] !== "[]" &&
            product.images[0].startsWith("http")
        );

        if (validProducts.length > 0) {
          // Seleccionar un producto aleatorio de los válidos
          const randomIndex = Math.floor(Math.random() * validProducts.length);
          return validProducts[randomIndex];
        }
      }
      return null;
    } catch (error) {
      console.error(
        `Error fetching products from category ${categoryId}:`,
        error
      );
      return null;
    }
  }

  // Función para obtener cualquier producto disponible como último recurso
  async function fetchAnyAvailableProduct(): Promise<Product | null> {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/products?limit=20"
      );

      if (!response.ok) throw new Error("Failed to fetch any products");

      const products = await response.json();

      if (products && products.length > 0) {
        const validProducts = products.filter(
          (product: Product) =>
            product.title &&
            product.images &&
            product.images.length > 0 &&
            product.images[0] !== "[]" &&
            product.images[0].startsWith("http")
        );

        if (validProducts.length > 0) {
          const randomIndex = Math.floor(Math.random() * validProducts.length);
          return validProducts[randomIndex];
        }
      }
      return null;
    } catch (error) {
      console.error("Error fetching any available product:", error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchFeaturedProduct() {
      try {
        // Intentar con cada categoría hasta encontrar una que funcione
        for (let i = 0; i < FEATURED_CATEGORIES.length; i++) {
          const categoryIndex =
            (currentCategoryIndex + i) % FEATURED_CATEGORIES.length;
          const category = FEATURED_CATEGORIES[categoryIndex];

          console.log(`Trying category: ${category.name} (ID: ${category.id})`);

          const product = await fetchProductFromCategory(category.id);

          if (product) {
            setFeaturedProduct(product);
            setCurrentCategoryIndex(categoryIndex);
            console.log(`Success with category: ${category.name}`);
            return;
          }
        }

        // Si ninguna categoría específica funciona, intentar obtener cualquier producto
        console.log("Trying to fetch any available product...");
        const anyProduct = await fetchAnyAvailableProduct();

        if (anyProduct) {
          setFeaturedProduct(anyProduct);
          return;
        }

        // Si todo falla, usar el producto de fallback
        console.log("Using fallback product");
        setFeaturedProduct(FALLBACK_PRODUCT);
      } catch (error) {
        console.error("Error in fetchFeaturedProduct:", error);
        setFeaturedProduct(FALLBACK_PRODUCT);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProduct();
  }, [currentCategoryIndex]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 px-4">
        <Card className="w-full max-w-sm">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground animate-pulse">
              Cargando experiencia premium...
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  const firstImage = featuredProduct?.images?.[0] || "/placeholder-product.jpg";
  const hasValidImage =
    firstImage &&
    firstImage !== "[]" &&
    firstImage !== "/placeholder-product.jpg" &&
    firstImage.startsWith("http");

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-muted/10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center w-full min-h-screen py-8 sm:py-12 lg:py-20">
          <div className="flex justify-center order-1 lg:order-2">
            <Card className="w-full max-w-md lg:max-w-lg bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl">
              <CardContent className="p-4 sm:p-6 lg:p-8 relative">
                <Badge className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground px-3 py-1 text-xs font-bold shadow-lg z-10 rounded-full">
                  30% OFF
                </Badge>

                <div className="absolute top-4 left-4 flex flex-col gap-2 sm:hidden z-10">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-10 h-10 p-0 rounded-full bg-card/80 backdrop-blur-sm"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-10 h-10 p-0 rounded-full bg-card/80 backdrop-blur-sm"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="relative h-64 sm:h-80 lg:h-96 w-full flex items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40">
                  {hasValidImage ? (
                    <Image
                      src={firstImage}
                      alt={featuredProduct?.title || "Featured product"}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <Star className="w-8 h-8 text-primary" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          Producto Premium
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 sm:hidden">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="px-3 py-1 text-xs">
                      {featuredProduct?.category?.name || "Premium"}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-foreground leading-tight mb-2">
                    {featuredProduct?.title || "Producto Premium"}
                  </h2>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-primary">
                      ${featuredProduct?.price || "199.99"}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${((featuredProduct?.price || 199.99) * 1.3).toFixed(2)}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {featuredProduct?.description ||
                      "Experimenta la tecnología de vanguardia con diseño premium."}
                  </p>

                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 whitespace-nowrap text-xs"
                    >
                      <Truck className="w-3 h-3" />
                      Envío Gratis
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 whitespace-nowrap text-xs"
                    >
                      <Shield className="w-3 h-3" />2 Años de Garantía
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 whitespace-nowrap text-xs"
                    >
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-md"
                      asChild
                    >
                      <Link href={`/product/${featuredProduct?.id || 1}`}>
                        <ShoppingCart className="mr-1 h-4 w-4" />
                        Comprar Ahora
                      </Link>
                    </Button>

                    <Button variant="outline" size="sm" asChild>
                      <Link href="/products">
                        Ver Todo
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="hidden sm:block mt-6 text-center">
                  <Badge variant="secondary" className="px-4 py-2">
                    {featuredProduct?.category?.name || "Premium"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="hidden sm:block space-y-8 text-center lg:text-left order-2 lg:order-1">
            <Badge className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              Producto Destacado
            </Badge>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                {featuredProduct?.title || "Colección Premium"}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                {featuredProduct?.description ||
                  "Experimenta la tecnología de vanguardia con diseño premium y rendimiento incomparable."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  ${featuredProduct?.price || "199.99"}
                </div>
                <div className="text-sm text-muted-foreground line-through">
                  ${((featuredProduct?.price || 199.99) * 1.3).toFixed(2)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">
                  (2,847+ reseñas)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <Card className="border-border bg-card/50">
                <CardContent className="flex items-center gap-2 px-4 py-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <span className="text-sm text-card-foreground font-medium">
                    Envío Gratis
                  </span>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/50">
                <CardContent className="flex items-center gap-2 px-4 py-2">
                  <Shield className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-card-foreground font-medium">
                    2 Años de Garantía
                  </span>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href={`/product/${featuredProduct?.id || 1}`}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Comprar Ahora
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 bg-card hover:bg-card/80 border-border hover:border-primary/50 text-card-foreground transition-all duration-300"
                asChild
              >
                <Link href="/search">Ver Todos los Productos</Link>
              </Button>
            </div>

            <Card className="bg-card/30 border-border/50">
              <CardContent className="flex justify-center lg:justify-start gap-8 p-6">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-foreground">
                    50K+
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Clientes Satisfechos
                  </div>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-foreground">
                    4.9/5
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Rating
                  </div>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-foreground">
                    24h
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Entrega Rápida
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile stats */}
          <div className="sm:hidden order-3 space-y-4">
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-foreground">
                      50K+
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Clientes
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">
                      4.9★
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Calificación
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">24h</div>
                    <div className="text-xs text-muted-foreground">Entrega</div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
