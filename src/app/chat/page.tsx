'use client';

import { useState } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Circle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [showContactsOnMobile, setShowContactsOnMobile] = useState(true);
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
      <main className="flex-1 pb-24 md:pb-8 overflow-hidden h-[calc(100vh-4rem)] md:h-auto">
        <div className="container mx-auto max-w-6xl p-0 sm:p-4 md:p-6 lg:p-8 h-full md:h-[calc(100vh-12rem)]">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full relative">
            
            {/* Contact List */}
            <Card className={cn(
                "flex flex-col overflow-hidden md:flex lg:col-span-1 shadow-lg",
                !showContactsOnMobile && "hidden md:flex"
            )}>
                <div className="p-4 sm:p-6 border-b">
                    <h2 className="text-xl font-bold font-headline">Messages</h2>
                </div>
                <CardContent className="p-2 sm:p-4 space-y-1 overflow-y-auto">
                    {contacts.map((contact) => (
                        <div 
                            key={contact.id} 
                            onClick={() => setShowContactsOnMobile(false)}
                            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-primary/5 cursor-pointer transition-all group border border-transparent hover:border-primary/10"
                        >
                            <div className="relative">
                                <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                                    <AvatarImage src={contact.avatar} alt={contact.name} />
                                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                                </Avatar>
                                {contact.online && <Circle className="absolute bottom-0 right-0 h-3.5 w-3.5 fill-green-500 text-background border-2 border-background rounded-full" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm truncate">{contact.name}</p>
                                <p className="text-xs text-muted-foreground truncate opacity-70">{contact.message}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className={cn(
                "col-span-1 md:col-span-2 lg:col-span-3 flex flex-col h-full shadow-2xl border-primary/5 bg-card/30 backdrop-blur-sm",
                showContactsOnMobile && "hidden md:flex"
            )}>
                <div className="flex items-center gap-3 p-4 sm:p-6 border-b bg-card/80 backdrop-blur-md sticky top-0 z-10">
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowContactsOnMobile(true)}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-primary/20">
                        <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                        <AvatarFallback>{activeContact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="font-bold text-base sm:text-lg font-headline leading-tight">{activeContact.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                             <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                             <span className="text-[9px] sm:text-[10px] uppercase font-black text-green-500 tracking-widest">Live Online</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto bg-muted/5 scroll-smooth">
                   {messages.map(msg => (
                       <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
                           {msg.sender === 'other' && (
                               <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 shadow-md">
                                   <AvatarImage src={activeContact.avatar} />
                                   <AvatarFallback>A</AvatarFallback>
                               </Avatar>
                           )}
                           <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                               <div className={cn(
                                   "p-4 rounded-2xl text-sm sm:text-base shadow-lg transition-all",
                                   msg.sender === 'me' 
                                    ? 'bg-primary text-primary-foreground rounded-br-none' 
                                    : 'bg-card border-white/5 border rounded-bl-none'
                               )}>
                                   <p className="leading-relaxed">{msg.text}</p>
                               </div>
                               <span className={`text-[10px] font-bold text-muted-foreground/60 mt-1.5 px-1 uppercase tracking-tighter`}>
                                   {msg.time}
                               </span>
                           </div>
                       </div>
                   ))}
                </div>

                <div className="p-4 sm:p-6 border-t bg-card/80 backdrop-blur-md sticky bottom-0">
                    <div className="relative flex items-center gap-2 sm:gap-4 max-w-4xl mx-auto">
                        <Input 
                            placeholder="Write a message..." 
                            className="flex-1 h-12 sm:h-14 rounded-2xl px-6 bg-muted/30 border-none focus-visible:ring-primary/50 text-sm sm:text-base" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button 
                            size="icon" 
                            onClick={handleSendMessage}
                            className="rounded-2xl bg-primary text-primary-foreground h-12 w-12 sm:h-14 sm:w-14 shadow-xl hover:scale-105 active:scale-95 transition-all shrink-0"
                            disabled={!inputValue.trim()}
                        >
                            <Send className="h-5 w-5 sm:h-6 sm:w-6" />
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