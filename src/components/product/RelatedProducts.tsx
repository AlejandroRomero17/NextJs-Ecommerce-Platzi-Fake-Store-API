// src/app/components/product/RelatedProducts.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRelatedProducts } from "@/hooks/useProduct";
import Image from "next/image";
import Link from "next/link";

interface RelatedProductsProps {
  categoryId: number;
  excludeId: number;
}

export default function RelatedProducts({
  categoryId,
  excludeId,
}: RelatedProductsProps) {
  const { data: relatedProducts } = useRelatedProducts(
    categoryId,
    excludeId
  );

  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Productos relacionados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-balance">
                {product.title}
              </h3>
              <span className="text-lg font-bold text-primary">
                ${product.price}
              </span>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={`/product/${product.id}`} className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  Ver producto
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
