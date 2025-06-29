import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, BarChart } from "lucide-react"

const familyMembers = [
  { id: "priya-sharma", name: "Priya Sharma", relationship: "Mother", lastUpdated: "2h ago", healthMetric: "BP: 130/85", condition: "Hypertension", avatar: "https://placehold.co/100x100.png", hint: "indian mother", healthStatus: "critical" },
  { id: "amit-sharma", name: "Amit Sharma", relationship: "Father", lastUpdated: "1d ago", healthMetric: "Glucose: 140 mg/dL", condition: "Diabetes", avatar: "https://placehold.co/100x100.png", hint: "indian father", healthStatus: "critical" },
  { id: "riya-sharma", name: "Riya Sharma", relationship: "Sister", lastUpdated: "5h ago", healthMetric: "Steps: 8,200", condition: "Healthy", avatar: "https://placehold.co/100x100.png", hint: "indian sister", healthStatus: "normal" },
  { id: "karan-sharma", name: "Karan Sharma", relationship: "Brother", lastUpdated: "3d ago", healthMetric: "Sleep: 7.5h", condition: "Healthy", avatar: "https://placehold.co/100x100.png", hint: "indian brother", healthStatus: "normal" },
];

export default function FamilyHealthWatch() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Family Health Watch</CardTitle>
        <CardDescription>Monitor and manage your family's health information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {familyMembers.map((member) => (
          <Card key={member.id} className="p-4 bg-accent/30">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint}/>
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.relationship}</p>
                  <Badge variant={member.healthStatus === 'critical' ? 'destructive' : 'secondary'} className="mt-1">{member.condition}</Badge>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Updated {member.lastUpdated}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium">{member.healthMetric}</p>
              <div className="flex items-center gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/family/${member.id}`}>
                      <BarChart className="w-4 h-4 mr-2" />
                      Details
                  </Link>
                </Button>
                <Button size="icon" variant="destructive">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="sr-only">Emergency</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
