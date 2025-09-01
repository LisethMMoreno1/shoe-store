"use client";

import { useCart } from "@/lib/cart-context";
import { CartItem } from "@/components/cart-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CheckoutForm } from "@/components/checkout-form";
import { useState } from "react";
import { formatPriceCOP } from "@/lib/utils/currency";

export function CartContent() {
  const { state, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (state.items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
        <p className="text-muted-foreground mb-6">
          Agrega algunos productos para comenzar tu compra
        </p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continuar Comprando
          </Link>
        </Button>
      </div>
    );
  }

  if (showCheckout) {
    return <CheckoutForm onBack={() => setShowCheckout(false)} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Carrito de Compras</h1>
          <Button variant="outline" onClick={clearCart}>
            Vaciar Carrito
          </Button>
        </div>

        <div className="space-y-4">
          {state.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Resumen del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal ({state.itemCount} productos)</span>
                <span>{formatPriceCOP(state.total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPriceCOP(state.total)}</span>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() => setShowCheckout(true)}
            >
              Proceder al Checkout
            </Button>

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuar Comprando
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
