import FamilyHealthWatch from '@/components/dashboard/FamilyHealthWatch';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function FamilyPage() {
  return (
    <div className="flex flex-col h-full">
        <header className="sticky top-0 z-10 flex h-auto items-center gap-4 border-b bg-background p-4 sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div>
                <h1 className="text-2xl font-bold">Family Health Watch</h1>
                <p className="text-muted-foreground text-sm">Monitor your family's health.</p>
            </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
            <div className="max-w-2xl mx-auto">
                <FamilyHealthWatch />
            </div>
        </main>
    </div>
  );
}
