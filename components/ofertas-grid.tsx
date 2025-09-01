"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { formatPriceCOP } from "@/lib/utils/currency"

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

interface OfertasGridProps {
  productos: Product[]
}

export function OfertasGrid({ productos }: OfertasGridProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  // Simular precios con descuento (en un caso real, esto vendría de la base de datos)
  const getProductWithDiscount = (product: Product) => {
    const discountPercentage = Math.floor(Math.random() * 40) + 20 // 20% a 60% de descuento
    const originalPrice = product.price
    const discountedPrice = originalPrice * (1 - discountPercentage / 100)
    
    return {
      ...product,
      originalPrice,
      discountedPrice: Math.round(discountedPrice * 100) / 100,
      discountPercentage
    }
  }

  const productsWithDiscount = productos.map(getProductWithDiscount)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Productos en Oferta
          </h2>
          <p className="text-lg text-muted-foreground">
            Encuentra las mejores zapatillas con descuentos increíbles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsWithDiscount.map((product) => (
            <Card 
              key={product.id} 
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-300"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Badge de descuento */}
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-red-500 text-white text-sm font-bold">
                  -{product.discountPercentage}%
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
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Button size="icon" variant="secondary" className="h-10 w-10">
                    <Eye className="w-4 h-4" />
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
                  {/* Marca */}
                  <Badge variant="outline" className="text-xs">
                    {product.brand}
                  </Badge>
                  
                  {/* Nombre del producto */}
                  <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Precios */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">
                      {formatPriceCOP(product.discountedPrice)}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPriceCOP(product.originalPrice)}
                    </span>
                  </div>

                  {/* Ahorro */}
                  <div className="text-sm text-green-600 font-medium">
                    ¡Ahorras {formatPriceCOP(product.originalPrice - product.discountedPrice)}!
                  </div>

                  {/* Tallas disponibles */}
                  <div className="flex flex-wrap gap-1">
                    {product.product_sizes
                      .filter(size => size.is_available && size.stock_quantity > 0)
                      .slice(0, 4)
                      .map((size) => (
                        <Badge key={size.size} variant="secondary" className="text-xs">
                          {size.size}
                        </Badge>
                      ))}
                    {product.product_sizes.filter(size => size.is_available && size.stock_quantity > 0).length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.product_sizes.filter(size => size.is_available && size.stock_quantity > 0).length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Botón de agregar al carrito */}
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Agregar al Carrito
                  </Button>

                  {/* Información adicional */}
                  <div className="text-xs text-muted-foreground text-center">
                    Envío gratis en pedidos +$200.000 COP
                  </div>
                </div>
              </CardContent>

              {/* Indicador de urgencia */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>
            </Card>
          ))}
        </div>

        {/* Banner de ofertas flash */}
        <Card className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">
              🚀 ¡Ofertas Flash!
            </h3>
            <p className="text-orange-100 mb-4">
              Estas ofertas solo duran 24 horas. ¡No te las pierdas!
            </p>
            <Button variant="secondary" size="lg">
              Ver Ofertas Flash
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
