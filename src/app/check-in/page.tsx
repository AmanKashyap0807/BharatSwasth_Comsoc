import Link from 'next/link';
import HealthQuiz from '@/components/dashboard/HealthQuiz';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, HelpCircle, ArrowRight } from 'lucide-react';

export default function CheckInPage() {
  return (
    <div className="flex flex-col h-full">
        <header className="sticky top-0 z-10 flex h-auto items-center gap-4 border-b bg-background p-4 sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div>
                <h1 className="text-2xl font-bold">Daily Check-in</h1>
                <p className="text-muted-foreground text-sm">Complete your daily tasks to earn points.</p>
            </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
            <div className="max-w-2xl mx-auto space-y-6">
                <HealthQuiz />

                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Knowledge Hub</CardTitle>
                        <CardDescription>Expand your health knowledge and earn rewards.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Link href="/story" passHref>
                            <Button variant="outline" className="w-full justify-between">
                                <div className="flex items-center">
                                    <BookOpen className="mr-3 h-5 w-5 text-primary" />
                                    <span>Read a 1-Min Story</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs text-muted-foreground mr-2">+20 Points</span>
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </Button>
                        </Link>
                         <Link href="/myth-reality" passHref>
                            <Button variant="outline" className="w-full justify-between">
                                <div className="flex items-center">
                                    <HelpCircle className="mr-3 h-5 w-5 text-primary" />
                                    <span>Myth vs. Reality</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs text-muted-foreground mr-2">+20 Points</span>
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </main>
    </div>
  );
}
