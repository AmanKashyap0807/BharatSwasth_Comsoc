import ProviderMessaging from '@/components/dashboard/ProviderMessaging';
import WhatsAppConsults from '@/components/dashboard/WhatsAppConsults';
import { SidebarTrigger } from '@/components/ui/sidebar';
import MediBot from '@/components/dashboard/MediBot';

export default function ConsultPage() {
  return (
    <div className="flex flex-col h-full">
        <header className="sticky top-0 z-10 flex h-auto items-center gap-4 border-b bg-background p-4 sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div>
                <h1 className="text-2xl font-bold">Consult</h1>
                <p className="text-muted-foreground text-sm">Connect with your care team.</p>
            </div>
        </header>
        <main className="flex-1 grid gap-6 p-4 sm:p-6 md:grid-cols-1 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-1">
                <ProviderMessaging />
                <WhatsAppConsults />
            </div>
            <div className="lg:col-span-2">
                <MediBot />
            </div>
        </main>
    </div>
  );
}
