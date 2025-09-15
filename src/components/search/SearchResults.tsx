"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { useCart } from "@/hooks/useCart";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types";
import { ShoppingCart, Star, X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SearchResultsProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  searchQuery: string;
  hasActiveFilters: boolean;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
}

export default function SearchResults({
  products,
  currentPage,
  totalPages,
  hasActiveFilters,
  onPageChange,
  onClearFilters,
}: SearchResultsProps) {
  const { addToCart } = useCart(); // Cambiar addItem por addToCart

  const handleAddToCart = (product: Product) => {
    addToCart(product); // Cambiar addItem por addToCart
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No se encontraron productos
        </h3>
        <p className="text-muted-foreground mb-6">
          Intenta ajustar tus filtros o buscar con términos diferentes
        </p>
        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            variant="outline"
            className="bg-transparent"
          >
            <X className="w-4 h-4 mr-2" />
            Limpiar todos los filtros
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
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
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              <Badge className="absolute top-2 right-2 bg-secondary">
                {product.category.name}
              </Badge>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-balance">
                {product.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  ${product.price}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-muted-foreground">4.5</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex gap-2">
              <Link href={`/product/${product.id}`} className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Ver más
                </Button>
              </Link>
              <Button
                onClick={() => handleAddToCart(product)}
                className="flex-1"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Agregar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="bg-transparent"
          >
            Anterior
          </Button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className={currentPage !== pageNum ? "bg-transparent" : ""}
                >
                  {pageNum}
                </Button>
              );
            })}
            {totalPages > 5 && (
              <>
                <span className="text-muted-foreground">...</span>
                <Button
                  variant={currentPage === totalPages ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(totalPages)}
                  className={currentPage !== totalPages ? "bg-transparent" : ""}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="bg-transparent"
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}
