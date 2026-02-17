'use client';

import Link from 'next/link';
import type { ServiceType } from '@/lib/networks';
import { SERVICES } from '@/lib/networks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ServiceGrid() {
  const serviceOrder: ServiceType[] = ['data', 'airtime', 'results', 'bills', 'tv', 'internet', 'vouchers', 'tickets'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {serviceOrder.map((serviceType) => {
            const service = SERVICES[serviceType];
            if (!service) return null;

            const Icon = service.icon;
            
            // Special handling for data to show network logos
            if (service.type === 'data') {
              const networks = Object.values(service.networkProducts || {});
              return (
                <div key={service.type} className="col-span-4">
                  <div className="grid grid-cols-3 gap-4">
                     {Object.values(service.networkProducts || {}).flat().map((network) => {
                         const logo = PlaceHolderImages.find(p => p.id === (network as any).logoId);
                         return (
                            <Link href={`/purchase/data?network=${(network as any).name}`} key={(network as any).name} className="contents">
                                <div className="group cursor-pointer flex flex-col items-center gap-2 rounded-lg p-2 transition-all hover:bg-muted">
                                    {logo && (
                                    <Image
                                        src={logo.imageUrl}
                                        alt={`${(network as any).name} logo`}
                                        width={48}
                                        height={48}
                                        className="h-12 w-12 rounded-full object-cover border-2 border-card group-hover:border-primary transition-all"
                                        data-ai-hint={logo.imageHint}
                                    />
                                    )}
                                  <p className="text-xs font-semibold text-center text-muted-foreground group-hover:text-primary">{(network as any).name}</p>
                                </div>
                            </Link>
                         )
                     })}
                  </div>
                </div>
              );
            }

            return (
              <Link href={`/purchase/${service.type}`} key={service.type} className="contents">
                <div className="group cursor-pointer flex flex-col items-center gap-2 rounded-lg p-3 transition-all hover:bg-muted text-center">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-full bg-primary/10", service.iconColor)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground group-hover:text-primary">{service.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
