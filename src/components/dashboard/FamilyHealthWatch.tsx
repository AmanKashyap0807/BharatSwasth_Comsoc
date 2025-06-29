import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ShieldAlert, RefreshCw } from "lucide-react"

const familyMembers = [
  { name: "Priya Sharma", relationship: "Mother", lastUpdated: "2h ago", healthMetric: "BP: 130/85", condition: "Hypertension", avatar: "https://placehold.co/100x100.png", hint: "indian mother" },
  { name: "Amit Sharma", relationship: "Father", lastUpdated: "1d ago", healthMetric: "Glucose: 140 mg/dL", condition: "Diabetes", avatar: "https://placehold.co/100x100.png", hint: "indian father" },
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
          <Card key={member.name} className="p-4 bg-accent/30">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint}/>
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.relationship}</p>
                  <Badge variant="destructive" className="mt-1">{member.condition}</Badge>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Updated {member.lastUpdated}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium">{member.healthMetric}</p>
              <Button size="sm" variant="destructive">
                <ShieldAlert className="w-4 h-4 mr-2" />
                Emergency
              </Button>
            </div>
            <div className="mt-4 pt-3 border-t flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id={`permission-${member.name}`} aria-label={`Permissions for ${member.name}`} defaultChecked />
                <label htmlFor={`permission-${member.name}`} className="text-xs text-muted-foreground">Permissions Active</label>
              </div>
               <Button size="icon" variant="ghost" className="h-7 w-7">
                <RefreshCw className="w-4 h-4"/>
                <span className="sr-only">Request data</span>
              </Button>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
