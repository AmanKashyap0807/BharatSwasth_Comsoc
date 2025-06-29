"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Award, ArrowLeft, BookOpen } from "lucide-react"

const getTodayKey = () => `story-completed-${new Date().toISOString().split('T')[0]}`;

export default function StoryPage() {
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
                title: "Story Read!",
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
            <BookOpen className="w-6 h-6 text-primary"/>
            <h1 className="text-xl font-bold">1-Minute Story</h1>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>The Power of Small Steps</CardTitle>
                    <CardDescription>By Anonymous | Today's Medical Insight</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Rohan often felt overwhelmed by his new diagnosis of hypertension. The doctor's advice—exercise more, eat better, reduce stress—seemed like a mountain too high to climb. He tried to change everything at once and, predictably, failed within a week, feeling more defeated than before.</p>
                    <p>His nurse, Anjali, noticed his despair. "Don't try to climb the whole mountain in a day," she advised. "Just take one small step. This week, let's focus only on walking for 15 minutes every morning. Nothing else." Rohan was skeptical, but it seemed manageable.</p>
                    <p>The first week was a success. The next week, Anjali suggested adding one piece of fruit to his lunch. Another small, achievable step. Month by month, these tiny changes compounded. His morning walk became a jog. His diet improved naturally. His blood pressure readings started to drop steadily.</p>
                    <p className="font-semibold text-foreground">The lesson: Consistency in small, manageable habits is more powerful than sporadic, grand efforts. In managing chronic conditions, the journey isn't a sprint; it's a marathon built of small, daily steps.</p>
                </CardContent>
            </Card>

            <div className="mt-6">
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
