'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { SERVICES, ServiceType } from '@/lib/networks';
import PurchaseForm from '@/components/purchase-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Loading from '@/app/loading';
import BottomNav from '@/components/bottom-nav';

export default function PurchasePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const serviceType = params.service as ServiceType;
  const preselectedNetwork = searchParams.get('network');
  
  if (!serviceType || !SERVICES[serviceType]) {
    return <Loading />;
  }

  const service = SERVICES[serviceType];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background mesh-gradient">
       <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 sm:h-20 items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl h-10 w-10 sm:h-12 sm:w-12">
                    <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="font-headline text-lg sm:text-xl font-bold">{service.title}</h1>
                <div className="w-10 sm:w-12"></div>
            </div>
        </header>
        <main className="flex-1 pb-24 md:pb-8 flex items-start sm:items-center justify-center">
            <div className="container mx-auto max-w-md md:max-w-lg p-4 sm:p-6 animate-in zoom-in-95 duration-500">
                <Card className="glass-card shadow-2xl border-primary/10 overflow-hidden">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-inner rotate-3 hover:rotate-0 transition-transform">
                            <service.icon className="h-10 w-10" />
                        </div>
                        <CardTitle className="font-headline text-2xl sm:text-3xl font-bold tracking-tight">{service.title}</CardTitle>
                        <CardDescription className="text-sm sm:text-base font-medium text-muted-foreground/80">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <PurchaseForm service={service} preselectedNetwork={preselectedNetwork} />
                    </CardContent>
                </Card>
            </div>
        </main>
      <BottomNav />
    </div>
  );
}
