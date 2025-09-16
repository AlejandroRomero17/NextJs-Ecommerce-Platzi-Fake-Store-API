"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";
import { Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart(); // Cambiar addItem por addToCart

  const adjustQuantity = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    // Simular delay para UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Cambiar addItem por addToCart y pasar la cantidad
    addToCart(product, quantity);

    setIsAddingToCart(false);
    alert(
      `${quantity} ${
        quantity === 1 ? "producto agregado" : "productos agregados"
      } al carrito`
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <Badge className="mb-3">{product.category.name}</Badge>
        <h1 className="text-3xl font-bold text-foreground mb-4 text-balance">
          {product.title}
        </h1>
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-3xl font-bold text-primary">
            ${product.price}
          </span>
          <div className="flex items-center space-x-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(4.5)</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold text-foreground mb-2">Descripción</h3>
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Cantidad
          </label>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustQuantity(-1)}
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-lg font-medium w-12 text-center">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => adjustQuantity(1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex-1"
            size="lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {isAddingToCart ? "Agregando..." : "Agregar al carrito"}
          </Button>
          <Button variant="outline" size="lg">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Categoría:</span>
          <span className="font-medium">{product.category.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">ID del producto:</span>
          <span className="font-medium">#{product.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Disponibilidad:</span>
          <span className="font-medium text-green-600">En stock</span>
        </div>
      </div>
    </div>
  );
}
