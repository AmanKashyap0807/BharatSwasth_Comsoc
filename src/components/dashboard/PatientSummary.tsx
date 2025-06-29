import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ShieldCheck } from "lucide-react"

export default function PatientSummary() {
  return (
    <div className="grid gap-6 md:grid-cols-2 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-destructive" />
            Current Condition
          </CardTitle>
          <CardDescription>Hypertension & Type 2 Diabetes</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">Vitals are being monitored. Adherence to medication is key.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-green-600" />
            Precautions
          </CardTitle>
          <CardDescription>Follow these guidelines for better health.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <Badge variant="outline">Low-sodium diet</Badge>
            <Badge variant="outline">Monitor sugar intake</Badge>
            <Badge variant="outline">Regular exercise</Badge>
        </CardContent>
      </Card>
    </div>
  )
}
