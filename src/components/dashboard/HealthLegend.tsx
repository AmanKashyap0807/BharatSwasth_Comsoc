import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HealthLegend() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Legend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-foreground">
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3" style={{ backgroundColor: 'hsl(var(--destructive))' }} />
                <span>Systolic</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3" style={{ backgroundColor: 'hsl(var(--primary))' }} />
                <span>Diastolic</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3" style={{ backgroundColor: 'hsl(var(--chart-2))' }} />
                <span>Blood Sugar</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500" />
                <span>Weight</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3" style={{ backgroundColor: 'hsl(var(--chart-4))' }} />
                <span>Monthly Health Score</span>
            </div>
        </div>
        <hr className="border-border" />
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500" />
                <span>High Risk</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400" />
                <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500" />
                <span>Low Risk</span>
            </div>
        </div>
        <hr className="border-border" />
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600" />
                <span>Needs Improvement</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500" />
                <span>Good</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600" />
                <span>Excellent</span>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
