'use client';

import { useRouter } from 'next/navigation';
import type { Service, ServiceType } from '@/lib/networks';
import { SERVICES } from '@/lib/networks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ServiceGrid() {
  const serviceOrder: ServiceType[] = ['airtime', 'results', 'bills'];

  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-lg">Other Services</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-3 gap-4">
                {serviceOrder.map((serviceType) => {
                const service = SERVICES[serviceType];
                const Icon = service.icon;
                return (
                    <Link href={`/purchase/${service.type}`} key={service.type}>
                        <div
                        className="group cursor-pointer flex flex-col items-center gap-2 rounded-lg p-3 transition-all hover:bg-muted"
                        >
                            <div className={cn("flex h-14 w-14 items-center justify-center rounded-full bg-primary/10", service.iconColor)}>
                                <Icon className="h-7 w-7" />
                            </div>
                            <p className="text-sm font-semibold text-center text-muted-foreground group-hover:text-primary">{service.title}</p>
                        </div>
                    </Link>
                );
                })}
            </div>
      </CardContent>
    </Card>
  );
}
