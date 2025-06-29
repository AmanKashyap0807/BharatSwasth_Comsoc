import MediBot from '@/components/dashboard/MediBot';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function MediBotPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="sticky top-0 z-10 flex h-auto items-center gap-4 border-b bg-background p-4 sm:px-6 md:hidden">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold">MediBot</h1>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">
        <MediBot />
      </main>
    </div>
  );
}
