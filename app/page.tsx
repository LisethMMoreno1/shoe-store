import { createClient } from "@/lib/supabase/server"
import { ProductGrid } from "@/components/product-grid"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch products with their sizes
  console.log("[v0] Fetching products from database...")

  const { data: products, error } = await supabase
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
    console.error("[v0] Error fetching products:", error)
    console.log("[v0] Supabase client configured, but query failed")
  } else {
    console.log("[v0] Successfully fetched", products?.length || 0, "products")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <section>
          <h2 className="text-3xl font-bold text-center mb-8 text-balance">Nuestra Colección</h2>
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">
                Error cargando productos. Por favor, ejecuta los scripts de base de datos.
              </p>
              <p className="text-sm text-muted-foreground">Error: {error.message}</p>
            </div>
          ) : (
            <ProductGrid products={products || []} />
          )}
        </section>
      </main>
      <WhatsAppFloat />
    </div>
  )
}
