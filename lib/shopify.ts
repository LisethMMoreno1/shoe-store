import { config } from "./config"

interface ShopifyProduct {
  id: string
  title: string
  handle: string
  variants: ShopifyVariant[]
}

interface ShopifyVariant {
  id: string
  title: string
  price: string
  available: boolean
}

interface CartItem {
  id: string
  product_id: string
  name: string
  price: number
  size: string
  quantity: number
}

export class ShopifyService {
  private storeDomain: string

  constructor() {
    this.storeDomain = config.shopify.storeDomain
  }

  // Create a checkout URL with the cart items
  async createCheckoutURL(items: CartItem[]): Promise<string> {
    try {
      // In a real implementation, you would:
      // 1. Create a checkout session using Shopify's Storefront API on the server
      // 2. Add line items to the checkout via server-side API call
      // 3. Return the checkout URL

      // For now, we'll create a simple URL that redirects to your Shopify store
      // with the products in the cart (this is a simplified approach)

      const cartParams = items
        .map((item) => {
          // You would need to map your internal product IDs to Shopify variant IDs
          // This is a placeholder implementation
          return `${item.product_id}:${item.quantity}`
        })
        .join(",")

      // This creates a URL that adds products to Shopify cart
      // Replace with actual Shopify checkout URL generation via server API
      const checkoutURL = `https://${this.storeDomain}/cart/${cartParams}`

      return checkoutURL
    } catch (error) {
      console.error("Error creating Shopify checkout:", error)
      throw new Error("No se pudo crear la sesión de pago con Shopify")
    }
  }

  // Alternative: Create a simple redirect to Shopify store
  createStoreRedirectURL(): string {
    return `https://${this.storeDomain}`
  }

  // Validate Shopify configuration
  isConfigured(): boolean {
    return !!(this.storeDomain && this.storeDomain !== "your-store.myshopify.com")
  }
}

export const shopifyService = new ShopifyService()
