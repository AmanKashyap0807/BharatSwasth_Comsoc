import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, Video, MapPin } from "lucide-react"

const defaultAppointments = [
  {
    type: "Cardiology Check-up",
    doctor: "Dr. Verma",
    date: "July 28, 2024",
    time: "10:00 AM",
    mode: "Online" as "Online" | "In-Person",
  },
  {
    type: "Physiotherapy Session",
    doctor: "Dr. Singh",
    date: "August 2, 2024",
    time: "2:30 PM",
    mode: "In-Person" as "Online" | "In-Person",
  },
];

type Appointment = {
    type: string;
    doctor: string;
    date: string;
    time: string;
    mode: "Online" | "In-Person";
};

type UpcomingAppointmentsProps = {
    appointments?: Appointment[];
};

export default function UpcomingAppointments({ appointments = defaultAppointments }: UpcomingAppointmentsProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Your scheduled consultations and sessions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appt, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg bg-accent/50 gap-4">
            <div className="flex-1">
              <p className="font-bold">{appt.type}</p>
              <p className="text-sm text-muted-foreground">{appt.doctor}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                <div className="flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>{appt.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{appt.time}</span>
                </div>
              </div>
            </div>
            <Button variant={appt.mode === 'Online' ? 'default' : 'outline'} size="sm">
              {appt.mode === 'Online' ? <Video className="w-4 h-4 mr-2" /> : <MapPin className="w-4 h-4 mr-2" />}
              {appt.mode === 'Online' ? 'Join Call' : 'View Details'}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
