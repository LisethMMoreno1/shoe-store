"use client"

import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"

export function CartCounter() {
  const { state } = useCart()

  if (state.itemCount === 0) return null

  return (
    <Badge
      variant="destructive"
      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
    >
      {state.itemCount > 99 ? "99+" : state.itemCount}
    </Badge>
  )
}
