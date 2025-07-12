
"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, MessagesSquare } from "lucide-react";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const conversations = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://placehold.co/40x40.png",
    aiHint: "professional man",
    lastMessage: "Sounds good, I'll get started on the initial concepts.",
    time: "10:42 AM",
    unread: 0,
    online: true,
  },
  {
    id: 2,
    name: "Maria Garcia",
    avatar: "https://placehold.co/40x40.png",
    aiHint: "creative woman",
    lastMessage: "Can you provide the brand guidelines?",
    time: "9:30 AM",
    unread: 2,
    online: false,
  },
  {
    id: 3,
    name: "Sam Wilson",
    avatar: "https://placehold.co/40x40.png",
    aiHint: "tech professional",
    lastMessage: "The server migration is complete.",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
    {
    id: 4,
    name: "Emily Carter",
    avatar: "https://placehold.co/40x40.png",
    aiHint: "woman writer",
    lastMessage: "Here's the first draft of the blog post.",
    time: "2 days ago",
    unread: 0,
    online: false,
  },
];

const messages = {
  1: [
    { from: "other", text: "Hey, just checking in on the project status. How are the mockups coming along?", time: "10:30 AM" },
    { from: "me", text: "Hi John, going well! I should have the first version ready for you by tomorrow EOD.", time: "10:32 AM" },
    { from: "other", text: "Sounds good, I'll get started on the initial concepts.", time: "10:42 AM" },
  ],
  2: [
     { from: "other", text: "Hello! I'm excited to start working on the logo. Can you provide the brand guidelines?", time: "9:30 AM" },
  ],
  3: [
    { from: "other", text: "Just wanted to let you know, the server migration is complete. Everything should be running smoothly now.", time: "Yesterday" },
    { from: "me", text: "Great, thanks for the update Sam! I'll check it out.", time: "Yesterday" },
  ],
  4: [],
};

export default function ClientMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [message, setMessage] = useState('');
  
  const handleSendMessage = () => {
    // In a real app, this would send the message to a server
    console.log("Sending message:", message);
    setMessage('');
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
       <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <MessagesSquare className="w-8 h-8 text-accent" />
          Messages
        </h1>
        <p className="text-muted-foreground">Communicate with your freelancers.</p>
      </div>
      <Card className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full">
        {/* Conversation List */}
        <div className="col-span-1 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                onClick={() => setSelectedConversation(convo)}
                className={cn(
                  "flex items-center gap-3 p-4 w-full text-left hover:bg-accent/50 transition-colors",
                  selectedConversation.id === convo.id && "bg-accent"
                )}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={convo.avatar} alt={convo.name} data-ai-hint={convo.aiHint} />
                    <AvatarFallback>{convo.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {convo.online && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold truncate">{convo.name}</p>
                    <p className="text-xs text-muted-foreground">{convo.time}</p>
                  </div>
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                    {convo.unread > 0 && <Badge className="bg-primary text-primary-foreground h-5 px-1.5">{convo.unread}</Badge>}
                  </div>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 lg:col-span-3 flex flex-col h-full">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} data-ai-hint={selectedConversation.aiHint} />
                  <AvatarFallback>{selectedConversation.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedConversation.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {(messages as any)[selectedConversation.id].map((msg: any, index: number) => (
                     <div key={index} className={cn("flex items-end gap-2", msg.from === "me" ? "justify-end" : "justify-start")}>
                      {msg.from === 'other' && <Avatar className="h-8 w-8"><AvatarImage src={selectedConversation.avatar} /></Avatar>}
                      <div>
                        <Card className={cn(
                          "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl",
                          msg.from === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary rounded-bl-none'
                        )}>
                          <p>{msg.text}</p>
                        </Card>
                        <p className={cn("text-xs text-muted-foreground mt-1", msg.from === 'me' ? 'text-right' : 'text-left')}>{msg.time}</p>
                      </div>
                       {msg.from === 'me' && <Avatar className="h-8 w-8"><AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="user avatar" /></Avatar>}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="relative">
                  <Input 
                    placeholder="Type a message..." 
                    className="pr-12 h-12"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button size="icon" className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleSendMessage} disabled={!message}>
                    <Send className="h-4 w-4"/>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
