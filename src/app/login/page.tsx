'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PanelTopOpen, Lock, Smartphone, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

// Dummy social icons
const GoogleIcon = () => <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.75 8.36,4.73 12.19,4.73C14.03,4.73 15.6,5.36 16.81,6.45L18.83,4.55C17.02,2.77 14.81,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.2 6.42,22 12.19,22C17.6,22 21.74,18.33 21.74,12.33C21.74,11.77 21.52,11.44 21.35,11.1Z"></path></svg>;
const AppleIcon = () => <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M17.4,6.56C16.8,6.21 15.7,5.78 14.5,5.8c-1.3,0-2.3,0.7-3,0.7c-0.7,0-1.5-0.7-2.8-0.7c-1.2,0-2.3,0.4-3.1,1.1
	c-1.7,1.4-2.9,4.1-2.9,7.1c0,3.6,1.8,5.4,3.5,5.4c1.6,0,2.2-1.1,3.8-1.1c1.6,0,2.1,1.1,3.8,1.1c1.7,0,3.5-1.9,3.5-5.5
	C20.3,9.56,18.8,6.86,17.4,6.56z M13.5,4.66c0.6-0.8,1.1-1.9,0.9-3c-1.2,0.1-2.4,0.8-3.1,1.6c-0.6,0.8-1.1,1.9-0.9,3
	C11.6,6.36,12.8,5.56,13.5,4.66z"></path></svg>;

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center text-center">
            <Link href="/" className="flex items-center gap-2 mb-4">
                <PanelTopOpen className="h-8 w-8 text-primary" />
                <span className="font-headline text-2xl font-bold">Innlink Data</span>
            </Link>
          <h1 className="text-2xl font-semibold tracking-tight font-headline">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            {otpSent ? 'Enter the OTP sent to your phone' : 'Sign in to access your account'}
          </p>
        </div>
        
        <Card>
            <CardContent className="p-6">
                {!otpSent ? (
                    <div className="space-y-4">
                        <div className="relative">
                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                id="phone" 
                                type="tel" 
                                placeholder="Phone Number" 
                                className="pl-10"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <Button onClick={() => setOtpSent(true)} className="w-full font-semibold" disabled={phone.length < 10}>
                            Send OTP
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="relative">
                             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input id="otp" type="text" placeholder="Enter 4-digit OTP" className="pl-10 tracking-[1em] text-center"/>
                        </div>
                        <Link href="/dashboard" className="w-full">
                            <Button className="w-full font-semibold">
                                Verify & Continue
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Button variant="link" size="sm" onClick={() => setOtpSent(false)} className="w-full">
                            Change number
                        </Button>
                    </div>
                )}
                
                <Separator className="my-6">
                    <span className="bg-card px-2 text-xs text-muted-foreground">OR</span>
                </Separator>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="gap-2">
                        <GoogleIcon />
                        Google
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <AppleIcon />
                        Apple
                    </Button>
                </div>
            </CardContent>
        </Card>

        <p className="px-8 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <Link href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
