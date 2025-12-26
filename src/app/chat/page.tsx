'use client';

import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const contacts = [
  { id: 1, name: 'Alice', message: 'Hey, how are you?', online: true, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a' },
  { id: 2, name: 'Bob', message: 'See you tomorrow!', online: false, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
  { id: 3, name: 'Charlie', message: 'Okay, sounds good.', online: true, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c' },
];

const messages = [
    { id: 1, text: 'Hi Alice!', sender: 'me' },
    { id: 2, text: 'Hey, how are you?', sender: 'other' },
    { id: 3, text: 'I am good, thanks! How about you?', sender: 'me' },
    { id: 4, text: 'Doing great! Just working on the new project.', sender: 'other' },
];

export default function ChatPage() {
  const activeContact = contacts[0];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 pb-24 md:pb-4">
        <div className="container mx-auto max-w-4xl p-0 sm:p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-10rem)]">
            {/* Contact List */}
            <Card className="hidden md:flex flex-col">
                <CardContent className="p-4 space-y-2">
                    {contacts.map((contact) => (
                        <div key={contact.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted cursor-pointer">
                            <Avatar className="h-10 w-10 relative">
                                <AvatarImage src={contact.avatar} alt={contact.name} />
                                <AvatarFallback>{contact.name[0]}</AvatarFallback>
                                {contact.online && <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>}
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{contact.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{contact.message}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="col-span-1 md:col-span-2 flex flex-col">
                <div className="flex items-center gap-4 p-4 border-b">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                        <AvatarFallback>{activeContact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-lg">{activeContact.name}</p>
                        <p className="text-sm text-green-500">Online</p>
                    </div>
                </div>
                <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
                   {messages.map(msg => (
                       <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                           {msg.sender === 'other' && <Avatar className="h-8 w-8"><AvatarImage src={activeContact.avatar} /></Avatar>}
                           <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.sender === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'}`}>
                               <p>{msg.text}</p>
                           </div>
                       </div>
                   ))}
                </CardContent>
                <div className="p-4 border-t">
                    <div className="relative">
                        <Input placeholder="Type a message..." className="pr-12 h-12 rounded-full" />
                        <Button size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-accent text-accent-foreground h-9 w-9">
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
