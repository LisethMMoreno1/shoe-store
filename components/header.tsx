import { CartCounter } from "@/components/cart-counter"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SS</span>
          </div>
          <span className="text-xl font-bold">SoleStyle</span>
        </Link>

        {/* <div className="flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Buscar zapatos..." className="pl-10" />
          </div>
        </div> */}

        <nav className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <CartCounter />
              <span className="sr-only">Carrito</span>
            </Link>
          </Button>
          <UserMenu />
        </nav>
      </div>
    </header>
  )
}
