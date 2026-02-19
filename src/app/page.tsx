'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PanelTopOpen } from 'lucide-react';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if the user is already "logged in" in this browser
      const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
      
      if (isLoggedIn) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex items-center gap-4 text-primary animate-pulse">
        <PanelTopOpen className="h-12 w-12" />
        <span className="font-headline text-4xl font-bold">Innlink Data</span>
      </div>
      <p className="mt-4 text-muted-foreground">Your one-stop shop for everything digital.</p>
    </div>
  );
}
