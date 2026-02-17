'use client';

import Link from 'next/link';
import { PanelTopOpen, LifeBuoy } from 'lucide-react';
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

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <PanelTopOpen className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">Innlink Data</span>
        </Link>
        <div className="flex items-center gap-2">
            <Link href="/admin">
                <Button variant="ghost" size="icon">
                    <span className="sr-only">Admin Dashboard</span>
                </Button>
            </Link>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                        <LifeBuoy className="h-4 w-4" />
                        <span className="hidden sm:inline">Contact Support</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Contact Support</DialogTitle>
                        <DialogDescription>
                            Fill out the form below and we'll get back to you as soon as possible.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact">Your Contact (Email/Phone)</Label>
                            <Input id="contact" placeholder="you@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Type your message here." className="min-h-[100px]" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit">Send Message</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
      </div>
    </header>
  );
}
