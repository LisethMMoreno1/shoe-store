import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/product-details"
import { Header } from "@/components/header"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      product_sizes (
        size,
        stock_quantity,
        is_available
      )
    `)
    .eq("id", id)
    .eq("is_active", true)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </main>
    </div>
  )
}
