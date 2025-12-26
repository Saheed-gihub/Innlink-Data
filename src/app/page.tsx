'use client';

import { useState } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import ServiceGrid from '@/components/service-grid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DollarSign } from 'lucide-react';

export default function Home() {
  const [walletBalance] = useState(125.50);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 pb-24 md:pb-4">
        <div className="container mx-auto max-w-4xl p-4 sm:p-6">
          <div className="space-y-6">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">Welcome back,</p>
                    <p className="font-headline text-2xl font-bold text-primary">Daniel</p>
                  </div>
                  <Avatar className="h-16 w-16 border-2 border-primary/10">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
                    <AvatarFallback>D</AvatarFallback>
                  </Avatar>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>Wallet Balance</span>
                  </div>
                  <p className="font-headline text-lg font-semibold text-primary">
                    GHS {walletBalance.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <ServiceGrid />

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-lg">Recent Transactions</CardTitle>
                <CardDescription>Your latest activities on Innlink.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-center text-sm text-muted-foreground">No recent transactions.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
