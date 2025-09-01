import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Header } from "@/components/header"
import { AlertCircle } from "lucide-react"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl">Error de Autenticación</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                {params?.error ? (
                  <p className="text-sm text-muted-foreground">Error: {params.error}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Ha ocurrido un error inesperado durante la autenticación.
                  </p>
                )}
                <div className="flex flex-col gap-2 pt-4">
                  <Button asChild>
                    <Link href="/auth/login">Intentar de Nuevo</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">Volver a la Tienda</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
