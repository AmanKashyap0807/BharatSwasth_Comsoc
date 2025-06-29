"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Award, ArrowLeft, HelpCircle, ShieldCheck, XCircle } from "lucide-react"

const getTodayKey = () => `myth-completed-${new Date().toISOString().split('T')[0]}`;

export default function MythRealityPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [progress, setProgress] = React.useState(0);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [alreadyClaimed, setAlreadyClaimed] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem(getTodayKey())) {
      setAlreadyClaimed(true);
      setIsCompleted(true);
      setProgress(100);
      return;
    }
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          if (!isCompleted) {
             setIsCompleted(true);
             localStorage.setItem(getTodayKey(), 'true');
             toast({
                title: "Knowledge Gained!",
                description: (
                  <div className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-yellow-400" />
                    You've earned 20 points!
                  </div>
                ),
              });
          }
          return 100;
        }
        return prev + (100 / 60);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [toast, isCompleted]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center gap-4 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <div className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary"/>
            <h1 className="text-xl font-bold">Myth vs. Reality</h1>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-500">
                        <XCircle />
                        Myth
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold text-lg">"You can stop taking blood pressure medication once your numbers are normal."</p>
                </CardContent>
            </Card>

            <Separator />

            <Card className="border-green-500">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                        <ShieldCheck />
                        Reality
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">High blood pressure is a chronic condition. Your medication is what's keeping your numbers in a healthy range. Stopping your medication without a doctor's guidance can cause your blood pressure to spike, increasing your risk of heart attack or stroke. Always consult your doctor before making any changes to your treatment plan.</p>
                </CardContent>
            </Card>

            <div className="mt-6 pt-6">
                <p className="text-sm text-center text-muted-foreground mb-2">
                  {alreadyClaimed ? "You've already claimed your points for today." : isCompleted ? "Congratulations! You've earned your points." : "Stay on this page for 1 minute to earn your reward."}
                </p>
                <Progress value={progress} className="w-full" />
            </div>
        </div>
      </main>
    </div>
  )
}
