// src/app/components/home/CategoriesGrid.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Category } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

interface CategoriesGridProps {
  categories: Category[];
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  if (categories.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Explorar Categorías
        </h2>
        <Link href="/categories">
          <Button variant="outline" size="sm" className="bg-transparent">
            Ver todas
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.slice(0, 6).map((category) => (
          <Link key={category.id} href={`/search?category=${category.id}`}>
            <Card className="p-4 text-center hover:shadow-md transition-shadow duration-300 cursor-pointer group">
              <div className="relative w-16 h-16 mx-auto mb-3 overflow-hidden rounded-full">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="64px"
                />
              </div>
              <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
