'use client';

import { useRouter } from 'next/navigation';
import type { Service, ServiceType } from '@/lib/networks';
import { SERVICES } from '@/lib/networks';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ServiceGrid() {
  const serviceOrder: ServiceType[] = ['data', 'airtime', 'results', 'bills'];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {serviceOrder.map((serviceType) => {
          const service = SERVICES[serviceType];
          const Icon = service.icon;
          return (
            <Link href={`/purchase/${service.type}`} key={service.type}>
                <Card
                className="group cursor-pointer overflow-hidden text-center transition-all hover:shadow-xl hover:-translate-y-1 h-full"
                >
                <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className={cn("mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10", service.iconColor)}>
                    <Icon className="h-8 w-8" />
                    </div>
                    <p className="font-headline font-semibold text-primary">{service.title.split(' ')[1]}</p>
                    <p className="text-xs text-muted-foreground">{service.description.split(' ')[0]} {service.description.split(' ')[1]}</p>
                </CardContent>
                </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
