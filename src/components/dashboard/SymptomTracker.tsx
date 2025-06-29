"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Frown, Meh, Smile, Star } from "lucide-react"

const moodData = [
  { day: 'Mon', mood: 3, symptoms: 2 },
  { day: 'Tue', mood: 4, symptoms: 1 },
  { day: 'Wed', mood: 2, symptoms: 3 },
  { day: 'Thu', mood: 5, symptoms: 1 },
  { day: 'Fri', mood: 4, symptoms: 2 },
  { day: 'Sat', mood: 5, symptoms: 1 },
  { day: 'Sun', mood: 3, symptoms: 2 },
]

export default function SymptomTracker() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Daily Check-in</CardTitle>
        <CardDescription>Log your mood and symptoms to track your progress.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label htmlFor="mood-slider" className="text-sm font-medium">Mood</label>
            <div className="flex items-center space-x-2 mt-2">
              <Frown className="text-red-500" />
              <Slider
                id="mood-slider"
                defaultValue={[3]}
                max={5}
                step={1}
                className="w-full"
                aria-label="Mood slider"
              />
              <Smile className="text-green-500" />
            </div>
          </div>
          <div>
            <label htmlFor="symptom-slider" className="text-sm font-medium">Symptom Level</label>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm text-green-500 font-semibold">Low</span>
              <Slider
                id="symptom-slider"
                defaultValue={[2]}
                max={5}
                step={1}
                className="w-full"
                aria-label="Symptom level slider"
              />
              <span className="text-sm text-red-500 font-semibold">High</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Correlation Chart</h4>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    background: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Line type="monotone" dataKey="mood" stroke="hsl(var(--primary))" strokeWidth={2} name="Mood" />
                <Line type="monotone" dataKey="symptoms" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Symptoms" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t bg-accent/50 -mx-6 px-6 -mb-6 pb-6 rounded-b-lg">
          <h4 className="text-sm font-medium">Health Quest</h4>
          <div className="flex items-center justify-between mt-2 p-3 bg-card rounded-lg">
            <p className="font-semibold">Your Points</p>
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-xl font-bold">1,250</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Earn points for mood check-ins, treatment quizzes, and medication logs.</p>
        </div>
      </CardContent>
    </Card>
  )
}
