"use client"

import * as React from "react"
import { useToast } from "@/hooks/use-toast"
import { getAiResponse } from "@/app/actions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, Image as ImageIcon, Send, Bot, User } from "lucide-react"

interface Message {
  id: number;
  sender: 'user' | 'bot';
  content: React.ReactNode;
}

export default function MediBot() {
  const [messages, setMessages] = React.useState<Message[]>([
    { id: 1, sender: 'bot', content: 'Hello! I am MediBot. How are you feeling today? Describe your symptoms, and I can provide a preliminary assessment.' }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), sender: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getAiResponse(input);

    if ('error' in response) {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.error,
      });
      setMessages(prev => prev.filter(m => m.id !== userMessage.id)); // Optionally remove failed message
    } else {
      const botResponse: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        content: (
          <div className="space-y-2">
            <p><strong className="font-semibold">Assessment:</strong> {response.assessment}</p>
            <p><strong className="font-semibold">Recommendations:</strong> {response.recommendations}</p>
          </div>
        )
      };
      setMessages(prev => [...prev, botResponse]);
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-md flex flex-col h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary"/> 
          MediBot
        </CardTitle>
        <CardDescription>Your AI health assistant for symptom analysis.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-6" ref={chatContainerRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                {message.sender === 'bot' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><Bot size={20} /></AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-lg px-4 py-2 max-w-sm ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent'}`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.sender === 'user' && (
                   <Avatar className="w-8 h-8">
                    <AvatarFallback><User size={20} /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                 <Avatar className="w-8 h-8">
                    <AvatarFallback><Bot size={20} /></AvatarFallback>
                  </Avatar>
                <div className="rounded-lg px-4 py-2 bg-accent">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-75"></span>
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150"></span>
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-300"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-background rounded-b-lg">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
              <ImageIcon className="w-5 h-5" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
              <Mic className="w-5 h-5" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your symptoms..."
              disabled={isLoading}
              autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="flex-shrink-0">
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
