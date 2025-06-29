import { ChatInterface } from '@/components/dashboard/ChatInterface';
import { notFound } from 'next/navigation';

// Mock data for providers, including avatars and roles
const providersData = {
  "nurse-anjali": {
    id: "nurse-anjali",
    name: "Nurse Anjali",
    role: "Registered Nurse",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman nurse",
  },
  "rajesh-kumar": {
    id: "rajesh-kumar",
    name: "Rajesh Kumar",
    role: "Student Intern",
    avatar: "https://placehold.co/100x100.png",
    hint: "man student",
  },
};

export default function ProviderChatPage({ params }: { params: { providerId: string } }) {
  const provider = (providersData as any)[params.providerId];

  if (!provider) {
    notFound();
  }

  return <ChatInterface provider={provider} />;
}
