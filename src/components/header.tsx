'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PanelTopOpen, LifeBuoy, Bell, Send, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
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
    
    // Simulate API call
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
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-2 group transition-transform hover:scale-105">
          <PanelTopOpen className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold tracking-tight">Innlink Data</span>
        </Link>
        <div className="flex items-center gap-3">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 hidden sm:flex border-primary/20 hover:bg-primary/5">
                        <LifeBuoy className="h-4 w-4" />
                        <span>Support</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-xl">Contact Support</DialogTitle>
                        <DialogDescription>
                            Technical issue or billing question? We're here 24/7.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitSupport} className="grid gap-5 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact">Contact Detail (Phone/Email)</Label>
                            <Input id="contact" placeholder="024 123 4567" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">How can we help?</Label>
                            <Textarea 
                                id="message" 
                                placeholder="Describe your issue..." 
                                className="min-h-[120px] resize-none" 
                                required
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                                {isSubmitting ? <LoaderCircle className="animate-spin" /> : <Send className="h-4 w-4" />}
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Link href="/notifications">
                <Button variant="outline" size="icon" className="relative border-primary/10 hover:bg-primary/5">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="sr-only">Notifications</span>
                </Button>
            </Link>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
