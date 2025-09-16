"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface CartSummaryProps {
  subtotal: number;
  totalItems: number;
  onCheckout: () => void;
}

export default function CartSummary({
  subtotal,
  totalItems,
  onCheckout,
}: CartSummaryProps) {
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Subtotal ({totalItems} productos)
        </span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">Envío</span>
        <span className="font-medium">
          {shipping === 0 ? (
            <span className="text-green-600">Gratis</span>
          ) : (
            `$${shipping.toFixed(2)}`
          )}
        </span>
      </div>

      {shipping > 0 && (
        <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
          Agrega ${(100 - subtotal).toFixed(2)} más para obtener envío gratis
        </div>
      )}

      <div className="flex justify-between">
        <span className="text-muted-foreground">Impuestos</span>
        <span className="font-medium">${tax.toFixed(2)}</span>
      </div>

      <Separator />

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-primary">${total.toFixed(2)}</span>
      </div>

      <Button className="w-full" size="lg" onClick={onCheckout}>
        Proceder al pago
      </Button>

      <Link href="/">
        <Button variant="outline" className="w-full bg-transparent">
          Continuar comprando
        </Button>
      </Link>

      <div className="text-xs text-muted-foreground text-center pt-4">
        <p>Compra segura con encriptación SSL</p>
        <p>Garantía de devolución de 30 días</p>
      </div>
    </div>
  );
}
