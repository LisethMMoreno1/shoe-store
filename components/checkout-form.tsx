"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import { config } from "@/lib/config"
import { shopifyService } from "@/lib/shopify"
import { formatPriceCOP } from "@/lib/utils/currency"
import { openWhatsApp } from "@/lib/whatsapp"
import { ArrowLeft, CreditCard, Gift, MessageCircle, Truck } from "lucide-react"
import type React from "react"
import { useState } from "react"

interface CheckoutFormProps {
  onBack: () => void
}

export function CheckoutForm({ onBack }: CheckoutFormProps) {
  const { state } = useCart()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const shippingCost =
    state.total >= config.shipping.freeShippingThreshold ? 0 : config.shipping.standardShippingCost
  const finalTotal = state.total + shippingCost

  const handleWhatsAppOrder = async () => {
    if (!isFormValid) return

    setIsProcessing(true)
    try {
      const orderItems = state.items.map((item) => ({
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      }))

      openWhatsApp(orderItems, state.total, formData)

      toast({
        title: "Redirigiendo a WhatsApp",
        description: "Se abrirá WhatsApp con los detalles de tu pedido.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo abrir WhatsApp. Intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleShopifyCheckout = async () => {
    if (!isFormValid) return

    setIsProcessing(true)
    try {
      if (!shopifyService.isConfigured()) {
        window.open(shopifyService.createStoreRedirectURL(), "_blank")
        toast({
          title: "Redirigiendo a la tienda",
          description: "Se abrirá nuestra tienda online para completar el pago.",
        })
      } else {
        const checkoutURL = await shopifyService.createCheckoutURL(state.items)
        window.open(checkoutURL, "_blank")
        toast({
          title: "Redirigiendo a Shopify",
          description: "Se abrirá la página de pago seguro.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo procesar el pago. Intenta con WhatsApp.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const isFormValid =
    formData.fullName && formData.email && formData.phone && formData.address && formData.city

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Carrito
        </Button>
        <h1 className="text-3xl font-bold">Finalizar Compra</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Información de Envío
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nombre Completo *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="address">Dirección Completa *</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Ciudad *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Código Postal</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Instrucciones especiales de entrega, referencias del domicilio, etc."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Order Summary & Payment */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <div className="text-sm text-muted-foreground">
                      Talla {item.size} • Cantidad: {item.quantity}
                    </div>
                  </div>
                  <span className="font-medium">
                    {formatPriceCOP(item.price * item.quantity)}
                  </span>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPriceCOP(state.total)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Envío</span>
                  <div className="flex items-center gap-2">
                    {shippingCost === 0 ? (
                      <>
                        <Badge variant="secondary" className="text-xs">
                          <Gift className="w-3 h-3 mr-1" />
                          GRATIS
                        </Badge>
                        <span className="line-through text-muted-foreground text-sm">
                          {formatPriceCOP(config.shipping.standardShippingCost)}
                        </span>
                      </>
                    ) : (
                      <span>{formatPriceCOP(shippingCost)}</span>
                    )}
                  </div>
                </div>
                {state.total < config.shipping.freeShippingThreshold && (
                  <p className="text-xs text-muted-foreground">
                    Agrega{" "}
                    {formatPriceCOP(config.shipping.freeShippingThreshold - state.total)} más para envío gratis
                  </p>
                )}
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPriceCOP(finalTotal)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Método de Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button
                  className="w-full h-12"
                  size="lg"
                  onClick={handleWhatsAppOrder}
                  disabled={!isFormValid || isProcessing}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {isProcessing ? "Procesando..." : "Ordenar por WhatsApp"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">o</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-12 bg-transparent"
                  size="lg"
                  onClick={handleShopifyCheckout}
                  disabled={!isFormValid || isProcessing}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {isProcessing ? "Procesando..." : "Pagar con Tarjeta"}
                </Button>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  {!isFormValid
                    ? "Completa todos los campos obligatorios (*) para continuar"
                    : "Elige tu método de pago preferido"}
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span>🔒 Pago seguro</span>
                  <span>📦 Envío confiable</span>
                  <span>↩️ Devoluciones fáciles</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
