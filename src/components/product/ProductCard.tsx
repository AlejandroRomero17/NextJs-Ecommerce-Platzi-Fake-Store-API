// src/components/product/ProductCard.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/utils/types";
import { ShoppingCart, Star, Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
  showActions?: boolean;
}

// Función para validar URLs
const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Función para obtener una imagen segura
const getSafeImageUrl = (images: string[] | undefined): string => {
  // Primero intentar con las imágenes del producto
  if (images && images.length > 0) {
    const validImage = images.find((img) => isValidUrl(img));
    if (validImage) return validImage;
  }

  // Fallback a imagen placeholder
  return "/placeholder-image.jpg";
};

export default function ProductCard({
  product,
  showCategory = true,
  showActions = true,
}: ProductCardProps) {
  const { addToCart } = useCart(); // Cambiado de addItem a addToCart
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const safeImageUrl = getSafeImageUrl(product.images);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product); // Cambiado de addItem a addToCart
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); // Para evitar que quede cargando eternamente
  };


  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group h-full flex flex-col">
      <Link href={`/product/${product.id}`} className="flex flex-col flex-grow">
        {/* Imagen del producto */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageError ? "/placeholder-image.jpg" : safeImageUrl}
            alt={product.title}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            priority={false}
          />

          {/* Placeholder de carga */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-muted-foreground" />
            </div>
          )}

          {/* Badge de categoría */}
          {showCategory && product.category && (
            <Badge className="absolute top-2 right-2 bg-secondary/90 backdrop-blur-sm text-xs">
              {product.category.name}
            </Badge>
          )}

          {/* Botón de favoritos */}
          <button
            onClick={handleLike}
            className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isLiked
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white"
            } shadow-md hover:shadow-lg z-10`}
          >
            <Heart
              className="w-4 h-4"
              fill={isLiked ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Contenido de la tarjeta */}
        <CardContent className="p-4 flex-grow">
          {/* Título */}
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-balance group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Descripción */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Rating y precio */}
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
      </Link>

      {/* Acciones */}
      {showActions && (
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Link href={`/product/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent text-sm">
              <Eye className="w-4 h-4 mr-2" />
              Ver detalles
            </Button>
          </Link>
          <Button
            onClick={handleAddToCart}
            className="flex-1 text-sm"
            size="default"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Agregar
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
