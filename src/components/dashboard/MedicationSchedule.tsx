import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Pill, Sunrise, Sun, Moon } from "lucide-react"

const defaultSchedule = {
  morning: [
    { name: "Metformin", dosage: "500mg", taken: true },
    { name: "Lisinopril", dosage: "10mg", taken: true },
  ],
  afternoon: [
    { name: "Aspirin", dosage: "81mg", taken: false },
  ],
  night: [
    { name: "Atorvastatin", dosage: "20mg", taken: false },
  ],
};

type Medication = {
    name: string;
    dosage: string;
    taken: boolean;
};
type Schedule = {
    morning: Medication[];
    afternoon: Medication[];
    night: Medication[];
};
type MedicationScheduleProps = {
    schedule?: Schedule;
    isEditable?: boolean;
};

const TimeOfDayIcon = ({ time }: { time: string }) => {
    if (time === 'Morning') return <Sunrise className="w-5 h-5 text-yellow-500" />;
    if (time === 'Afternoon') return <Sun className="w-5 h-5 text-orange-500" />;
    if (time === 'Night') return <Moon className="w-5 h-5 text-blue-500" />;
    return null;
}

export default function MedicationSchedule({ schedule = defaultSchedule, isEditable = true }: MedicationScheduleProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Today's Medication</CardTitle>
        <CardDescription>Your daily medication schedule. Don't forget to mark them as taken.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {schedule.morning.length > 0 && (
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <TimeOfDayIcon time="Morning" />
                    <h4 className="font-semibold">Morning</h4>
                </div>
                <div className="space-y-3 pl-7">
                    {schedule.morning.map((med, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Pill className="w-4 h-4 text-primary" />
                                <div>
                                    <p className="text-sm font-medium">{med.name}</p>
                                    <p className="text-xs text-muted-foreground">{med.dosage}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id={`med-morning-${index}-${med.name}`} defaultChecked={med.taken} disabled={!isEditable} />
                                <label
                                    htmlFor={`med-morning-${index}-${med.name}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Taken
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
        {schedule.afternoon.length > 0 && (
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <TimeOfDayIcon time="Afternoon" />
                    <h4 className="font-semibold">Afternoon</h4>
                </div>
                <div className="space-y-3 pl-7">
                    {schedule.afternoon.map((med, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Pill className="w-4 h-4 text-primary" />
                                <div>
                                    <p className="text-sm font-medium">{med.name}</p>
                                    <p className="text-xs text-muted-foreground">{med.dosage}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id={`med-afternoon-${index}-${med.name}`} defaultChecked={med.taken} disabled={!isEditable} />
                                <label
                                    htmlFor={`med-afternoon-${index}-${med.name}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Taken
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
        {schedule.night.length > 0 && (
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <TimeOfDayIcon time="Night" />
                    <h4 className="font-semibold">Night</h4>
                </div>
                <div className="space-y-3 pl-7">
                    {schedule.night.map((med, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Pill className="w-4 h-4 text-primary" />
                                <div>
                                    <p className="text-sm font-medium">{med.name}</p>
                                    <p className="text-xs text-muted-foreground">{med.dosage}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id={`med-night-${index}-${med.name}`} defaultChecked={med.taken} disabled={!isEditable} />
                                <label
                                    htmlFor={`med-night-${index}-${med.name}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Taken
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  )
}
