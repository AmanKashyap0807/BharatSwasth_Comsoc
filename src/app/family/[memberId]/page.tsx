import HealthOverview from '@/components/dashboard/HealthOverview';
import PatientSummary from '@/components/dashboard/PatientSummary';
import { SidebarTrigger } from '@/components/ui/sidebar';
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments';
import MedicationSchedule from '@/components/dashboard/MedicationSchedule';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// In a real app, you'd fetch this data based on the memberId
const familyMembers = [
    { id: "priya-sharma", name: "Priya Sharma", relationship: "Mother" },
    { id: "amit-sharma", name: "Amit Sharma", relationship: "Father" },
    { id: "riya-sharma", name: "Riya Sharma", relationship: "Sister" },
    { id: "karan-sharma", name: "Karan Sharma", relationship: "Brother" },
];

export default function FamilyMemberDetailPage({ params }: { params: { memberId: string } }) {
  const member = familyMembers.find(m => m.id === params.memberId);

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

  const isHealthy = member.id === 'riya-sharma' || member.id === 'karan-sharma';

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
        {isHealthy ? (
            <Card>
                <CardHeader>
                    <CardTitle>All Good!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{member.name} has no upcoming appointments or medications scheduled and their health metrics are normal.</p>
                </CardContent>
            </Card>
        ) : (
            <>
                <div className="grid gap-6 md:grid-cols-2">
                    <UpcomingAppointments />
                    <MedicationSchedule />
                </div>
                <HealthOverview />
                <PatientSummary />
            </>
        )}
      </main>
    </div>
  );
}