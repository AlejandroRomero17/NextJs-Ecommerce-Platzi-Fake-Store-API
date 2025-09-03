// src/app/page.tsx
"use client";

import { useHomeData } from "@/hooks/useHomeData";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import BenefitsSection from "@/components/home/BenefitsSection";
import HomeSkeleton from "@/components/home/HomeSkeleton";
import ProductList from "@/components/product/ProductList";

export default function Home() {
  const { categories, featuredProducts, isLoading } = useHomeData();

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div className="flex flex-col">
      {/* Nuevo Hero Section espectacular */}
      <HeroSection />

      {/* Resto del contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <FeaturedProducts products={featuredProducts} />

        <CategoriesGrid categories={categories} />

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-foreground">
            Todos los Productos
          </h2>
          <ProductList />
        </section>

        <BenefitsSection />
      </div>
    </div>
  );
}
