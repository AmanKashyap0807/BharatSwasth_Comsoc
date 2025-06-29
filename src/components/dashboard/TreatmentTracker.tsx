"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Target, PersonStanding } from "lucide-react"

const treatments = [
  { name: "Physiotherapy", progress: 75, goal: "20 sessions", icon: <PersonStanding className="w-5 h-5 text-blue-500" /> },
  { name: "Medication Adherence", progress: 92, goal: "Daily", icon: <Target className="w-5 h-5 text-green-500" /> },
];

const achievements = [
  { name: "1 Month Streak", icon: <Award className="w-4 h-4 mr-1 text-yellow-500" /> },
  { name: "Perfect Week", icon: <Award className="w-4 h-4 mr-1 text-green-500" /> },
  { name: "Milestone Reached", icon: <Award className="w-4 h-4 mr-1 text-purple-500" /> },
];

export default function TreatmentTracker() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Treatment Progress</CardTitle>
        <CardDescription>Track your treatment milestones and celebrate achievements.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {treatments.map((treatment) => (
            <div key={treatment.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  {treatment.icon}
                  <p className="font-medium">{treatment.name}</p>
                </div>
                <span className="text-sm text-muted-foreground">{treatment.goal}</span>
              </div>
              <Progress value={treatment.progress} aria-label={`${treatment.name} progress`} />
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Achievements</h4>
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement) => (
              <Badge key={achievement.name} variant="outline" className="flex items-center bg-accent/50">
                {achievement.icon}
                <span>{achievement.name}</span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
