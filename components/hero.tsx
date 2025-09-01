import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-background to-secondary py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          Encuentra tu
          <span className="text-primary"> Estilo Perfecto</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Descubre nuestra exclusiva colección de zapatos de las mejores marcas. Calidad, comodidad y estilo en cada
          paso.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="#productos">Ver Colección</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/ofertas" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Ofertas Especiales
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

