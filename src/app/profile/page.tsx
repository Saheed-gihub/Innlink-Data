'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, User, Shield, Star, Sun, Moon, LifeBuoy, LogOut, Camera, Save, LoaderCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
    const { theme, setTheme } = useTheme();
    const { toast } = useToast();
    const router = useRouter();
    
    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [accountDialogOpen, setAccountDialogOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUserName(localStorage.getItem('userName') || '');
            setUserAvatar(localStorage.getItem('userAvatar') || '');
        }
    }, []);

    const handleUpdateAccount = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        setTimeout(() => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('userName', userName);
                localStorage.setItem('userAvatar', userAvatar);
            }
            setIsSaving(false);
            setAccountDialogOpen(false);
            toast({
                title: "Profile Updated",
                description: "Your information has been saved successfully.",
            });
        }, 1200);
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('isLoggedIn');
        }
        router.push('/login');
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex-1 pb-24 md:pb-4">
                <div className="container mx-auto max-w-4xl p-4 sm:p-6 space-y-6">
                    <div className="flex items-center gap-4 bg-card/50 p-6 rounded-3xl border border-white/5">
                        <Avatar className="h-20 w-20 border-2 border-primary ring-4 ring-primary/10">
                            <AvatarImage src={userAvatar || "https://i.pravatar.cc/150?u=a042581f4e29026704d"} />
                            <AvatarFallback>{userName ? userName[0] : 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold font-headline">{userName || 'User'}</h1>
                            <p className="text-muted-foreground">+233 24 123 4567</p>
                        </div>
                    </div>

                    <Card className="rounded-3xl overflow-hidden border-white/5 shadow-xl">
                        <CardContent className="p-0">
                            <ul className="divide-y">
                                <Dialog open={accountDialogOpen} onOpenChange={setAccountDialogOpen}>
                                    <DialogTrigger asChild>
                                        <MenuItem 
                                            icon={User} 
                                            title="Account Information" 
                                            description="Set your name and profile picture"
                                            onClick={() => {}}
                                        />
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] rounded-3xl">
                                        <DialogHeader>
                                            <DialogTitle className="font-headline text-xl">Account Information</DialogTitle>
                                            <DialogDescription>
                                                This information will be displayed on your dashboard.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleUpdateAccount} className="space-y-6 py-4">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="relative group">
                                                    <Avatar className="h-24 w-24 border-2 border-primary/20">
                                                        <AvatarImage src={userAvatar || "https://i.pravatar.cc/150?u=default"} />
                                                        <AvatarFallback>U</AvatarFallback>
                                                    </Avatar>
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                        <Camera className="text-white h-6 w-6" />
                                                    </div>
                                                </div>
                                                <p className="text-xs text-muted-foreground">Click to upload photo (Simulator)</p>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Full Name</Label>
                                                    <Input 
                                                        id="name" 
                                                        placeholder="e.g. Daniel Kwame" 
                                                        value={userName}
                                                        onChange={(e) => setUserName(e.target.value)}
                                                        className="rounded-xl h-12"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="avatar">Avatar URL (Optional)</Label>
                                                    <Input 
                                                        id="avatar" 
                                                        placeholder="https://..." 
                                                        value={userAvatar}
                                                        onChange={(e) => setUserAvatar(e.target.value)}
                                                        className="rounded-xl h-12"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" className="w-full h-12 rounded-xl font-bold gap-2" disabled={isSaving}>
                                                    {isSaving ? <LoaderCircle className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4" />}
                                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                                <MenuItem 
                                    icon={Shield} 
                                    title="KYC Verification" 
                                    description="Verify your identity"
                                    onClick={() => toast({ title: "KYC System", description: "Verification portal is temporarily offline." })}
                                />
                                <MenuItem 
                                    icon={Star} 
                                    title="Refer & Earn" 
                                    description="Get rewards for inviting friends"
                                    onClick={() => toast({ title: "Referrals", description: "Sharing system is loading..." })}
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
                                onClick={() => router.push('/chat')}
                            />
                        </CardContent>
                    </Card>
                    
                    <Button 
                        variant="ghost" 
                        onClick={handleLogout}
                        className="w-full justify-start gap-4 text-destructive hover:text-destructive hover:bg-destructive/5 text-base p-6 h-auto rounded-3xl"
                    >
                        <LogOut className="h-5 w-5"/>
                        Logout
                    </Button>
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
