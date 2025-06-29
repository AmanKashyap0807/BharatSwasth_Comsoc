"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sun, HeartPulse, Droplets, Wind, Pill } from "lucide-react"
import { RadialBarChart, RadialBar, PolarGrid, Tooltip, ResponsiveContainer } from "recharts"
import { SunflowerIcon } from "@/components/icons"

const chartData = [
  { name: 'Heart Rate', value: 72, fill: 'var(--color-heart)' },
  { name: 'Blood Pressure', value: 80, fill: 'var(--color-bp)' },
  { name: 'O2 Saturation', value: 98, fill: 'var(--color-o2)' },
];

const chartConfig = {
  value: { label: "Value" },
  heart: { label: "Heart Rate", color: "hsl(var(--chart-1))" },
  bp: { label: "Blood Pressure", color: "hsl(var(--chart-2))" },
  o2: { label: "O2 Saturation", color: "hsl(var(--chart-4))" },
}

const HealthForecast = () => (
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-sm font-medium text-muted-foreground">Health Forecast</h3>
      <p className="text-2xl font-bold">Feeling Good</p>
    </div>
    <div className="flex space-x-2">
      <div className="flex flex-col items-center p-2 rounded-lg bg-accent">
        <Sun className="w-6 h-6 text-yellow-500" />
        <span className="text-xs mt-1">Today</span>
      </div>
    </div>
  </div>
);

const VitalSignsRing = () => (
  <div>
    <h3 className="text-sm font-medium text-muted-foreground">Vital Signs</h3>
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={chartData}
          innerRadius="30%"
          outerRadius="100%"
          barSize={10}
          startAngle={90}
          endAngle={-270}
        >
          <PolarGrid gridType="circle" />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              background: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)"
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
    <div className="grid grid-cols-3 gap-2 text-center text-xs mt-2">
      <div className="flex flex-col items-center">
        <HeartPulse className="w-5 h-5 text-[hsl(var(--chart-1))]" />
        <span className="font-bold">72 bpm</span>
        <span>Heart Rate</span>
      </div>
      <div className="flex flex-col items-center">
        <Droplets className="w-5 h-5 text-[hsl(var(--chart-2))]" />
        <span className="font-bold">120/80</span>
        <span>Blood Pressure</span>
      </div>
      <div className="flex flex-col items-center">
        <Wind className="w-5 h-5 text-[hsl(var(--chart-4))]" />
        <span className="font-bold">98%</span>
        <span>O2 Saturation</span>
      </div>
    </div>
  </div>
);

const MedicationSunflower = () => (
  <div>
    <div className="flex items-center space-x-2">
      <SunflowerIcon className="w-5 h-5 text-yellow-600" />
      <h3 className="text-sm font-medium text-muted-foreground">Medication Reminders</h3>
    </div>
    <ul className="mt-2 space-y-2">
      <li className="flex items-center justify-between p-2 bg-accent/50 rounded-lg">
        <div className="flex items-center">
          <Pill className="w-4 h-4 mr-3 text-primary" />
          <div>
            <p className="font-semibold">Aspirin</p>
            <p className="text-xs text-muted-foreground">1 tablet, after breakfast</p>
          </div>
        </div>
        <span className="text-xs font-medium">8:00 AM</span>
      </li>
      <li className="flex items-center justify-between p-2 bg-accent/50 rounded-lg">
        <div className="flex items-center">
          <Pill className="w-4 h-4 mr-3 text-primary" />
          <div>
            <p className="font-semibold">Metformin</p>
            <p className="text-xs text-muted-foreground">1 tablet, after dinner</p>
          </div>
        </div>
        <span className="text-xs font-medium">9:00 PM</span>
      </li>
    </ul>
  </div>
);


export default function HealthOverview() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Health Dashboard</CardTitle>
        <CardDescription>A comprehensive snapshot of your current health.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <HealthForecast />
        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
          <VitalSignsRing />
          <MedicationSunflower />
        </div>
      </CardContent>
    </Card>
  )
}
