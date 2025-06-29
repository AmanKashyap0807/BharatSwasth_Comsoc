"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Award } from "lucide-react"

const quizQuestions = [
  {
    question: "What is a common recommendation for managing hypertension (high blood pressure)?",
    options: ["Increase salt intake", "Reduce physical activity", "Follow a low-sodium diet", "Consume more processed foods"],
    answer: "Follow a low-sodium diet",
  },
  {
    question: "Which of these is a key part of managing Type 2 Diabetes?",
    options: ["Skipping meals regularly", "Monitoring blood sugar levels", "Avoiding all carbohydrates", "Only eating fruits"],
    answer: "Monitoring blood sugar levels",
  },
];

export default function HealthQuiz() {
  const [isCompleted, setIsCompleted] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCompleted(true);
    toast({
      title: "Quiz Completed!",
      description: (
        <div className="flex items-center">
          <Award className="mr-2 h-4 w-4 text-yellow-400" />
          You've earned 50 points!
        </div>
      ),
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Daily Health Quiz</CardTitle>
        <CardDescription>Answer these questions to test your knowledge and earn points.</CardDescription>
      </CardHeader>
      <CardContent>
        {isCompleted ? (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-green-600">Great job!</h3>
            <p className="text-muted-foreground">You've completed your quiz for today. Come back tomorrow for more!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {quizQuestions.map((q, index) => (
              <div key={index}>
                <p className="font-medium mb-2">{index + 1}. {q.question}</p>
                <RadioGroup required>
                  {q.options.map((option, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`q${index}-option${i}`} />
                      <Label htmlFor={`q${index}-option${i}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
            <Button type="submit" className="w-full">
              Submit & Earn 50 Points
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
