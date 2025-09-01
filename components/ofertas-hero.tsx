"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Zap, Clock, Gift } from "lucide-react"
import Link from "next/link"

export function OfertasHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          {/* Badge de oferta */}
          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
            <Zap className="w-4 h-4" />
            ¡OFERTAS ESPECIALES!
          </div>

          {/* Título principal */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Ofertas{" "}
            <span className="text-primary">Imperdibles</span>
          </h1>

          {/* Descripción */}
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre nuestras increíbles promociones en zapatillas deportivas, casuales y de running. 
            ¡No te pierdas los descuentos exclusivos!
          </p>

          {/* Estadísticas de ofertas */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">2x1</div>
              <div className="text-sm text-muted-foreground">Zapatillas Deportivas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">30%</div>
              <div className="text-sm text-muted-foreground">Descuento Running</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3x2</div>
              <div className="text-sm text-muted-foreground">Zapatillas Casuales</div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Ver Todas las Ofertas
            </Button>
            <Button variant="outline" size="lg">
              <Gift className="w-5 h-5 mr-2" />
              Códigos de Descuento
            </Button>
          </div>

          {/* Información adicional */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Ofertas por tiempo limitado</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              <span>Envío gratis en pedidos +$200.000 COP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
    </section>
  )
}
