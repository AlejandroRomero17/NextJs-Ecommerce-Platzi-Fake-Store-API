// src/app/components/cart/CartItem.tsx
"use client";

import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/utils/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg">
      {/* Product Image */}
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <Image
          src={item.product.images[0] || "/placeholder.svg"}
          alt={item.product.title}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.product.id}`}>
          <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
            {item.product.title}
          </h3>
        </Link>
        <p className="text-lg font-bold text-primary mt-1">
          ${item.product.price}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="w-12 text-center font-medium">{item.quantity}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Item Total */}
      <div className="text-right">
        <p className="font-bold text-foreground">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(item.product.id)}
        className="text-destructive"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
