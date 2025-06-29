import SymptomTracker from '@/components/dashboard/SymptomTracker';
import MediBot from '@/components/dashboard/MediBot';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function CheckInPage() {
  return (
    <div className="flex flex-col h-full">
        <header className="sticky top-0 z-10 flex h-auto items-center gap-4 border-b bg-background p-4 sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div>
                <h1 className="text-2xl font-bold">Daily Check-in</h1>
                <p className="text-muted-foreground text-sm">Log symptoms and chat with MediBot.</p>
            </div>
        </header>
        <main className="flex-1 grid gap-6 p-4 sm:p-6 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-1">
                <SymptomTracker />
            </div>
            <div className="xl:col-span-2">
                <MediBot />
            </div>
        </main>
    </div>
  );
}
