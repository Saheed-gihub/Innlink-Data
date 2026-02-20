
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PanelTopOpen, Lock, Smartphone, LoaderCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { detectNetwork } from '@/lib/networks';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAuth, initiateAnonymousSignIn, useUser } from '@/firebase';
import { doc, setDoc, getFirestore, serverTimestamp } from 'firebase/firestore';

const GoogleIcon = () => <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.75 8.36,4.73 12.19,4.73C14.03,4.73 15.6,5.36 16.81,6.45L18.83,4.55C17.02,2.77 14.81,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.2 6.42,22 12.19,22C17.6,22 21.74,18.33 21.74,12.33C21.74,11.77 21.52,11.44 21.35,11.1Z"></path></svg>;
const AppleIcon = () => <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M17.4,6.56C16.8,6.21 15.7,5.78 14.5,5.8c-1.3,0-2.3,0.7-3,0.7c-0.7,0-1.5-0.7-2.8-0.7c-1.2,0-2.3,0.4-3.1,1.1c-1.7,1.4-2.9,4.1-2.9,7.1c0,3.6,1.8,5.4,3.5,5.4c1.6,0,2.2-1.1,3.8-1.1c1.6,0,2.1,1.1,3.8,1.1c1.7,0,3.5-1.9,3.5-5.5C20.3,9.56,18.8,6.86,17.4,6.56z M13.5,4.66c0.6-0.8,1.1-1.9,0.9-3c-1.2,0.1-2.4,0.8-3.1,1.6c-0.6,0.8-1.1,1.9-0.9,3C11.6,6.36,12.8,5.56,13.5,4.66z"></path></svg>;

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const db = getFirestore();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const network = detectNetwork(phone);
  const isPhoneFormatValid = phone.length === 10;
  const isNetworkValid = network !== 'Unknown';
  const isOtpValid = otp.length === 4;

  const handleSendOtp = () => {
    if (!isPhoneFormatValid) {
        setPhoneError('Please enter a valid 10-digit number.');
        return;
    }
    
    if (!isNetworkValid) {
        setPhoneError('Invalid network. Use an MTN, Telecel, or AirtelTigo number.');
        return;
    }

    setPhoneError('');
    setOtpSent(true);
    toast({
        title: "OTP Sent",
        description: `Your 4-digit code has been sent to ${phone}.`,
    });
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpValid) {
        setOtpError('OTP must be exactly 4 digits.');
        return;
    }

    setIsVerifying(true);
    setOtpError('');
    
    try {
        // Sign in anonymously to get a session
        initiateAnonymousSignIn(auth);
        
        // The auth observer in useEffect will handle the redirect
        // For the sake of the demo, we'll wait a brief moment
        setTimeout(() => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userPhone', phone);
            }
        }, 500);

    } catch (error) {
        setOtpError('Verification failed. Please try again.');
        setIsVerifying(false);
    }
  }

  if (isUserLoading) return <div className="flex min-h-screen items-center justify-center"><LoaderCircle className="animate-spin" /></div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-sm:max-w-[340px] max-w-sm space-y-6">
        <div className="flex flex-col items-center text-center">
            <Link href="/" className="flex items-center gap-2 mb-4">
                <PanelTopOpen className="h-8 w-8 text-primary" />
                <span className="font-bold text-2xl tracking-tight">Innlink Data</span>
            </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            {otpSent ? 'Enter OTP' : 'Login'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1 px-4">
            {otpSent 
                ? `Enter the 4-digit code sent to ${phone}` 
                : 'Enter your phone number to access your account'
            }
          </p>
        </div>
        
        <Card className="border shadow-md">
            <CardContent className="p-6">
                {!otpSent ? (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Smartphone className={cn(
                                    "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4",
                                    phoneError ? "text-destructive" : "text-muted-foreground"
                                )} />
                                <Input 
                                    id="phone" 
                                    type="tel" 
                                    placeholder="0241234567" 
                                    className={cn(
                                        "pl-9 h-11",
                                        phoneError && "border-destructive focus-visible:ring-destructive"
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
                                <div className="flex items-center gap-1.5 text-destructive text-xs mt-1">
                                    <AlertCircle className="h-3 w-3" />
                                    <span>{phoneError}</span>
                                </div>
                            )}
                        </div>
                        <Button 
                            onClick={handleSendOtp} 
                            className="w-full h-11 font-semibold" 
                            disabled={phone.length < 10}
                        >
                            Get Security Code
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="space-y-2">
                             <label className="text-xs font-medium text-muted-foreground">
                                4-Digit Security Code
                            </label>
                            <div className="relative">
                                 <Lock className={cn(
                                     "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4",
                                     otpError ? "text-destructive" : "text-muted-foreground"
                                 )} />
                                <Input 
                                    id="otp" 
                                    type="text" 
                                    placeholder="----" 
                                    maxLength={4} 
                                    className={cn(
                                        "pl-9 h-11 tracking-widest text-lg font-bold",
                                        otpError && "border-destructive focus-visible:ring-destructive"
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
                                <div className="flex items-center gap-1.5 text-destructive text-xs mt-1">
                                    <AlertCircle className="h-3 w-3" />
                                    <span>{otpError}</span>
                                </div>
                            )}
                        </div>
                        <Button 
                            onClick={handleVerify} 
                            className="w-full h-11 font-semibold" 
                            disabled={isVerifying || !isOtpValid}
                        >
                            {isVerifying ? (
                                <LoaderCircle className="animate-spin h-4 w-4" />
                            ) : (
                                "Verify & Login"
                            )}
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => { setOtpSent(false); setOtp(''); setIsVerifying(false); setOtpError(''); }} 
                            className="w-full h-10 text-xs text-muted-foreground" 
                            disabled={isVerifying}
                        >
                            Change phone number
                        </Button>
                    </div>
                )}
                
                <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-[10px] uppercase text-muted-foreground">
                        Or continue with
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-10 gap-2 text-xs">
                        <GoogleIcon />
                        Google
                    </Button>
                    <Button variant="outline" className="h-10 gap-2 text-xs">
                        <AppleIcon />
                        Apple
                    </Button>
                </div>
            </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground px-4">
          By continuing, you agree to our{' '}
          <Link href="#" className="underline">Terms</Link> and <Link href="#" className="underline">Privacy</Link>.
        </p>
      </div>
    </div>
  );
}
