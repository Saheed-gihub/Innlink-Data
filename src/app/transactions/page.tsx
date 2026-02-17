'use client';
import React from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Wifi, BadgePercent, AlertTriangle, Smartphone, GraduationCap, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const transactions = [
    { id: 1, type: 'Data Purchase', description: '5GB data bundle for MTN', icon: Wifi, iconBg: 'bg-blue-500/10 text-blue-400', time: '2 mins ago', status: 'Success', amount: -20.00 },
    { id: 2, type: 'Airtime Purchase', description: 'GHS 10 airtime for Telecel', icon: Smartphone, iconBg: 'bg-green-500/10 text-green-400', time: '1 hour ago', status: 'Success', amount: -10.00 },
    { id: 3, type: 'Bill Payment', description: 'ECG Postpaid', icon: AlertTriangle, iconBg: 'bg-orange-500/10 text-orange-500', time: '3 hours ago', status: 'Queued', amount: -150.00 },
    { id: 4, type: 'WASSCE PIN Purchase', description: 'WASSCE result checker PIN', icon: GraduationCap, iconBg: 'bg-purple-500/10 text-purple-400', time: '1 day ago', status: 'Success', amount: -30.00 },
    { id: 5, type: 'Wallet Funding', description: 'Funded from Mobile Money', icon: ArrowDown, iconBg: 'bg-green-500/10 text-green-400', time: '2 days ago', status: 'Success', amount: 100.00 },
    { id: 6, type: 'Data Purchase', description: '1.5GB data bundle for AirtelTigo', icon: Wifi, iconBg: 'bg-blue-500/10 text-blue-400', time: '3 days ago', status: 'Failed', amount: -5.00 },
];

export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 pb-24 md:pb-4">
        <div className="container mx-auto max-w-4xl p-4 sm:p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Transaction History</CardTitle>
                    <CardDescription>Your latest transactions and their status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all">
                        <TabsList className="grid w-full grid-cols-4 mb-4">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="success">Success</TabsTrigger>
                            <TabsTrigger value="queued">Queued</TabsTrigger>
                            <TabsTrigger value="failed">Failed</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            <TransactionList items={transactions} />
                        </TabsContent>
                        <TabsContent value="success">
                            <TransactionList items={transactions.filter(t => t.status === 'Success')} />
                        </TabsContent>
                        <TabsContent value="queued">
                            <TransactionList items={transactions.filter(t => t.status === 'Queued')} />
                        </TabsContent>
                        <TabsContent value="failed">
                             <TransactionList items={transactions.filter(t => t.status === 'Failed')} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

const TransactionList = ({ items }: { items: typeof transactions }) => {
    if (items.length === 0) {
        return <p className="text-center text-muted-foreground py-8">No transactions in this category.</p>
    }
    return (
        <div className="space-y-4">
            {items.map(tx => {
                const Icon = tx.icon;
                const isCredit = tx.amount > 0;
                return (
                    <div key={tx.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className={cn("mt-1 flex h-10 w-10 items-center justify-center rounded-full", tx.iconBg)}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">{tx.type}</p>
                                <p className={cn("font-semibold font-mono", isCredit ? 'text-green-400' : 'text-red-400')}>
                                    {isCredit ? '+' : '-'} GHS {Math.abs(tx.amount).toFixed(2)}
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground">{tx.description}</p>
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-muted-foreground/70">{tx.time}</p>
                                <Badge variant={tx.status === 'Failed' ? 'destructive' : tx.status === 'Queued' ? 'secondary' : 'default'}
                                    className={tx.status === 'Queued' ? 'bg-amber-400 text-black' : tx.status === 'Success' ? 'bg-green-500/20 text-green-300' : '' }
                                >
                                    {tx.status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
