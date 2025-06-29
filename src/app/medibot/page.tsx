import MediBot from '@/components/dashboard/MediBot';

export default function MediBotPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <main className="flex-1 flex flex-col overflow-hidden">
        <MediBot />
      </main>
    </div>
  );
}
