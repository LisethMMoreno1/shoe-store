// Configuration for external integrations
export const config = {
  whatsapp: {
    // Replace with your actual WhatsApp business number
    phoneNumber: "", // Format: country code + number (no + or spaces)
    businessName: "SoleStyle",
  },
  shopify: {
    // Replace with your actual Shopify store domain
    storeDomain: "your-store.myshopify.com",
    // Shopify integration now handled server-side only for security
  },
  shipping: {
    freeShippingThreshold: 100,
    standardShippingCost: 15,
  },
}
