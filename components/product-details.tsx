"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { formatPriceCOP } from "@/lib/utils/currency"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

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

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const availableSizes = product.product_sizes.filter(
    (size) => size.is_available && size.stock_quantity > 0
  )

  const images = product.images.length > 0 ? product.images : ["/zapato-frontal.png", "/zapato-lateral.png", "/zapato-trasero.png"]

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast({
        title: "Selecciona una talla",
        description: "Por favor selecciona una talla antes de agregar al carrito",
        variant: "destructive",
      })
      return
    }
    
    setIsAddingToCart(true)
    try {
      await addToCart(product, selectedSize, quantity)
      toast({
        title: "Producto agregado",
        description: `${product.name} (Talla: ${selectedSize}) se agregó al carrito`,
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
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Galería de imágenes */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                selectedImage === index ? "border-primary" : "border-transparent"
              }`}
            >
              <Image
                src={image}
                alt={`${product.name} - Vista ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Información del producto */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{product.brand}</Badge>
            <Badge variant="secondary">{product.category}</Badge>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-balance">{product.name}</h1>
          <p className="text-muted-foreground text-lg mb-4 text-pretty">{product.description}</p>
          <div className="text-4xl font-bold text-primary mb-6">{formatPriceCOP(product.price)}</div>
        </div>

        {/* Calificación */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">(4.8 - 128 reseñas)</span>
        </div>

        <Separator />

        {/* Selección de talla */}
        <div>
          <h3 className="font-semibold mb-3">Seleccionar Talla</h3>
          <div className="grid grid-cols-4 gap-2">
            {availableSizes.map((size) => (
              <button
                key={size.size}
                onClick={() => setSelectedSize(size.size)}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  selectedSize === size.size
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {size.size}
              </button>
            ))}
          </div>
        </div>

        {/* Cantidad */}
        <div>
          <h3 className="font-semibold mb-3">Cantidad</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <Button 
            className="flex-1" 
            size="lg" 
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {isAddingToCart ? "Agregando..." : "Agregar al Carrito"}
          </Button>
          <Button variant="outline" size="lg">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Información adicional */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Truck className="w-4 h-4 text-green-600" />
            <span>Envío gratis en pedidos +$200.000 COP</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>Garantía de 30 días</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <RotateCcw className="w-4 h-4 text-orange-600" />
            <span>Devolución gratuita</span>
          </div>
        </div>
      </div>
    </div>
  )
}
