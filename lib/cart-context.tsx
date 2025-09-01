"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface CartItem {
  id: string
  product_id: string
  name: string
  price: number
  size: string
  quantity: number
  image: string
  brand: string
  stock_quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isLoading: boolean
}

type CartAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  state: CartState
  addToCart: (product: any, size: string, quantity: number) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  removeFromCart: (id: string) => Promise<void>
  clearCart: () => Promise<void>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_CART":
      const total = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      return { ...state, items: action.payload, total, itemCount, isLoading: false }
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.product_id === action.payload.product_id && item.size === action.payload.size,
      )
      let newItems
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === existingItem.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item,
        )
      } else {
        newItems = [...state.items, action.payload]
      }
      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      return { ...state, items: newItems, total: newTotal, itemCount: newItemCount }
    case "UPDATE_QUANTITY":
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const updatedItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      return { ...state, items: updatedItems, total: updatedTotal, itemCount: updatedItemCount }
    case "REMOVE_ITEM":
      const filteredItems = state.items.filter((item) => item.id !== action.payload)
      const filteredTotal = filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const filteredItemCount = filteredItems.reduce((sum, item) => sum + item.quantity, 0)
      return { ...state, items: filteredItems, total: filteredTotal, itemCount: filteredItemCount }
    case "CLEAR_CART":
      return { ...state, items: [], total: 0, itemCount: 0 }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    isLoading: false,
  })

  const supabase = createClient()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: "SET_CART", payload: cartItems })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items))
  }, [state.items])

  const addToCart = async (product: any, size: string, quantity = 1) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })

      // Find the specific size info
      const sizeInfo = product.product_sizes.find((s: any) => s.size === size)
      if (!sizeInfo || sizeInfo.stock_quantity < quantity) {
        throw new Error("Stock insuficiente")
      }

      const cartItem: CartItem = {
        id: `${product.id}-${size}`,
        product_id: product.id,
        name: product.name,
        price: product.price,
        size,
        quantity,
        image: product.images[0] || "/placeholder.svg",
        brand: product.brand,
        stock_quantity: sizeInfo.stock_quantity,
      }

      dispatch({ type: "ADD_ITEM", payload: cartItem })
    } catch (error) {
      console.error("Error adding to cart:", error)
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id)
      return
    }

    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeFromCart = async (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCart = async () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider value={{ state, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
