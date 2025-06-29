import HealthOverview from '@/components/dashboard/HealthOverview';
import TreatmentTracker from '@/components/dashboard/TreatmentTracker';
import SymptomTracker from '@/components/dashboard/SymptomTracker';
import MediBot from '@/components/dashboard/MediBot';
import ProviderMessaging from '@/components/dashboard/ProviderMessaging';
import FamilyHealthWatch from '@/components/dashboard/FamilyHealthWatch';
import WhatsAppConsults from '@/components/dashboard/WhatsAppConsults';
import MedicDocuments from '@/components/dashboard/MedicDocuments';
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <div className="p-4 sm:p-6 lg:p-8">
          <header className="mb-6">
            <h1 className="text-2xl sm:text-4xl font-bold font-headline">BharatSwasth</h1>
            <p className="text-muted-foreground mt-1">Your personal health journey, simplified.</p>
          </header>
          <main className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <HealthOverview />
                <TreatmentTracker />
                <MedicDocuments />
                <div className="grid gap-6 md:grid-cols-2">
                  <ProviderMessaging />
                  <WhatsAppConsults />
                </div>
              </div>
              <div className="lg:col-span-1 space-y-6">
                <SymptomTracker />
                <MediBot />
                <FamilyHealthWatch />
              </div>
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </>
  );
}
