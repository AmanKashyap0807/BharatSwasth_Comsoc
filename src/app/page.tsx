import HealthOverview from '@/components/dashboard/HealthOverview';
import PatientSummary from '@/components/dashboard/PatientSummary';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 flex h-auto items-center justify-between border-b bg-background p-4 sm:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm">A comprehensive snapshot of your current health.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          <span className="text-lg font-bold">1,250</span>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <PatientSummary />
        <HealthOverview />
      </main>
    </div>
  );
}
