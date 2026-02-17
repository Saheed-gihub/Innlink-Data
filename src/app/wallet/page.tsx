'use client';
import React from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, Plus, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const walletTransactions = [
  { id: 1, type: 'Data Purchase (MTN)', amount: -20.00, time: '10:45 AM', status: 'debit' },
  { id: 2, type: 'Wallet Funding', amount: 100.00, time: '9:30 AM', status: 'credit' },
  { id: 3, type: 'Airtime Purchase', amount: -10.00, time: 'Yesterday', status: 'debit' },
  { id: 4, type: 'WASSCE Checker PIN', amount: -30.00, time: '2 days ago', status: 'debit' },
  { id: 5, type: 'Withdrawal', amount: -50.00, time: '3 days ago', status: 'debit' },
];

export default function WalletPage() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex-1 pb-24 md:pb-4">
                <div className="container mx-auto max-w-4xl p-4 sm:p-6 space-y-6">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline text-lg text-muted-foreground">My Wallet</CardTitle>
                            <CardDescription>Your current account balance.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <p className="font-headline text-5xl font-bold text-foreground">GHS 125.50</p>
                        </CardContent>
                        <CardFooter className="gap-4">
                            <Button className="flex-1 gap-2"><Plus /> Fund Wallet</Button>
                            <Button variant="outline" className="flex-1 gap-2"><ArrowRight /> Withdraw</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Transaction History</CardTitle>
                            <CardDescription>Recent activity on your wallet.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {walletTransactions.map((tx, index) => (
                                    <React.Fragment key={tx.id}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", tx.status === 'credit' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400')}>
                                                    {tx.status === 'credit' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{tx.type}</p>
                                                    <p className="text-sm text-muted-foreground">{tx.time}</p>
                                                </div>
                                            </div>
                                            <p className={cn("font-semibold font-mono text-lg", tx.status === 'credit' ? 'text-green-400' : 'text-red-400')}>
                                                {tx.status === 'credit' ? '+' : '-'} GHS {Math.abs(tx.amount).toFixed(2)}
                                            </p>
                                        </div>
                                        {index < walletTransactions.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <BottomNav />
        </div>
    )
}
