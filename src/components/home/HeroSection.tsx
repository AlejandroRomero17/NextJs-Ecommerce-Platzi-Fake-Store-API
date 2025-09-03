// src/components/home/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  ArrowRight,
  Star,
  Truck,
  Shield,
  Zap,
  ChevronDown,
} from "lucide-react";
import { Product } from "@/utils/types";

export default function HeroSection() {
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProduct() {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products/6"
        );
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setFeaturedProduct(data);
      } catch (error) {
        console.error("Error fetching featured product:", error);
        setFeaturedProduct({
          id: 1,
          title: "SmartWatch Pro Series X",
          price: 199.99,
          description:
            "Experience the future on your wrist with our latest generation smartwatch.",
          images: ["/placeholder-watch.jpg"],
          category: { id: 3, name: "Electronics", image: "" },
        });
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProduct();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground animate-pulse">
            Loading premium experience...
          </p>
        </div>
      </section>
    );
  }

  const firstImage = featuredProduct?.images?.[0] || "/placeholder-watch.jpg";
  const hasValidImage =
    firstImage && firstImage !== "[]" && firstImage.startsWith("http");

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-muted/10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full min-h-screen py-20">
          {/* Content Section */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              Featured Product
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {featuredProduct?.title || "Premium SmartWatch"}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                {featuredProduct?.description ||
                  "Experience cutting-edge technology with premium design and unmatched performance."}
              </p>
            </div>

            {/* Price & Rating */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-primary">
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
                  (2,847 reviews)
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-lg">
                <Truck className="w-4 h-4 text-primary" />
                <span className="text-sm text-card-foreground font-medium">
                  Free Shipping
                </span>
              </div>
              <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-lg">
                <Shield className="w-4 h-4 text-secondary" />
                <span className="text-sm text-card-foreground font-medium">
                  2-Year Warranty
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href={`/product/${featuredProduct?.id || 1}`}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 bg-card hover:bg-card/80 border-border hover:border-primary/50 text-card-foreground transition-all duration-300"
                asChild
              >
                <Link href="/products">View All Products</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">4.9/5</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24h</div>
                <div className="text-sm text-muted-foreground">
                  Fast Delivery
                </div>
              </div>
            </div>
          </div>

          {/* Product Image Section */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-lg">
              {/* Background Glow */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl opacity-60" />

              {/* Main Product Container */}
              <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
                {/* Sale Badge */}
                <Badge className="absolute -top-3 -right-3 bg-destructive text-destructive-foreground px-4 py-2 text-sm font-bold shadow-lg z-10">
                  30% OFF
                </Badge>

                {/* Product Image */}
                <div className="relative h-80 sm:h-96 w-full flex items-center justify-center rounded-xl overflow-hidden">
                  {hasValidImage ? (
                    <Image
                      src={firstImage}
                      alt={featuredProduct?.title || "Featured product"}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted rounded-xl">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <Star className="w-10 h-10 text-primary" />
                        </div>
                        <span className="text-lg font-semibold text-foreground">
                          Premium Product
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Category */}
                <div className="mt-6 text-center">
                  <Badge variant="secondary" className="px-4 py-2">
                    {featuredProduct?.category?.name || "Electronics"}
                  </Badge>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full blur-sm animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-accent/20 rounded-full blur-sm animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Scroll to explore</p>
      </div>
    </section>
  );
}
