
'use client';

import React from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell, Lock, Globe, Smartphone, ShieldCheck, ChevronRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleUpdate = () => {
        toast({
            title: "Settings Saved",
            description: "Your preferences have been updated successfully.",
        });
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
                <div className="container flex h-16 items-center gap-4 px-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="font-headline text-xl font-bold">Settings</h1>
                </div>
            </header>
            
            <main className="flex-1 pb-24 md:pb-8">
                <div className="container mx-auto max-w-2xl p-4 sm:p-6 space-y-6">
                    
                    <section className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-2">Notifications</h2>
                        <Card className="rounded-3xl border-white/5 overflow-hidden">
                            <CardContent className="p-0 divide-y">
                                <SettingItem 
                                    icon={Bell} 
                                    title="Push Notifications" 
                                    description="Alerts for successful transactions"
                                    action={<Switch defaultChecked />}
                                />
                                <SettingItem 
                                    icon={Smartphone} 
                                    title="SMS Alerts" 
                                    description="Receive receipts via SMS"
                                    action={<Switch defaultChecked />}
                                />
                            </CardContent>
                        </Card>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-2">Security</h2>
                        <Card className="rounded-3xl border-white/5 overflow-hidden">
                            <CardContent className="p-0 divide-y">
                                <SettingItem 
                                    icon={Lock} 
                                    title="Transaction PIN" 
                                    description="Require PIN for all payments"
                                    action={<Switch />}
                                />
                                <SettingItem 
                                    icon={ShieldCheck} 
                                    title="Biometric Login" 
                                    description="Unlock with Face ID or Fingerprint"
                                    action={<Switch defaultChecked />}
                                />
                            </CardContent>
                        </Card>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-2">Language & Region</h2>
                        <Card className="rounded-3xl border-white/5 overflow-hidden">
                            <CardContent className="p-0 divide-y">
                                <div className="flex items-center justify-between p-4 px-6 hover:bg-muted/50 cursor-pointer transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                                            <Globe className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Language</p>
                                            <p className="text-xs text-muted-foreground">English (United Kingdom)</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <Button onClick={handleUpdate} className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl">
                        Save Preferences
                    </Button>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}

function SettingItem({ icon: Icon, title, description, action }: { 
    icon: any, 
    title: string, 
    description: string, 
    action: React.ReactNode 
}) {
    return (
        <div className="flex items-center justify-between p-4 px-6">
            <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                    <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
            </div>
            {action}
        </div>
    );
}
