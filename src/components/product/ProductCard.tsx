// src/components/product/ProductCard.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/utils/types";
import { ShoppingCart, Star, Eye, Heart, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
  showActions?: boolean;
  className?: string;
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
  if (images && images.length > 0) {
    const validImage = images.find((img) => isValidUrl(img));
    if (validImage) return validImage;
  }
  return "/placeholder-image.jpg";
};

export default function ProductCard({
  product,
  showCategory = true,
  showActions = true,
  className = "",
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const safeImageUrl = getSafeImageUrl(product.images);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Precio formateado
  const formattedPrice = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(product.price);

  return (
    <Card
      className={`overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col border-border/60 hover:border-primary/30 ${className}`}
    >
      <Link href={`/product/${product.id}`} className="flex flex-col flex-grow">
        {/* Imagen del producto con overlay de hover */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40">
          <Image
            src={imageError ? "/placeholder-image.jpg" : safeImageUrl}
            alt={product.title}
            fill
            className={`object-cover transition-all duration-500 ${
              imageLoaded ? "opacity-100 group-hover:scale-110" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 33vw"
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            priority={false}
          />

          {/* Overlay de hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

          {/* Placeholder de carga */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/50 animate-pulse flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-muted-foreground/50" />
            </div>
          )}

          {/* Badge de categoría */}
          {showCategory && product.category && (
            <Badge className="absolute top-3 right-3 bg-background/95 backdrop-blur-md text-foreground border-border text-xs font-medium px-2 py-1 shadow-sm">
              {product.category.name}
            </Badge>
          )}

          {/* Botón de favoritos mejorado */}
          <button
            onClick={handleLike}
            className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
              isLiked
                ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                : "bg-background/95 text-foreground/70 hover:bg-red-500 hover:text-white shadow-sm hover:shadow-lg"
            }`}
          >
            <Heart
              className="w-4 h-4 transition-all"
              fill={isLiked ? "currentColor" : "none"}
            />
          </button>

          {/* Badge de envío rápido */}
          <Badge className="absolute bottom-3 left-3 bg-green-500/95 backdrop-blur-md text-white border-0 text-xs font-medium px-2 py-1">
            <Zap className="w-3 h-3 mr-1" />
            Envío rápido
          </Badge>
        </div>

        {/* Contenido de la tarjeta */}
        <CardContent className="p-4 flex-grow space-y-3">
          {/* Título */}
          <h3 className="font-semibold text-foreground line-clamp-2 text-balance group-hover:text-primary transition-colors text-base leading-tight">
            {product.title}
          </h3>

          {/* Descripción */}
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Rating y precio */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary font-sans">
                {formattedPrice}
              </span>
              <span className="text-xs text-muted-foreground">
                IVA incluido
              </span>
            </div>

            <div className="flex items-center space-x-1 bg-muted/50 rounded-full px-2 py-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-foreground">4.8</span>
              <span className="text-xs text-muted-foreground">(128)</span>
            </div>
          </div>
        </CardContent>
      </Link>

      {/* Acciones - Optimizadas para móvil */}
      {showActions && (
        <CardFooter className="p-4 pt-0 flex gap-3">
          <Link href={`/product/${product.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full h-11 text-sm font-medium border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
              size="default"
            >
              <Eye className="w-4 h-4 mr-2" />
              Detalles
            </Button>
          </Link>
          <Button
            onClick={handleAddToCart}
            className="flex-1 h-11 text-sm font-medium bg-primary hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
            size="default"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to cart
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
