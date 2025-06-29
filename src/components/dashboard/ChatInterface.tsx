"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Send, Paperclip, Mic, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Provider {
  id: string;
  name: string;
  role: string;
  avatar: string;
  hint: string;
}

interface Message {
  id: number;
  sender: "user" | "provider";
  content: string;
  timestamp: string;
}

// Mock messages that simulate a conversation
const getMockMessages = (providerName: string): Message[] => {
  const firstName = providerName.split(" ")[0];
  return [
    { id: 1, sender: "provider", content: `Hello! I'm ${firstName}, how can I help you today?`, timestamp: "10:00 AM" },
    { id: 2, sender: "user", content: "Hi, I have a question about my medication dosage. Is it okay to take it with food?", timestamp: "10:01 AM" },
    { id: 3, sender: "provider", content: "Of course. Let me check your file. Yes, it's perfectly fine to take with food. In fact, it can help prevent stomach upset.", timestamp: "10:02 AM" },
    { id: 4, sender: "user", content: "That's great to hear, thank you!", timestamp: "10:03 AM" },
  ];
};

export function ChatInterface({ provider }: { provider: Provider }) {
  const [messages, setMessages] = React.useState<Message[]>(getMockMessages(provider.name));
  const [input, setInput] = React.useState("");
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center gap-4 border-b bg-background p-3 sticky top-0 z-10">
        <Button asChild variant="ghost" size="icon">
          <Link href="/consult">
            <ArrowLeft />
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={provider.avatar} alt={provider.name} data-ai-hint={provider.hint} />
            <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{provider.name}</p>
            <p className="text-xs text-muted-foreground">{provider.role}</p>
          </div>
        </div>
      </header>
      <ScrollArea className="flex-1 p-4" ref={chatContainerRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "provider" && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={provider.avatar} alt={provider.name} />
                  <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-accent"}`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"} text-right`}>
                  {message.timestamp}
                </p>
              </div>
              {message.sender === "user" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback><User size={20} /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <footer className="p-4 border-t bg-background">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon">
            <Paperclip />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            autoComplete="off"
            className="flex-1"
          />
          <Button type="button" variant="ghost" size="icon">
            <Mic />
            <span className="sr-only">Use microphone</span>
          </Button>
          <Button type="submit" size="icon">
            <Send />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </footer>
    </div>
  );
}
