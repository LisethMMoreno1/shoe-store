"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { config } from "@/lib/config"

export function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    const message = `¡Hola! Me interesa conocer más sobre los productos de ${config.whatsapp.businessName}. ¿Podrían ayudarme?`
    const url = `https://wa.me/${config.whatsapp.phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg z-50 p-0"
      size="icon"
    >
      <MessageCircle className="h-6 w-6 text-white" />
      <span className="sr-only">Contactar por WhatsApp</span>
    </Button>
  )
}
