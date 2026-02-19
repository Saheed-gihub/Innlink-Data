'use client';

import { useState } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import ServiceGrid from '@/components/service-grid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wifi, Smartphone, GraduationCap, ArrowDown, CreditCard, Send, Plus } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import PromoBanner from '@/components/promo-banner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const recentTransactions = [
  { id: 1, type: 'Data Purchase', icon: Wifi, amount: '- GHS 20.00', time: '10:45 AM', status: 'debit', iconBg: 'bg-blue-500/10 text-blue-400' },
  { id: 2, type: 'Wallet Top-up', icon: ArrowDown, amount: '+ GHS 100.00', time: '9:30 AM', status: 'credit', iconBg: 'bg-green-500/10 text-green-400' },
  { id: 3, type: 'Airtime Purchase', icon: Smartphone, amount: '- GHS 10.00', time: 'Yesterday', status: 'debit', iconBg: 'bg-green-500/10 text-green-400' },
  { id: 4, type: 'WASSCE Checker', icon: GraduationCap, amount: '- GHS 30.00', time: '2 days ago', status: 'debit', iconBg: 'bg-purple-500/10 text-purple-400' },
];

export default function DashboardPage() {
  const [walletBalance] = useState(125.50);
  const { toast } = useToast();
  const adminAvatar = PlaceHolderImages.find(p => p.id === 'admin-avatar');

  const handleAction = (action: string) => {
    toast({
      title: `${action} Initialized`,
      description: `The ${action.toLowerCase()} process has started. Redirecting...`,
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background mesh-gradient">
      <Header />
      <main className="flex-1 pb-24 md:pb-4">
        <div className="container mx-auto max-w-4xl p-4 sm:p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Welcome & Balance Section */}
          <section className="relative overflow-hidden rounded-3xl bg-primary/10 p-1 border border-primary/20 shadow-2xl">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
            
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Good Morning,</p>
                    <h2 className="font-headline text-3xl font-bold text-foreground">Daniel <span className="text-primary">👋</span></h2>
                  </div>
                   {adminAvatar && (
                    <Avatar className="h-14 w-14 ring-4 ring-primary/10">
                      <AvatarImage src={adminAvatar.imageUrl} alt="User Avatar" data-ai-hint={adminAvatar.imageHint} />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                   )}
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-tighter mb-1">Available Balance</p>
                        <p className="font-headline text-4xl font-bold tracking-tight">
                            <span className="text-xl text-primary mr-1 font-medium">GHS</span>
                            {walletBalance.toFixed(2)}
                        </p>
                    </div>
                    <Link href="/wallet">
                        <Button size="sm" variant="outline" className="rounded-full border-primary/30 hover:bg-primary/10 backdrop-blur-sm">
                            Details
                        </Button>
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <Link href="/wallet" className="contents">
                      <Button className="h-20 flex-col gap-2 rounded-2xl bg-primary text-primary-foreground hover:scale-105 transition-transform">
                          <Plus className="h-5 w-5" />
                          <span className="text-xs font-bold">Top up</span>
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => handleAction('Transfer')}
                      variant="secondary" 
                      className="h-20 flex-col gap-2 rounded-2xl bg-card/50 backdrop-blur-md border border-white/5 hover:scale-105 transition-transform"
                    >
                        <Send className="h-5 w-5 text-accent" />
                        <span className="text-xs font-bold">Transfer</span>
                    </Button>
                    <Button 
                      onClick={() => handleAction('Withdraw')}
                      variant="secondary" 
                      className="h-20 flex-col gap-2 rounded-2xl bg-card/50 backdrop-blur-md border border-white/5 hover:scale-105 transition-transform"
                    >
                        <CreditCard className="h-5 w-5 text-purple-400" />
                        <span className="text-xs font-bold">Withdraw</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <PromoBanner />
          
          <div className="space-y-2">
            <h3 className="font-headline text-xl font-bold px-1">Quick Services</h3>
            <ServiceGrid />
          </div>

          <Card className="glass-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-lg">Activity History</CardTitle>
                <CardDescription>Track your spending habits</CardDescription>
              </div>
              <Link href="/transactions">
                <Button variant="link" className="text-primary font-bold">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentTransactions.map((tx, idx) => {
                  const Icon = tx.icon;
                  return (
                    <Link href="/transactions" key={tx.id} className="contents">
                      <div className={cn("flex items-center justify-between group cursor-pointer", idx !== recentTransactions.length - 1 && "pb-4 border-b border-white/5")}>
                        <div className="flex items-center gap-4">
                          <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl transition-all group-hover:scale-110", tx.iconBg)}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{tx.type}</p>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{tx.time}</p>
                          </div>
                        </div>
                         <div className="text-right">
                            <p className={cn("font-bold font-mono", tx.status === 'credit' ? 'text-green-400' : 'text-foreground')}>
                              {tx.amount}
                            </p>
                            <p className="text-[10px] text-muted-foreground">Successful</p>
                         </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}