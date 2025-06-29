import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

const providers = [
  { name: "Nurse Anjali", role: "Registered Nurse", avatar: "https://placehold.co/100x100.png", hint: "woman nurse" },
  { name: "Rajesh Kumar", role: "Student Intern", avatar: "https://placehold.co/100x100.png", hint: "man student" },
]

export default function ProviderMessaging() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Provider Messaging</CardTitle>
        <CardDescription>Consult with nurses and student interns online.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {providers.map((provider) => (
          <div key={provider.name} className="flex items-center justify-between p-2 rounded-lg bg-accent/50">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={provider.avatar} alt={provider.name} data-ai-hint={provider.hint} />
                <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{provider.name}</p>
                <p className="text-xs text-muted-foreground">{provider.role}</p>
              </div>
            </div>
            <Button size="sm" variant="ghost">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
