
'use client';

import { useState } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import ServiceGrid from '@/components/service-grid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wifi, Smartphone, GraduationCap, ArrowDown, CreditCard, Send, Plus, UserCircle, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import PromoBanner from '@/components/promo-banner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

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
          <section className="relative overflow-hidden rounded-3xl bg-primary/10 p-1 border border-primary/20 shadow-2xl">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
            
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="p-6 md:p-10">
                <div className="flex items-center justify-between mb-8 md:mb-12">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-widest">
                      Welcome Back,
                    </p>
                    {isProfileLoading ? (
                        <div className="h-8 w-32 bg-muted animate-pulse rounded" />
                    ) : (
                        <div className="space-y-1">
                            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                                {displayName} <span className="text-primary">👋</span>
                            </h2>
                            <p className="text-xs font-mono text-muted-foreground bg-background/50 w-fit px-2 py-0.5 rounded-full border border-white/5">
                                {userProfile?.phoneNumber || 'Account Connected'}
                            </p>
                        </div>
                    )}
                  </div>
                  <Avatar className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 ring-4 ring-primary/10 transition-all hover:scale-105">
                    {userProfile?.avatarUrl ? (
                        <AvatarImage src={userProfile.avatarUrl} alt="User Avatar" />
                    ) : (
                        <AvatarFallback className="bg-muted">
                            <UserCircle className="h-8 w-8 text-muted-foreground" />
                        </AvatarFallback>
                    )}
                  </Avatar>
                </div>

                <div className="relative z-10 space-y-6 md:space-y-10">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                             <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-tighter">Available Balance</p>
                             <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 text-muted-foreground"
                                onClick={() => setShowBalance(!showBalance)}
                             >
                                {showBalance ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                             </Button>
                        </div>
                        <p className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                            <span className="text-lg sm:text-xl text-primary mr-1 font-medium">GHS</span>
                            {showBalance ? walletBalance.toFixed(2) : '••••••'}
                        </p>
                    </div>
                    <Link href="/wallet" className="w-full sm:w-auto">
                        <Button size="sm" variant="outline" className="w-full sm:w-auto rounded-full border-primary/30 hover:bg-primary/10 backdrop-blur-sm">
                            View Wallet Details
                        </Button>
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 md:gap-6">
                    <Link href="/wallet" className="contents">
                      <Button className="h-20 sm:h-24 md:h-32 flex-col gap-2 rounded-2xl bg-primary text-primary-foreground hover:scale-105 transition-transform">
                          <Plus className="h-5 w-5 md:h-7 md:w-7" />
                          <span className="text-xs md:text-sm font-bold">Top up</span>
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => handleAction('Transfer')}
                      variant="secondary" 
                      className="h-20 sm:h-24 md:h-32 flex-col gap-2 rounded-2xl bg-card/50 backdrop-blur-md border border-white/5 hover:scale-105 transition-transform"
                    >
                        <Send className="h-5 w-5 md:h-7 md:w-7 text-accent" />
                        <span className="text-xs md:text-sm font-bold">Transfer</span>
                    </Button>
                    <Button 
                      onClick={() => handleAction('Withdraw')}
                      variant="secondary" 
                      className="h-20 sm:h-24 md:h-32 flex-col gap-2 rounded-2xl bg-card/50 backdrop-blur-md border border-white/5 hover:scale-105 transition-transform"
                    >
                        <CreditCard className="h-5 w-5 md:h-7 md:w-7 text-purple-400" />
                        <span className="text-xs md:text-sm font-bold">Withdraw</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <PromoBanner />
          
          <div className="space-y-4">
            <h3 className="font-headline text-lg sm:text-xl font-bold px-1">Quick Services</h3>
            <ServiceGrid />
          </div>

          <Card className="glass-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-lg md:text-xl">Activity History</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Track your spending habits</CardDescription>
              </div>
              <Link href="/transactions">
                <Button variant="link" className="text-primary font-bold text-xs sm:text-sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 md:space-y-8">
                {recentTransactions.map((tx, idx) => {
                  const Icon = tx.icon;
                  return (
                    <Link href="/transactions" key={tx.id} className="contents">
                      <div className={cn("flex items-center justify-between group cursor-pointer", idx !== recentTransactions.length - 1 && "pb-4 md:pb-6 border-b border-white/5")}>
                        <div className="flex items-center gap-4 md:gap-6">
                          <div className={cn("flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl transition-all group-hover:scale-110", tx.iconBg)}>
                            <Icon className="h-6 w-6 md:h-8 md:w-8" />
                          </div>
                          <div>
                            <p className="font-bold text-sm md:text-base">{tx.type}</p>
                            <p className="text-[10px] md:text-xs uppercase font-bold text-muted-foreground tracking-widest">{tx.time}</p>
                          </div>
                        </div>
                         <div className="text-right">
                            <p className={cn("font-bold font-mono md:text-lg", tx.status === 'credit' ? 'text-green-400' : 'text-foreground')}>
                              {showBalance ? tx.amount : '••••'}
                            </p>
                            <p className="text-[10px] md:text-xs text-muted-foreground">Successful</p>
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
