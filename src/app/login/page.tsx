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
import { cn } from '@/lib/utils';

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
  const [otpError, setOtpError] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const network = detectNetwork(phone);
  const isPhoneFormatValid = phone.length === 10;
  const isNetworkValid = network !== 'Unknown';
  const isOtpValid = otp.length === 4;

  const handleSendOtp = () => {
    if (!isPhoneFormatValid) {
        setPhoneError('Phone number must be exactly 10 digits.');
        return;
    }
    
    if (!isNetworkValid) {
        setPhoneError('Please enter a valid Ghana network number (MTN, Telecel, or AirtelTigo).');
        return;
    }

    setPhoneError('');
    setOtpSent(true);
    toast({
        title: "Code Sent Successfully",
        description: `Your 4-digit verification code has been sent to ${phone}.`,
    });
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpValid) {
        setOtpError('Please enter the full 4-digit code.');
        return;
    }

    setIsVerifying(true);
    setOtpError('');
    
    // Simulate verification delay
    setTimeout(() => {
        router.push('/dashboard');
    }, 1500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 mesh-gradient">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center text-center">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
                <div className="bg-primary/20 p-2 rounded-2xl group-hover:scale-110 transition-transform">
                    <PanelTopOpen className="h-8 w-8 text-primary" />
                </div>
                <span className="font-headline text-2xl font-bold tracking-tight">Innlink Data</span>
            </Link>
          <h1 className="text-2xl font-bold tracking-tight font-headline">
            {otpSent ? 'Verify Identity' : 'Welcome Back'}
          </h1>
          <p className="text-sm text-muted-foreground mt-2 px-4 leading-relaxed">
            {otpSent 
                ? `We've sent a 4-digit security code to ${phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}` 
                : 'Enter your phone number to access your digital services securely.'
            }
          </p>
        </div>
        
        <Card className="glass-card border-white/5 shadow-2xl overflow-hidden">
            <CardContent className="p-8">
                {!otpSent ? (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-1">
                                Phone Number
                            </label>
                            <div className="relative group">
                                <Smartphone className={cn(
                                    "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors",
                                    phoneError ? "text-destructive" : "text-muted-foreground group-focus-within:text-primary"
                                )} />
                                <Input 
                                    id="phone" 
                                    type="tel" 
                                    placeholder="024 123 4567" 
                                    className={cn(
                                        "pl-12 h-14 text-lg font-bold rounded-2xl bg-muted/20 border-white/5 focus-visible:ring-primary/40",
                                        phoneError && "border-destructive/50 bg-destructive/5 focus-visible:ring-destructive/20"
                                    )}
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
                                <div className="flex items-start gap-2 text-destructive text-[11px] font-bold mt-2 animate-in fade-in slide-in-from-top-1 px-1">
                                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                                    <span className="leading-tight">{phoneError}</span>
                                </div>
                            )}
                        </div>
                        <Button 
                            onClick={handleSendOtp} 
                            className="w-full font-bold h-14 rounded-2xl text-base shadow-lg shadow-primary/20 active:scale-95 transition-all" 
                            disabled={phone.length < 10}
                        >
                            Get Security Code
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-1">
                                4-Digit Security Code
                            </label>
                            <div className="relative group">
                                 <Lock className={cn(
                                     "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors",
                                     otpError ? "text-destructive" : "text-muted-foreground group-focus-within:text-primary"
                                 )} />
                                <Input 
                                    id="otp" 
                                    type="text" 
                                    placeholder="0 0 0 0" 
                                    maxLength={4} 
                                    className={cn(
                                        "pl-12 tracking-[1.5em] text-center h-14 text-xl font-black rounded-2xl bg-muted/20 border-white/5 focus-visible:ring-primary/40",
                                        otpError && "border-destructive/50 bg-destructive/5 focus-visible:ring-destructive/20"
                                    )}
                                    value={otp}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        setOtp(val);
                                        if (otpError) setOtpError('');
                                    }}
                                />
                            </div>
                            {otpError && (
                                <div className="flex items-center gap-2 text-destructive text-[11px] font-bold mt-2 animate-in fade-in slide-in-from-top-1 px-1">
                                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                                    <span>{otpError}</span>
                                </div>
                            )}
                            <p className="text-[10px] text-center text-muted-foreground font-medium px-2">
                                OTP must be exactly 4 digits. Check your SMS messages.
                            </p>
                        </div>
                        <Button 
                            onClick={handleVerify} 
                            className="w-full font-bold h-14 rounded-2xl text-base shadow-lg shadow-primary/20 active:scale-95 transition-all" 
                            disabled={isVerifying || !isOtpValid}
                        >
                            {isVerifying ? (
                                <div className="flex items-center gap-2">
                                    <LoaderCircle className="animate-spin h-5 w-5" />
                                    <span>Verifying...</span>
                                </div>
                            ) : (
                                <>
                                    Complete Login
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => { setOtpSent(false); setOtp(''); setIsVerifying(false); setOtpError(''); }} 
                            className="w-full text-xs font-bold text-muted-foreground hover:text-primary transition-colors h-10 rounded-xl" 
                            disabled={isVerifying}
                        >
                            Use different phone number
                        </Button>
                    </div>
                )}
                
                <div className="relative my-8">
                    <Separator className="bg-white/5" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0c0d12] px-4 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
                        Secure Connect
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-12 gap-2 rounded-2xl border-white/5 bg-muted/10 hover:bg-muted/20 font-bold text-xs">
                        <GoogleIcon />
                        Google
                    </Button>
                    <Button variant="outline" className="h-12 gap-2 rounded-2xl border-white/5 bg-muted/10 hover:bg-muted/20 font-bold text-xs">
                        <AppleIcon />
                        Apple
                    </Button>
                </div>
            </CardContent>
        </Card>

        <p className="px-8 text-center text-[10px] leading-relaxed text-muted-foreground/60 font-medium">
          By continuing, you agree to our{' '}
          <Link href="#" className="text-foreground hover:text-primary underline transition-colors">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="#" className="text-foreground hover:text-primary underline transition-colors">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
