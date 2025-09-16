"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRelatedProducts } from "@/hooks/useProductDetail";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface RelatedProductsProps {
  categoryId: number;
  excludeId: number;
}

export default function RelatedProducts({
  categoryId,
  excludeId,
}: RelatedProductsProps) {
  const { data: relatedProducts } = useRelatedProducts(categoryId, excludeId);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!relatedProducts || relatedProducts.length === 0) return null;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Productos relacionados
      </h2>

      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group h-full flex flex-col"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 25vw"
              />
            </div>
            <CardContent className="p-4 flex-grow">
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

      <div className="sm:hidden relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{relatedProducts.length} productos relacionados</span>
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

        <div
          ref={scrollRef}
          className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {relatedProducts.map((product) => (
            <div key={product.id} className="flex-none w-72 snap-start">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group h-full flex flex-col">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="280px"
                  />
                </div>
                <CardContent className="p-4 flex-grow">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-balance text-sm">
                    {product.title}
                  </h3>
                  <span className="text-lg font-bold text-primary">
                    ${product.price}
                  </span>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/product/${product.id}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full bg-transparent text-sm h-9"
                      size="sm"
                    >
                      Ver producto
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
