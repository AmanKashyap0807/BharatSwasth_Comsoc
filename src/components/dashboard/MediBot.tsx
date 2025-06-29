"use client"

import * as React from "react"
import { useToast } from "@/hooks/use-toast"
import { getAiResponse } from "@/app/actions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mic, Image as ImageIcon, Send, Bot, User, PlusCircle, MessageSquare, Trash2, History } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface Message {
  id: number;
  sender: 'user' | 'bot';
  content: React.ReactNode;
}

const chatHistory = [
  { id: 'chat1', title: 'Fever and cough' },
  { id: 'chat2', title: 'Skin rash query' },
  { id: 'chat3', title: 'Follow-up on headache' },
];

export default function MediBot() {
  const [messages, setMessages] = React.useState<Message[]>([
    { id: 1, sender: 'bot', content: 'Hello! I am MediBot. How are you feeling today? Describe your symptoms, and I can provide a preliminary assessment.' }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const [activeChat, setActiveChat] = React.useState('chat1');
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);

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
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
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
  
  const ChatHistoryPanel = (
    <>
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">Chat History</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {chatHistory.map((chat) => (
            <Button
              key={chat.id}
              variant={activeChat === chat.id ? "secondary" : "ghost"}
              className="w-full justify-start items-center"
              onClick={() => {
                setActiveChat(chat.id);
                setIsHistoryOpen(false);
              }}
            >
              <MessageSquare className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="truncate">{chat.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="p-2 border-t">
        <Button variant="outline" className="w-full justify-center">
          <Trash2 className="mr-2 h-4 w-4" />
          Clear History
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex h-full w-full bg-background">
      {/* Desktop History Panel */}
      <div className="hidden md:flex flex-col w-72 border-r bg-accent/40">
        {ChatHistoryPanel}
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
                <SidebarTrigger className="md:hidden" />
                <Bot className="w-6 h-6 text-primary"/> 
                <div>
                    <h1 className="text-xl font-bold">MediBot</h1>
                    <p className="text-sm text-muted-foreground hidden md:block">Your AI health assistant for symptom analysis.</p>
                </div>
            </div>
            
            <div className="md:hidden">
                <Sheet open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <History className="h-5 w-5" />
                            <span className="sr-only">Chat History</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="p-0 w-80 bg-accent/40">
                      <div className="flex flex-col h-full">
                        {ChatHistoryPanel}
                      </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>

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
        <div className="p-4 border-t bg-background">
          <form onSubmit={handleSubmit} className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your symptoms..."
              disabled={isLoading}
              autoComplete="off"
              className="pr-24"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
               <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
                <ImageIcon className="w-5 h-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
                <Mic className="w-5 h-5" />
              </Button>
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="flex-shrink-0">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
