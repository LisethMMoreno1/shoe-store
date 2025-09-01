"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import { formatPriceCOP } from "@/lib/utils/currency"
import { Eye, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  brand: string
  category: string
  color: string
  images: string[]
  is_active: boolean
  product_sizes: {
    size: string
    stock_quantity: number
    is_available: boolean
  }[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const availableSizes = product.product_sizes.filter(
    (size) => size.is_available && size.stock_quantity > 0
  )

  return (
    <Card
      className="group relative overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badge de marca */}
      <div className="absolute top-3 left-3 z-10">
        <Badge variant="outline" className="text-xs">
          {product.brand}
        </Badge>
      </div>

      {/* Imagen del producto */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images?.[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay con botones de acción */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button size="icon" variant="secondary" className="h-10 w-10" asChild>
            <Link href={`/product/${product.id}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="icon" variant="secondary" className="h-10 w-10">
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-10 w-10">
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-2">
          {/* Categoría */}
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          
          {/* Nombre del producto */}
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Precio */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              {formatPriceCOP(product.price)}
            </div>
            <span className="text-sm text-muted-foreground">{availableSizes.length} tallas disponibles</span>
          </div>

          {/* Tallas disponibles */}
          <div className="flex flex-wrap gap-1">
            {availableSizes.slice(0, 4).map((size) => (
              <Badge key={size.size} variant="secondary" className="text-xs">
                {size.size}
              </Badge>
            ))}
            {availableSizes.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{availableSizes.length - 4}
              </Badge>
            )}
          </div>

          {/* Botón de agregar al carrito */}
          <Button 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            disabled={availableSizes.length === 0 || isAddingToCart}
            onClick={async () => {
              if (availableSizes.length === 0) {
                toast({
                  title: "Sin stock",
                  description: "Este producto no tiene tallas disponibles",
                  variant: "destructive",
                })
                return
              }
              
              setIsAddingToCart(true)
              try {
                const firstAvailableSize = availableSizes[0].size
                await addToCart(product, firstAvailableSize, 1)
                toast({
                  title: "Producto agregado",
                  description: `${product.name} se agregó al carrito`,
                })
              } catch (error) {
                toast({
                  title: "Error",
                  description: error instanceof Error ? error.message : "Error al agregar al carrito",
                  variant: "destructive",
                })
              } finally {
                setIsAddingToCart(false)
              }
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isAddingToCart ? "Agregando..." : "Agregar al Carrito"}
          </Button>

          {/* Información adicional */}
          <div className="text-xs text-muted-foreground text-center">
            Envío gratis en pedidos +$200.000 COP
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


