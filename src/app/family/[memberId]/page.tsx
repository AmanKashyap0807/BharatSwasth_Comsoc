import HealthOverview from '@/components/dashboard/HealthOverview';
import PatientSummary from '@/components/dashboard/PatientSummary';
import { SidebarTrigger } from '@/components/ui/sidebar';
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments';
import MedicationSchedule from '@/components/dashboard/MedicationSchedule';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// --- MOCK DATA ---
const familyMemberData = {
  "priya-sharma": {
    name: "Priya Sharma",
    relationship: "Mother",
    summary: { condition: "Hypertension", precautions: ["Low-sodium diet", "Monitor blood pressure daily"] },
    appointments: [
      { type: "Cardiology Follow-up", doctor: "Dr. Gupta", date: "August 5, 2024", time: "11:00 AM", mode: "Online" }
    ],
    medications: {
      morning: [{ name: "Lisinopril", dosage: "10mg", taken: true }],
      afternoon: [],
      night: [{ name: "Amlodipine", dosage: "5mg", taken: false }],
    },
    healthData: {
      bpData: [
        { name: 'Apr 24', Systolic: 145, Diastolic: 92 }, { name: 'May 24', Systolic: 142, Diastolic: 90 }, { name: 'Jun 24', Systolic: 140, Diastolic: 91 }, { name: 'Jul 24', Systolic: 138, Diastolic: 88 }
      ],
      weightData: [
        { name: 'Apr 24', Weight: 65 }, { name: 'May 24', Weight: 65.5 }, { name: 'Jun 24', Weight: 65 }, { name: 'Jul 24', Weight: 64.5 }
      ],
      sugarData: [
        { name: 'Apr 24', "Blood Sugar": 90 }, { name: 'May 24', "Blood Sugar": 92 }, { name: 'Jun 24', "Blood Sugar": 91 }, { name: 'Jul 24', "Blood Sugar": 89 }
      ],
      healthScoreData: [
        { name: 'Apr 24', "Health Score": 65 }, { name: 'May 24', "Health Score": 68 }, { name: 'Jun 24', "Health Score": 70 }, { name: 'Jul 24', "Health Score": 72 }
      ],
    }
  },
  "amit-sharma": {
    name: "Amit Sharma",
    relationship: "Father",
    summary: { condition: "Type 2 Diabetes", precautions: ["Monitor sugar intake", "30 mins of daily walk", "Low-carb diet"] },
    appointments: [
      { type: "Diabetes Check-up", doctor: "Dr. Rao", date: "July 30, 2024", time: "3:00 PM", mode: "In-Person" }
    ],
    medications: {
      morning: [{ name: "Metformin", dosage: "1000mg", taken: true }],
      afternoon: [],
      night: [],
    },
    healthData: {
      bpData: [
        { name: 'Apr 24', Systolic: 125, Diastolic: 80 }, { name: 'May 24', Systolic: 128, Diastolic: 81 }, { name: 'Jun 24', Systolic: 126, Diastolic: 80 }, { name: 'Jul 24', Systolic: 124, Diastolic: 79 }
      ],
      weightData: [
        { name: 'Apr 24', Weight: 85 }, { name: 'May 24', Weight: 84 }, { name: 'Jun 24', Weight: 83.5 }, { name: 'Jul 24', Weight: 82 }
      ],
      sugarData: [
        { name: 'Apr 24', "Blood Sugar": 150 }, { name: 'May 24', "Blood Sugar": 145 }, { name: 'Jun 24', "Blood Sugar": 142 }, { name: 'Jul 24', "Blood Sugar": 140 }
      ],
      healthScoreData: [
        { name: 'Apr 24', "Health Score": 70 }, { name: 'May 24', "Health Score": 72 }, { name: 'Jun 24', "Health Score": 75 }, { name: 'Jul 24', "Health Score": 78 }
      ],
    }
  },
  "riya-sharma": {
    name: "Riya Sharma",
    relationship: "Sister",
    summary: { condition: "Healthy", precautions: ["Maintain balanced diet", "Stay active"] },
    appointments: [],
    medications: { morning: [], afternoon: [], night: [] },
    healthData: {
      bpData: [
        { name: 'Apr 24', Systolic: 110, Diastolic: 70 }, { name: 'May 24', Systolic: 112, Diastolic: 72 }, { name: 'Jun 24', Systolic: 110, Diastolic: 71 }, { name: 'Jul 24', Systolic: 115, Diastolic: 73 }
      ],
      weightData: [
        { name: 'Apr 24', Weight: 55 }, { name: 'May 24', Weight: 55.2 }, { name: 'Jun 24', Weight: 55.5 }, { name: 'Jul 24', Weight: 55.3 }
      ],
      sugarData: [
        { name: 'Apr 24', "Blood Sugar": 85 }, { name: 'May 24', "Blood Sugar": 88 }, { name: 'Jun 24', "Blood Sugar": 86 }, { name: 'Jul 24', "Blood Sugar": 87 }
      ],
      healthScoreData: [
        { name: 'Apr 24', "Health Score": 92 }, { name: 'May 24', "Health Score": 94 }, { name: 'Jun 24', "Health Score": 95 }, { name: 'Jul 24', "Health Score": 96 }
      ],
    }
  },
  "karan-sharma": {
    name: "Karan Sharma",
    relationship: "Brother",
    summary: { condition: "Healthy", precautions: ["Annual physical check-up"] },
    appointments: [
      { type: "Annual Physical", doctor: "Dr. Joshi", date: "September 1, 2024", time: "9:00 AM", mode: "In-Person" }
    ],
    medications: { morning: [], afternoon: [], night: [] },
    healthData: {
      bpData: [
        { name: 'Apr 24', Systolic: 118, Diastolic: 75 }, { name: 'May 24', Systolic: 120, Diastolic: 76 }, { name: 'Jun 24', Systolic: 119, Diastolic: 74 }, { name: 'Jul 24', Systolic: 117, Diastolic: 75 }
      ],
      weightData: [
        { name: 'Apr 24', Weight: 72 }, { name: 'May 24', Weight: 72.5 }, { name: 'Jun 24', Weight: 73 }, { name: 'Jul 24', Weight: 72.8 }
      ],
      sugarData: [
        { name: 'Apr 24', "Blood Sugar": 90 }, { name: 'May 24', "Blood Sugar": 91 }, { name: 'Jun 24', "Blood Sugar": 88 }, { name: 'Jul 24', "Blood Sugar": 92 }
      ],
      healthScoreData: [
        { name: 'Apr 24', "Health Score": 90 }, { name: 'May 24', "Health Score": 91 }, { name: 'Jun 24', "Health Score": 93 }, { name: 'Jul 24', "Health Score": 94 }
      ],
    }
  },
};


