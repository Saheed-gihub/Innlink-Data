'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PanelTopOpen, Lock, Smartphone, ChevronRight, LoaderCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { detectNetwork } from '@/lib/networks';
import { useToast } from '@/hooks/use-toast';

// Dummy social icons
const GoogleIcon = () => <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.75 8.36,4.73 12.19,4.73C14.03,4.73 15.6,5.36 16.81,6.45L18.83,4.55C17.02,2.77 14.81,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.2 6.42,22 12.19,22C17.6,22 21.74,18.33 21.74,12.33C21.74,11.77 21.52,11.44 21.35,11.1Z"></path></svg>;
const AppleIcon = () => <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M17.4,6.56C16.8,6.21 15.7,5.78 14.5,5.8c-1.3,0-2.3,0.7-3,0.7c-0.7,0-1.5-0.7-2.8-0.7c-1.2,0-2.3,0.4-3.1,1.1
	c-1.7,1.4-2.9,4.1-2.9,7.1c0,3.6,1.8,5.4,3.5,5.4c1.6,0,2.2-1.1,3.8-1.1c1.6,0,2.1,1.1,3.8,1.1c1.7,0,3.5-1.9,3.5-5.5
	C20.3,9.56,18.8,6.86,17.4,6.56z M13.5,4.66c0.6-0.8,1.1-1.9,0.9-3c-1.2,0.1-2.4,0.8-3.1,1.6c-0.6,0.8-1.1,1.9-0.9,3
	C11.6,6.36,12.8,5.56,13.5,4.66z"></path></svg>;

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const network = detectNetwork(phone);
  const isPhoneValid = phone.length === 10 && network !== 'Unknown';
  const isOtpValid = otp.length === 4;

  const handleSendOtp = () => {
    if (phone.length === 10 && network === 'Unknown') {
        setPhoneError('Please enter a valid Ghana network number (MTN, Telecel, or AirtelTigo).');
        return;
    }
    
    if (phone.length !== 10) {
        setPhoneError('Phone number must be exactly 10 digits.');
        return;
    }

    setPhoneError('');
    setOtpSent(true);
    toast({
        title: "OTP Sent",
        description: `A 4-digit verification code has been sent to ${phone}.`,
    });
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpValid) return;

    setIsVerifying(true);
    setTimeout(() => {
        router.push('/dashboard');
    }, 1500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 mesh-gradient">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center text-center">
            <Link href="/" className="flex items-center gap-2 mb-4">
                <PanelTopOpen className="h-8 w-8 text-primary" />
                <span className="font-headline text-2xl font-bold">Innlink Data</span>
            </Link>
          <h1 className="text-2xl font-semibold tracking-tight font-headline">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            {otpSent ? 'Enter the 4-digit OTP sent to your phone' : 'Sign in with your phone number'}
          </p>
        </div>
        
        <Card className="glass-card border-white/5">
            <CardContent className="p-6">
                {!otpSent ? (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    id="phone" 
                                    type="tel" 
                                    placeholder="024 123 4567" 
                                    className="pl-10 h-12"
                                    value={phone}
                                    maxLength={10}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        setPhone(val);
                                        if (phoneError) setPhoneError('');
                                    }}
                                />
                            </div>
                            {phoneError && (
                                <div className="flex items-center gap-2 text-destructive text-xs mt-1 animate-in fade-in slide-in-from-top-1">
                                    <AlertCircle className="h-3 w-3" />
                                    <span>{phoneError}</span>
                                </div>
                            )}
                        </div>
                        <Button 
                            onClick={handleSendOtp} 
                            className="w-full font-bold h-12 rounded-xl" 
                            disabled={phone.length < 10}
                        >
                            Send OTP
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    id="otp" 
                                    type="text" 
                                    placeholder="Enter 4-digit OTP" 
                                    maxLength={4} 
                                    className="pl-10 tracking-[0.75em] text-center h-12 font-bold"
                                    value={otp}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        setOtp(val);
                                    }}
                                />
                            </div>
                            {!isOtpValid && otp.length > 0 && (
                                <p className="text-[10px] text-center text-muted-foreground">OTP must be exactly 4 digits</p>
                            )}
                        </div>
                        <Button 
                            onClick={handleVerify} 
                            className="w-full font-bold h-12 rounded-xl" 
                            disabled={isVerifying || !isOtpValid}
                        >
                            {isVerifying ? (
                                <LoaderCircle className="animate-spin" />
                            ) : (
                                <>
                                    Verify & Continue
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                        <Button 
                            variant="link" 
                            size="sm" 
                            onClick={() => { setOtpSent(false); setOtp(''); setIsVerifying(false); }} 
                            className="w-full" 
                            disabled={isVerifying}
                        >
                            Change number
                        </Button>
                    </div>
                )}
                
                <Separator className="my-6">
                    <span className="bg-card px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">OR</span>
                </Separator>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="gap-2 rounded-xl border-white/5 bg-muted/20">
                        <GoogleIcon />
                        Google
                    </Button>
                    <Button variant="outline" className="gap-2 rounded-xl border-white/5 bg-muted/20">
                        <AppleIcon />
                        Apple
                    </Button>
                </div>
            </CardContent>
        </Card>

        <p className="px-8 text-center text-[10px] leading-relaxed text-muted-foreground">
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
