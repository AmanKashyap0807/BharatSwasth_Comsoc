import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, MessageCircle } from "lucide-react"

export default function WhatsAppConsults() {
  return (
    <Card className="shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>WhatsApp Consults</CardTitle>
        <CardDescription>Access MediBot directly from your favorite app.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative mb-4">
            <Smartphone className="w-24 h-24 text-muted" />
            <MessageCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-green-500 fill-white" />
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Get instant recommendations, share images, and get guided consultations on the go.
        </p>
        <Button>
          Connect on WhatsApp
        </Button>
      </CardContent>
    </Card>
  )
}
