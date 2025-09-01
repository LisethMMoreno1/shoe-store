"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Percent, Gift, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface Promocion {
  id: string
  titulo: string
  descripcion: string
  descuento: string
  productos: any[]
  validoHasta: string
  tipo: string
}

interface PromocionesBannerProps {
  ofertas: Promocion[]
}

export function PromocionesBanner({ ofertas }: PromocionesBannerProps) {
  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "2x1":
        return <Gift className="w-6 h-6" />
      case "3x2":
        return <Gift className="w-6 h-6" />
      case "descuento":
        return <Percent className="w-6 h-6" />
      default:
        return <Gift className="w-6 h-6" />
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "2x1":
        return "bg-red-500 text-white"
      case "3x2":
        return "bg-orange-500 text-white"
      case "descuento":
        return "bg-green-500 text-white"
      default:
        return "bg-blue-500 text-white"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Promociones Especiales
          </h2>
          <p className="text-lg text-muted-foreground">
            Aprovecha estas ofertas únicas antes de que se agoten
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ofertas.map((oferta) => (
            <Card key={oferta.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {/* Badge de descuento */}
              <div className="absolute top-4 right-4 z-10">
                <Badge className={`${getTipoColor(oferta.tipo)} text-sm font-bold`}>
                  {oferta.descuento}
                </Badge>
              </div>

              {/* Imagen de fondo decorativa */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50"></div>

              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-full ${getTipoColor(oferta.tipo)}`}>
                    {getTipoIcon(oferta.tipo)}
                  </div>
                  <CardTitle className="text-xl">{oferta.titulo}</CardTitle>
                </div>
                <p className="text-muted-foreground text-sm">
                  {oferta.descripcion}
                </p>
              </CardHeader>

              <CardContent className="relative z-10">
                {/* Productos incluidos */}
                {oferta.productos.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">
                      Productos incluidos:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {oferta.productos.slice(0, 3).map((producto, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {producto.name}
                        </Badge>
                      ))}
                      {oferta.productos.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{oferta.productos.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Fecha de validez */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Válido hasta: {formatDate(oferta.validoHasta)}</span>
                </div>

                {/* Botón de acción */}
                <Button className="w-full" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Aprovechar Oferta
                </Button>
              </CardContent>

              {/* Indicador de urgencia */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
            </Card>
          ))}
        </div>

        {/* Banner adicional de envío gratis */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-3 bg-primary rounded-full">
                <Gift className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  ¡Envío Gratis!
                </h3>
                <p className="text-muted-foreground">
                  En todos los pedidos superiores a $200.000 COP
                </p>
              </div>
            </div>
            <Button variant="outline" size="lg">
              Ver Condiciones
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
