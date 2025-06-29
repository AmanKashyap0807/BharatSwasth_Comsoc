import HealthOverview from '@/components/dashboard/HealthOverview';
import PatientSummary from '@/components/dashboard/PatientSummary';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 flex h-auto items-center gap-4 border-b bg-background p-4 sm:px-6">
        <SidebarTrigger className="md:hidden" />
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">A comprehensive snapshot of your current health.</p>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <PatientSummary />
        <HealthOverview />
      </main>
    </div>
  );
}
