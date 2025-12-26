'use client';

import { useParams, useRouter } from 'next/navigation';
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
  const serviceType = params.service as ServiceType;
  
  if (!serviceType || !SERVICES[serviceType]) {
    // Option 1: Show a loading state while params are not yet available
    return <Loading />;
    // Option 2: Or redirect if the service is invalid after checking
    // if (router.isReady) { // Make sure router is ready before redirecting
    //   router.push('/');
    // }
    // return <Loading />; // Still show loading while router is preparing
  }

  const service = SERVICES[serviceType];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
       <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="font-headline text-lg font-bold">{service.title}</h1>
                <div className="w-8"></div>
            </div>
        </header>
        <main className="flex-1 pb-24 md:pb-4">
            <div className="container mx-auto max-w-md p-4 sm:p-6">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <service.icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PurchaseForm service={service} />
                    </CardContent>
                </Card>
            </div>
        </main>
      <BottomNav />
    </div>
  );
}