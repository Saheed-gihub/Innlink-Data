
'use client';
import React, { useState } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, Plus, ArrowRight, LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const walletTransactions = [
  { id: 1, type: 'Data Purchase (MTN)', amount: -20.00, time: '10:45 AM', status: 'debit' },
  { id: 2, type: 'Wallet Funding', amount: 100.00, time: '9:30 AM', status: 'credit' },
  { id: 3, type: 'Airtime Purchase', amount: -10.00, time: 'Yesterday', status: 'debit' },
  { id: 4, type: 'WASSCE Checker PIN', amount: -30.00, time: '2 days ago', status: 'debit' },
  { id: 5, type: 'Withdrawal', amount: -50.00, time: '3 days ago', status: 'debit' },
];

export default function WalletPage() {
    const { toast } = useToast();
    const [isFunding, setIsFunding] = useState(false);
    const [fundOpen, setFundOpen] = useState(false);
    const [showBalance, setShowBalance] = useState(false);

    const handleFundWallet = (e: React.FormEvent) => {
        e.preventDefault();
        setIsFunding(true);
        setTimeout(() => {
            setIsFunding(false);
            setFundOpen(false);
            toast({
                title: "Funding Initiated",
                description: "Check your phone for the MoMo prompt to complete payment.",
            });
        }, 1500);
    };

    const handleWithdraw = () => {
        toast({
            title: "Withdrawal System",
            description: "Please complete your KYC in the Profile section before making a withdrawal.",
        });
    };

    const currentBalance = 125.50;

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex-1 pb-24 md:pb-4">
                <div className="container mx-auto max-w-4xl p-4 sm:p-6 space-y-6">
                    <Card className="shadow-lg border-primary/20 bg-primary/5">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="font-headline text-lg text-muted-foreground">My Wallet</CardTitle>
                                <CardDescription>Your current account balance.</CardDescription>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setShowBalance(!showBalance)}
                                className="text-muted-foreground"
                            >
                                {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Button>
                        </CardHeader>
                        <CardContent>
                             <p className="font-headline text-5xl font-bold text-foreground">
                                {showBalance ? `GHS ${currentBalance.toFixed(2)}` : 'GHS ••••••'}
                             </p>
                        </CardContent>
                        <CardFooter className="gap-4">
                            <Dialog open={fundOpen} onOpenChange={setFundOpen}>
                                <DialogTrigger asChild>
                                    <Button className="flex-1 gap-2 rounded-xl h-12">
                                        <Plus className="h-5 w-5" /> Fund Wallet
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] rounded-3xl">
                                    <DialogHeader>
                                        <DialogTitle>Add Funds</DialogTitle>
                                        <DialogDescription>
                                            Enter the amount you'd like to add to your wallet via Mobile Money.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleFundWallet} className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="amount">Amount (GHS)</Label>
                                            <Input id="amount" type="number" placeholder="0.00" required />
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" className="w-full" disabled={isFunding}>
                                                {isFunding ? <LoaderCircle className="animate-spin" /> : "Initiate Payment"}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                            <Button 
                                variant="outline" 
                                className="flex-1 gap-2 rounded-xl h-12 border-primary/20"
                                onClick={handleWithdraw}
                            >
                                <ArrowRight className="h-5 w-5" /> Withdraw
                            </Button>
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
                                                {showBalance ? `${tx.status === 'credit' ? '+' : '-'} GHS ${Math.abs(tx.amount).toFixed(2)}` : '••••'}
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
