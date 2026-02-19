'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PanelTopOpen, LifeBuoy, Bell, Send, LoaderCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ThemeToggle } from './theme-toggle';
import { useToast } from '@/hooks/use-toast';

export default function Header() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
        setIsSubmitting(false);
        setOpen(false);
        toast({
            title: "Support Ticket Created",
            description: "We've received your message and will contact you shortly.",
        });
    }, 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-1.5 rounded-xl group-hover:rotate-12 transition-transform">
            <PanelTopOpen className="h-6 w-6 text-primary" />
          </div>
          <span className="font-headline text-lg font-bold tracking-tight hidden sm:inline-block">Innlink <span className="text-primary">Data</span></span>
        </Link>

        <div className="flex-1 max-w-sm mx-4 hidden md:block">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search services..." className="pl-10 bg-muted/30 border-none rounded-full h-10 focus-visible:ring-primary/50" />
            </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 hidden lg:flex hover:bg-primary/10">
                        <LifeBuoy className="h-4 w-4 text-primary" />
                        <span>Support</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-3xl border-primary/20 bg-card/90 backdrop-blur-2xl">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-2xl font-bold">Get in Touch</DialogTitle>
                        <DialogDescription>
                            We usually respond within 15 minutes.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitSupport} className="grid gap-6 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Detail</Label>
                            <Input id="contact" placeholder="Phone or Email" className="rounded-xl bg-muted/50 border-white/5" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message</Label>
                            <Textarea 
                                id="message" 
                                placeholder="How can we assist you today?" 
                                className="min-h-[120px] rounded-xl bg-muted/50 border-white/5 resize-none" 
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 rounded-xl font-bold gap-2" disabled={isSubmitting}>
                            {isSubmitting ? <LoaderCircle className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5" />}
                            {isSubmitting ? 'Sending...' : 'Submit Message'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            
            <Link href="/notifications">
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 rounded-xl">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    <span className="sr-only">Notifications</span>
                </Button>
            </Link>
            
            <div className="h-8 w-[1px] bg-white/5 mx-1 hidden sm:block" />
            
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}