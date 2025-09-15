"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, User } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Link href="/cart">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <ShoppingBag className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium text-foreground">Mi Carrito</h3>
            <p className="text-sm text-muted-foreground">
              Ver productos en el carrito
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <ShoppingBag className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium text-foreground">Seguir Comprando</h3>
            <p className="text-sm text-muted-foreground">
              Explorar más productos
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/categories">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <User className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium text-foreground">Categorías</h3>
            <p className="text-sm text-muted-foreground">
              Explorar por categorías
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