export default function FamilyMemberDetailPage({ params }: { params: { memberId: string } }) {
  const member = (familyMemberData as any)[params.memberId];

  if (!member) {
    return (
        <div className="flex flex-col h-full">
            <header className="sticky top-0 z-10 flex h-auto items-center justify-between border-b bg-background p-4 sm:px-6">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="md:hidden" />
                    <div>
                        <h1 className="text-2xl font-bold">Member Not Found</h1>
                    </div>
                </div>
            </header>
            <main className="flex-1 p-6">
                <p>The requested family member could not be found.</p>
            </main>
        </div>
    )
  }

  const hasAppointments = member.appointments && member.appointments.length > 0;
  const hasMedications = member.medications && (member.medications.morning.length > 0 || member.medications.afternoon.length > 0 || member.medications.night.length > 0);

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 flex h-auto items-center justify-between border-b bg-background p-4 sm:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h1 className="text-2xl font-bold">{member.name}'s Dashboard</h1>
            <p className="text-muted-foreground text-sm">A health snapshot for your {member.relationship.toLowerCase()}.</p>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="grid gap-6 md:grid-cols-2">
            {hasAppointments ? <UpcomingAppointments appointments={member.appointments} /> : <Card><CardHeader><CardTitle>No Upcoming Appointments</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">No appointments are scheduled.</p></CardContent></Card>}
            {hasMedications ? <MedicationSchedule schedule={member.medications} /> : <Card><CardHeader><CardTitle>No Medications</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">No medications are scheduled for today.</p></CardContent></Card>}
        </div>
        <HealthOverview {...member.healthData} />
        <PatientSummary summary={member.summary} />
      </main>
    </div>
  );
}
