'use client';

import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Wifi, BadgePercent, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const notifications = [
    { id: 1, type: 'success', title: 'Data Purchase Successful', message: 'Your 5GB data bundle for MTN has been successfully credited.', icon: Wifi, iconColor: 'text-green-500', time: '2 mins ago' },
    { id: 2, type: 'promo', title: 'Special Offer!', message: 'Get 50% bonus on all airtime purchases above GHS 20. Don\'t miss out!', icon: BadgePercent, iconColor: 'text-yellow-500', time: '1 hour ago' },
    { id: 3, type: 'warning', title: 'Network Queued', message: 'Your AirtelTigo transaction is queued due to network delay. We will notify you upon completion.', icon: AlertTriangle, iconColor: 'text-orange-500', time: '3 hours ago' },
    { id: 4, type: 'success', title: 'WASSCE PIN Purchase', message: 'Your WASSCE result checker PIN has been delivered. Check your SMS.', icon: Wifi, iconColor: 'text-green-500', time: '1 day ago' },
];


export default function NotificationsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 pb-24 md:pb-4">
        <div className="container mx-auto max-w-4xl p-4 sm:p-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline text-2xl">Notifications</CardTitle>
                        <CardDescription>Your latest alerts and updates.</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">Mark all as read</Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {notifications.map(notif => {
                            const Icon = notif.icon;
                            return (
                                <div key={notif.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                    <div className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-background ${notif.iconColor}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{notif.title}</p>
                                        <p className="text-sm text-muted-foreground">{notif.message}</p>
                                        <p className="text-xs text-muted-foreground/70 mt-1">{notif.time}</p>
                                    </div>
                                </div>
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
