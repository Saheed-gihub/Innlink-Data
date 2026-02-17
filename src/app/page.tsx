'use client';

import { useState } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import ServiceGrid from '@/components/service-grid';
import DataNetworkGrid from '@/components/data-network-grid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wifi, Smartphone, GraduationCap, ArrowUp, ArrowDown } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const recentTransactions = [
  { id: 1, type: 'Data Purchase', icon: Wifi, amount: '- GHS 20.00', time: '10:45 AM', status: 'debit', iconBg: 'bg-blue-500/10 text-blue-400' },
  { id: 2, type: 'Wallet Top-up', icon: ArrowDown, amount: '+ GHS 100.00', time: '9:30 AM', status: 'credit', iconBg: 'bg-green-500/10 text-green-400' },
  { id: 3, type: 'Airtime Purchase', icon: Smartphone, amount: '- GHS 10.00', time: 'Yesterday', status: 'debit', iconBg: 'bg-green-500/10 text-green-400' },
  { id: 4, type: 'WASSCE Checker', icon: GraduationCap, amount: '- GHS 30.00', time: '2 days ago', status: 'debit', iconBg: 'bg-purple-500/10 text-purple-400' },
];

export default function Home() {
  const [walletBalance] = useState(125.50);
  const adminAvatar = PlaceHolderImages.find(p => p.id === 'admin-avatar');

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 pb-24 md:pb-4">
        <div className="container mx-auto max-w-4xl p-4 sm:p-6">
          <div className="space-y-6">
            <Card className="overflow-hidden shadow-lg bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">Welcome back,</p>
                    <p className="font-headline text-2xl font-bold text-primary">Daniel</p>
                  </div>
                   {adminAvatar && (
                    <Avatar className="h-16 w-16 border-2 border-primary/20">
                      <AvatarImage src={adminAvatar.imageUrl} alt="User Avatar" data-ai-hint={adminAvatar.imageHint} />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                   )}
                </div>
                <Separator className="my-4 bg-primary/10" />
                <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-muted-foreground">
                    <ArrowUp className="h-4 w-4 text-green-400" />
                    <span>Wallet Balance</span>
                  </div>
                  <p className="font-headline text-xl font-semibold text-foreground">
                    GHS {walletBalance.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <DataNetworkGrid />
            
            <ServiceGrid />

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-lg">Recent Transactions</CardTitle>
                <CardDescription>Your latest activities on Innlink.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.length > 0 ? (
                    recentTransactions.map(tx => {
                      const Icon = tx.icon;
                      return (
                        <div key={tx.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", tx.iconBg)}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-semibold">{tx.type}</p>
                              <p className="text-sm text-muted-foreground">{tx.time}</p>
                            </div>
                          </div>
                           <p className={cn("font-semibold font-mono", tx.status === 'credit' ? 'text-green-400' : 'text-foreground')}>
                            {tx.amount}
                          </p>
                        </div>
                      )
                    })
                  ) : (
                     <p className="text-center text-sm text-muted-foreground">No recent transactions.</p>
                  )}
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
