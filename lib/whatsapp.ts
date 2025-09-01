import { config } from "./config"

interface OrderItem {
  name: string
  size: string
  quantity: number
  price: number
}

interface ShippingInfo {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  notes?: string
}

export function generateWhatsAppMessage(items: OrderItem[], total: number, shipping: ShippingInfo): string {
  const orderDetails = items
    .map(
      (item) => `• ${item.name} (Talla ${item.size}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`,
    )
    .join("\n")

  const shippingCost = total >= config.shipping.freeShippingThreshold ? 0 : config.shipping.standardShippingCost
  const finalTotal = total + shippingCost

  const message = `🛍️ *NUEVO PEDIDO - ${config.whatsapp.businessName}*

📦 *PRODUCTOS:*
${orderDetails}

💰 *RESUMEN DE COSTOS:*
Subtotal: $${total.toFixed(2)}
Envío: ${shippingCost === 0 ? "GRATIS" : `$${shippingCost.toFixed(2)}`}
*TOTAL: $${finalTotal.toFixed(2)}*

📍 *DATOS DE ENVÍO:*
👤 Nombre: ${shipping.fullName}
📧 Email: ${shipping.email}
📱 Teléfono: ${shipping.phone}
🏠 Dirección: ${shipping.address}
🏙️ Ciudad: ${shipping.city}
📮 Código Postal: ${shipping.postalCode || "No especificado"}

${shipping.notes ? `📝 *NOTAS ADICIONALES:*\n${shipping.notes}\n` : ""}

✅ *Por favor confirma este pedido y el tiempo estimado de entrega.*

¡Gracias por elegir ${config.whatsapp.businessName}! 👟✨`

  return message
}

export function createWhatsAppURL(message: string): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${config.whatsapp.phoneNumber}?text=${encodedMessage}`
}

export function openWhatsApp(items: OrderItem[], total: number, shipping: ShippingInfo): void {
  const message = generateWhatsAppMessage(items, total, shipping)
  const url = createWhatsAppURL(message)
  window.open(url, "_blank")
}
