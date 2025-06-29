"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
  Legend,
} from "recharts"

const bpData = [
  { name: 'Apr 2024', Systolic: 135, Diastolic: 82 },
  { name: 'May 2024', Systolic: 136, Diastolic: 83 },
  { name: 'Jun 2024', Systolic: 134, Diastolic: 81 },
  { name: 'Jul 2024', Systolic: 132, Diastolic: 80 },
  { name: 'Aug 2024', Systolic: 133, Diastolic: 82 },
  { name: 'Sep 2024', Systolic: 130, Diastolic: 79 },
  { name: 'Oct 2024', Systolic: 128, Diastolic: 78 },
  { name: 'Nov 2024', Systolic: 127, Diastolic: 78 },
  { name: 'Dec 2024', Systolic: 129, Diastolic: 80 },
  { name: 'Jan 2025', Systolic: 126, Diastolic: 77 },
  { name: 'Feb 2025', Systolic: 125, Diastolic: 76 },
  { name: 'Mar 2025', Systolic: 127, Diastolic: 78 },
  { name: 'Apr 2025', Systolic: 128, Diastolic: 79 },
];

const weightData = [
  { name: 'Apr 2024', Weight: 60 },
  { name: 'May 2024', Weight: 61 },
  { name: 'Jun 2024', Weight: 62 },
  { name: 'Jul 2024', Weight: 62.5 },
  { name: 'Aug 2024', Weight: 63 },
  { name: 'Sep 2024', Weight: 64 },
  { name: 'Oct 2024', Weight: 65 },
  { name: 'Nov 2024', Weight: 66 },
  { name: 'Dec 2024', Weight: 67 },
  { name: 'Jan 2025', Weight: 68 },
  { name: 'Feb 2025', Weight: 69 },
  { name: 'Mar 2025', Weight: 69.5 },
  { name: 'Apr 2025', Weight: 70 },
];

const sugarData = [
    { name: 'Apr 2024', "Blood Sugar": 96 },
    { name: 'May 2024', "Blood Sugar": 97 },
    { name: 'Jun 2024', "Blood Sugar": 95 },
    { name: 'Jul 2024', "Blood Sugar": 94 },
    { name: 'Aug 2024', "Blood Sugar": 92 },
    { name: 'Sep 2024', "Blood Sugar": 91 },
    { name: 'Oct 2024', "Blood Sugar": 90 },
    { name: 'Nov 2024', "Blood Sugar": 89 },
    { name: 'Dec 2024', "Blood Sugar": 90 },
    { name: 'Jan 2025', "Blood Sugar": 89 },
    { name: 'Feb 2025', "Blood Sugar": 90 },
    { name: 'Mar 2025', "Blood Sugar": 91 },
    { name: 'Apr 2025', "Blood Sugar": 92 },
];

const healthScoreData = [
    { name: 'Sep 24', "Health Score": 75 },
    { name: 'Oct 24', "Health Score": 76 },
    { name: 'Nov 24', "Health Score": 78 },
    { name: 'Dec 24', "Health Score": 79 },
    { name: 'Jan 25', "Health Score": 81 },
    { name: 'Feb 25', "Health Score": 83 },
    { name: 'Mar 25', "Health Score": 82 },
    { name: 'Apr 25', "Health Score": 84 },
    { name: 'May 25', "Health Score": 85 },
    { name: 'Jun 25', "Health Score": 87 },
    { name: 'Jul 25', "Health Score": 88 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background/90 backdrop-blur-sm border rounded-lg shadow-lg">
          <p className="label font-bold text-foreground">{`${label}`}</p>
          {payload.map((pld: any, index: number) => (
             <p key={index} style={{ color: pld.stroke || pld.fill }} className="text-sm">{`${pld.name}: ${pld.value}`}</p>
          ))}
        </div>
      );
    }
    return null;
};

export default function HealthOverview() {
    const [date, setDate] = React.useState<DateRange | undefined>({
      from: new Date(2024, 3, 1),
      to: new Date(2025, 3, 30),
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "w-full md:w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                        date.to ? (
                            <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                        ) : (
                        <span>Pick a date range</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Blood Pressure Over Time</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full">
                        <ResponsiveContainer>
                            <LineChart data={bpData} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                                <YAxis domain={[70, 145]} fontSize={12} stroke="hsl(var(--muted-foreground))" />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
                                <Legend wrapperStyle={{ bottom: 0 }}/>
                                <ReferenceLine y={120} label={{ value: 'Normal Systolic', position: 'insideTopRight', fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} stroke="hsl(var(--chart-5))" strokeDasharray="3 3" />
                                <ReferenceLine y={80} label={{ value: 'Normal Diastolic', position: 'insideBottomRight', fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} stroke="hsl(var(--primary))" strokeDasharray="3 3" />
                                <Line type="monotone" name="Systolic" dataKey="Systolic" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} />
                                <Line type="monotone" name="Diastolic" dataKey="Diastolic" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Weight Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full">
                        <ResponsiveContainer>
                            <BarChart data={weightData} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                                <XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                                <YAxis domain={[55, 75]} fontSize={12} stroke="hsl(var(--muted-foreground))" unit="kg"/>
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }} />
                                <Legend wrapperStyle={{ bottom: 0 }}/>
                                <Bar dataKey="Weight" fill="#a855f7" name="Weight (kg)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Blood Sugar Levels</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full">
                        <ResponsiveContainer>
                            <LineChart data={sugarData} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" />
                                <YAxis domain={[85, 105]} fontSize={12} stroke="hsl(var(--muted-foreground))" unit="mg/dL" />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}/>
                                <Legend wrapperStyle={{ bottom: 0 }}/>
                                <ReferenceLine y={100} label={{ value: 'Normal Fasting Limit', position: 'insideTopRight', fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                                <Line type="monotone" dataKey="Blood Sugar" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} name="Blood Sugar" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Health Score Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full">
                        <ResponsiveContainer>
                            <BarChart data={healthScoreData} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                                <XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))"/>
                                <YAxis domain={[70, 100]} fontSize={12} stroke="hsl(var(--muted-foreground))"/>
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }} />
                                <Legend wrapperStyle={{ bottom: 0 }}/>
                                <Bar dataKey="Health Score" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
