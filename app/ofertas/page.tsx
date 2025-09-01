import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { OfertasHero } from "@/components/ofertas-hero"
import { OfertasGrid } from "@/components/ofertas-grid"
import { PromocionesBanner } from "@/components/promociones-banner"

export default async function OfertasPage() {
  const supabase = await createClient()

  // Obtener productos con ofertas especiales
  const { data: productosOfertas, error } = await supabase
    .from("products")
    .select(`
      *,
      product_sizes (
        size,
        stock_quantity,
        is_available
      )
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
  }

  // Simular productos con ofertas (en un caso real, esto vendría de la base de datos)
  const ofertasEspeciales = [
    {
      id: "oferta-1",
      titulo: "2x1 en Zapatillas Deportivas",
      descripcion: "Lleva dos pares de zapatillas deportivas por el precio de una",
      descuento: "50%",
      productos: productosOfertas?.slice(0, 2) || [],
      validoHasta: "2024-12-31",
      tipo: "2x1"
    },
    {
      id: "oferta-2",
      titulo: "Descuento del 30% en Running",
      descripcion: "Todas las zapatillas de running con 30% de descuento",
      descuento: "30%",
      productos: productosOfertas?.filter(p => p.category === "Running").slice(0, 3) || [],
      validoHasta: "2024-12-31",
      tipo: "descuento"
    },
    {
      id: "oferta-3",
      titulo: "3x2 en Zapatillas Casuales",
      descripcion: "Compra 3 pares de zapatillas casuales y paga solo 2",
      descuento: "33%",
      productos: productosOfertas?.filter(p => p.category === "Casual").slice(0, 3) || [],
      validoHasta: "2024-12-31",
      tipo: "3x2"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <OfertasHero />
        <PromocionesBanner ofertas={ofertasEspeciales} />
        <OfertasGrid productos={productosOfertas || []} />
      </main>
    </div>
  )
}
