'use client';

import { useState } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Circle } from 'lucide-react';

const contacts = [
  { id: 1, name: 'Support Agent', message: 'How can I help you today?', online: true, avatar: 'https://i.pravatar.cc/150?u=agent1' },
  { id: 2, name: 'Alice (Sales)', message: 'Check out our new data plans!', online: false, avatar: 'https://i.pravatar.cc/150?u=alice' },
];

const initialMessages = [
    { id: 1, text: 'Hello, I have an issue with my last transaction.', sender: 'me', time: '10:00 AM' },
    { id: 2, text: 'Hi there! I can help with that. Could you provide the transaction ID?', sender: 'other', time: '10:02 AM' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const activeContact = contacts[0];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Mock auto-reply
    setTimeout(() => {
        const reply = {
            id: messages.length + 2,
            text: "Got it. Let me look that up for you. One moment please...",
            sender: 'other',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 pb-24 md:pb-4 overflow-hidden">
        <div className="container mx-auto max-w-4xl p-0 sm:p-4 h-[calc(100vh-10rem)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            {/* Contact List */}
            <Card className="hidden md:flex flex-col overflow-hidden">
                <div className="p-4 border-b">
                    <h2 className="font-bold font-headline">Messages</h2>
                </div>
                <CardContent className="p-2 space-y-1 overflow-y-auto">
                    {contacts.map((contact) => (
                        <div key={contact.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors group">
                            <div className="relative">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={contact.avatar} alt={contact.name} />
                                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                                </Avatar>
                                {contact.online && <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-background border-2 border-background rounded-full" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate">{contact.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{contact.message}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="col-span-1 md:col-span-2 flex flex-col h-full shadow-lg border-primary/10">
                <div className="flex items-center gap-3 p-4 border-b bg-card">
                    <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                        <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                        <AvatarFallback>{activeContact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="font-bold text-base font-headline">{activeContact.name}</p>
                        <div className="flex items-center gap-1">
                             <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                             <span className="text-[10px] uppercase font-bold text-green-500 tracking-wider">Active Now</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-muted/5 scroll-smooth">
                   {messages.map(msg => (
                       <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
                           {msg.sender === 'other' && (
                               <Avatar className="h-8 w-8 shrink-0">
                                   <AvatarImage src={activeContact.avatar} />
                                   <AvatarFallback>A</AvatarFallback>
                               </Avatar>
                           )}
                           <div className="flex flex-col max-w-[80%]">
                               <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card border rounded-bl-none'}`}>
                                   <p>{msg.text}</p>
                               </div>
                               <span className={`text-[10px] text-muted-foreground mt-1 px-1 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                                   {msg.time}
                               </span>
                           </div>
                       </div>
                   ))}
                </div>

                <div className="p-4 border-t bg-card">
                    <div className="relative flex items-center gap-2">
                        <Input 
                            placeholder="Type message..." 
                            className="flex-1 h-12 rounded-full px-5 focus-visible:ring-primary" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button 
                            size="icon" 
                            onClick={handleSendMessage}
                            className="rounded-full bg-primary text-primary-foreground h-11 w-11 shadow-md hover:scale-105 transition-transform shrink-0"
                            disabled={!inputValue.trim()}
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </Card>

          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
