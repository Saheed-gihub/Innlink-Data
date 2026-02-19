'use client';
import React from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, User, Shield, Star, Sun, Moon, LifeBuoy, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
    const { theme, setTheme } = useTheme();
    const { toast } = useToast();

    const handleFeatureClick = (title: string) => {
        toast({
            title: title,
            description: `Accessing ${title.toLowerCase()} settings...`,
        });
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex-1 pb-24 md:pb-4">
                <div className="container mx-auto max-w-4xl p-4 sm:p-6 space-y-6">
                    <div className="flex items-center gap-4 bg-card/50 p-6 rounded-3xl border border-white/5">
                        <Avatar className="h-20 w-20 border-2 border-primary ring-4 ring-primary/10">
                            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                            <AvatarFallback>D</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold font-headline">Daniel</h1>
                            <p className="text-muted-foreground">+233 24 123 4567</p>
                        </div>
                    </div>

                    <Card className="rounded-3xl overflow-hidden border-white/5 shadow-xl">
                        <CardContent className="p-0">
                            <ul className="divide-y">
                                <MenuItem 
                                    icon={User} 
                                    title="Account Information" 
                                    description="Name, phone number, email"
                                    onClick={() => handleFeatureClick("Account Information")}
                                />
                                <MenuItem 
                                    icon={Shield} 
                                    title="KYC Verification" 
                                    description="Verify your identity"
                                    onClick={() => handleFeatureClick("KYC Verification")}
                                />
                                <MenuItem 
                                    icon={Star} 
                                    title="Refer & Earn" 
                                    description="Get rewards for inviting friends"
                                    onClick={() => handleFeatureClick("Refer & Earn")}
                                />
                            </ul>
                        </CardContent>
                    </Card>
                    
                    <Card className="rounded-3xl overflow-hidden border-white/5 shadow-xl">
                        <CardContent className="p-0 divide-y">
                            <li className="flex items-center justify-between p-4 px-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                                        {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <p className="font-semibold">Dark Mode</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={theme === 'dark'}
                                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                                />
                            </li>
                            <MenuItem 
                                icon={LifeBuoy} 
                                title="Customer Support" 
                                description="Get help with your account"
                                onClick={() => handleFeatureClick("Customer Support")}
                            />
                        </CardContent>
                    </Card>
                    
                    <Link href="/login">
                        <Button variant="ghost" className="w-full justify-start gap-4 text-destructive hover:text-destructive hover:bg-destructive/5 text-base p-6 h-auto rounded-3xl">
                            <LogOut className="h-5 w-5"/>
                            Logout
                        </Button>
                    </Link>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}

const MenuItem = ({ 
    icon: Icon, 
    title, 
    description, 
    onClick 
}: { 
    icon: React.ElementType, 
    title: string, 
    description: string,
    onClick: () => void 
}) => (
    <li 
        onClick={onClick}
        className="flex items-center justify-between p-4 px-6 hover:bg-muted/50 cursor-pointer transition-colors active:bg-muted"
    >
        <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
                <p className="font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </li>
);