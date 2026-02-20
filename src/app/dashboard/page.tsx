
'use client';

import { useState } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import ServiceGrid from '@/components/service-grid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wifi, Smartphone, GraduationCap, ArrowDown, CreditCard, Send, Plus, UserCircle, Eye, EyeOff, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import PromoBanner from '@/components/promo-banner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const recentTransactions = [
  { id: 1, type: 'Data Purchase', icon: Wifi, amount: '- GHS 20.00', time: '10:45 AM', status: 'debit', iconBg: 'bg-blue-500/10 text-blue-400' },
  { id: 2, type: 'Wallet Top-up', icon: ArrowDown, amount: '+ GHS 100.00', time: '9:30 AM', status: 'credit', iconBg: 'bg-green-500/10 text-green-400' },
  { id: 3, type: 'Airtime Purchase', icon: Smartphone, amount: '- GHS 10.00', time: 'Yesterday', status: 'debit', iconBg: 'bg-green-500/10 text-green-400' },
  { id: 4, type: 'WASSCE Checker', icon: GraduationCap, amount: '- GHS 30.00', time: '2 days ago', status: 'debit', iconBg: 'bg-purple-500/10 text-purple-400' },
];

export default function DashboardPage() {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const [showBalance, setShowBalance] = useState(false);

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

  const handleAction = (action: string) => {
    toast({
      title: `${action} Initialized`,
      description: `The ${action.toLowerCase()} process has started. Redirecting...`,
    });
  };

  const walletBalance = 125.50;
  const displayName = userProfile?.username || userProfile?.fullName || 'User';

  return (
    <div className="flex min-h-screen w-full flex-col bg-background mesh-gradient">
      <Header />
      <main className="flex-1 pb-24 md:pb-8">
        <div className="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Welcome & Balance Section */}
          <section className="relative overflow-hidden rounded-[2.5rem] bg-primary/5 p-1 border border-primary/10 shadow-2xl transition-all hover:shadow-primary/5">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
            
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="p-6 md:p-10">
                <div className="flex items-center justify-between mb-8 md:mb-12">
                  <div className="space-y-2">
                    <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.2em]">
                      Dashboard Overview
                    </p>
                    {isProfileLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-10 w-48 rounded-xl" />
                            <Skeleton className="h-4 w-32 rounded-full" />
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                                Hello, {displayName} <span className="inline-block animate-bounce">👋</span>
                            </h2>
                            <p className="text-[10px] font-mono text-muted-foreground bg-background/50 w-fit px-3 py-1 rounded-full border border-white/5">
                                {userProfile?.phoneNumber || 'Account Connected'}
                            </p>
                        </div>
                    )}
                  </div>
                  <Avatar className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 ring-4 ring-primary/20 transition-all hover:scale-105 hover:ring-primary/40 shadow-2xl">
                    {userProfile?.avatarUrl ? (
                        <AvatarImage src={userProfile.avatarUrl} alt="User Avatar" />
                    ) : (
                        <AvatarFallback className="bg-muted text-primary">
                            <UserCircle className="h-10 w-10" />
                        </AvatarFallback>
                    )}
                  </Avatar>
                </div>

                <div className="relative z-10 space-y-8 md:space-y-12">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                             <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Available Balance</p>
                             <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => setShowBalance(!showBalance)}
                             >
                                {showBalance ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                             </Button>
                        </div>
                        <div className="flex items-baseline gap-2">
                             <span className="text-xl sm:text-2xl text-primary font-bold">GHS</span>
                             <p className="font-headline text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter">
                                {showBalance ? walletBalance.toFixed(2) : '••••••'}
                             </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-green-500">
                            <TrendingUp className="h-3 w-3" />
                            <span className="text-[10px] font-bold">+2.4% this week</span>
                        </div>
                    </div>
                    <Link href="/wallet" className="w-full sm:w-auto">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-2xl border-primary/20 hover:bg-primary/10 backdrop-blur-md shadow-lg h-14 font-bold">
                            Wallet Details
                        </Button>
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 md:gap-6">
                    <Link href="/wallet" className="contents">
                      <Button className="h-24 sm:h-32 flex-col gap-3 rounded-3xl bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 border border-primary/20 group">
                          <div className="bg-white/10 p-2 sm:p-3 rounded-2xl group-hover:scale-110 transition-transform">
                            <Plus className="h-6 w-6 sm:h-8 sm:w-8" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold tracking-tight">Add Money</span>
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => handleAction('Transfer')}
                      variant="secondary" 
                      className="h-24 sm:h-32 flex-col gap-3 rounded-3xl bg-card/40 backdrop-blur-md border border-white/5 hover:scale-[1.02] active:scale-95 transition-all shadow-xl group"
                    >
                        <div className="bg-accent/10 p-2 sm:p-3 rounded-2xl text-accent group-hover:scale-110 transition-transform">
                            <Send className="h-6 w-6 sm:h-8 sm:w-8" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold tracking-tight">Transfer</span>
                    </Button>
                    <Button 
                      onClick={() => handleAction('Withdraw')}
                      variant="secondary" 
                      className="h-24 sm:h-32 flex-col gap-3 rounded-3xl bg-card/40 backdrop-blur-md border border-white/5 hover:scale-[1.02] active:scale-95 transition-all shadow-xl group"
                    >
                        <div className="bg-purple-500/10 p-2 sm:p-3 rounded-2xl text-purple-400 group-hover:scale-110 transition-transform">
                            <CreditCard className="h-6 w-6 sm:h-8 sm:w-8" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold tracking-tight">Withdraw</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <PromoBanner />
          
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <h3 className="font-headline text-xl font-bold tracking-tight">Services</h3>
                <Link href="/services" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">See All</Link>
            </div>
            <ServiceGrid />
          </div>

          <Card className="glass-card rounded-[2.5rem] overflow-hidden border-white/5 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
              <div className="space-y-1">
                <CardTitle className="font-headline text-xl font-bold">Activity</CardTitle>
                <CardDescription className="text-xs uppercase font-bold tracking-widest text-muted-foreground/60">Recent History</CardDescription>
              </div>
              <Link href="/transactions">
                <Button variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/5 rounded-full px-4">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {recentTransactions.map((tx) => {
                  const Icon = tx.icon;
                  return (
                    <Link href="/transactions" key={tx.id} className="contents">
                      <div className="flex items-center justify-between p-6 md:p-8 hover:bg-white/5 transition-all group active:scale-[0.98] cursor-pointer">
                        <div className="flex items-center gap-5 sm:gap-6">
                          <div className={cn("flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl transition-all group-hover:scale-110 shadow-lg", tx.iconBg)}>
                            <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-sm sm:text-base tracking-tight">{tx.type}</p>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground/50 tracking-widest">{tx.time}</p>
                          </div>
                        </div>
                         <div className="text-right space-y-1">
                            <p className={cn("font-bold font-mono text-base sm:text-lg", tx.status === 'credit' ? 'text-green-400' : 'text-foreground')}>
                              {tx.amount}
                            </p>
                            <div className="flex items-center justify-end gap-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                <p className="text-[9px] uppercase font-black text-muted-foreground/70 tracking-tighter">Success</p>
                            </div>
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
