'use client';

import Link from 'next/link';
import type { ServiceType } from '@/lib/networks';
import { SERVICES, NETWORKS } from '@/lib/networks';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ServiceGrid() {
  const serviceOrder: ServiceType[] = ['data', 'airtime', 'results', 'bills', 'tv', 'internet', 'vouchers', 'tickets'];

  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4 lg:gap-6">
        {serviceOrder.map((serviceType) => {
        const service = SERVICES[serviceType];
        if (!service) return null;

        const Icon = service.icon;
        
        if (service.type === 'data') {
            const networks = Object.values(NETWORKS).filter(n => n.name !== 'Unknown');
            return (
            <Card key={service.type} className="col-span-4 sm:col-span-4 md:col-span-6 lg:col-span-8 border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    {networks.map((network) => {
                        const logo = PlaceHolderImages.find(p => p.id === network.logo);
                        return (
                        <Link href={`/purchase/data?network=${network.name}`} key={network.name} className="contents">
                            <div className="group relative flex flex-col items-center gap-2 sm:gap-3 rounded-3xl bg-card/40 backdrop-blur-md p-3 sm:p-4 md:p-6 transition-all hover:bg-primary/10 border border-white/5 hover:border-primary/30 shadow-sm active:scale-95 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                                {logo && (
                                <Image
                                    src={logo.imageUrl}
                                    alt={`${network.name} logo`}
                                    width={64}
                                    height={64}
                                    className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-2xl object-cover ring-2 ring-background group-hover:ring-primary/20 shadow-lg transition-all"
                                    data-ai-hint={logo.imageHint}
                                />
                                )}
                                <p className="text-[10px] sm:text-xs font-bold text-center text-muted-foreground group-hover:text-primary tracking-tight">{network.name}</p>
                            </div>
                        </Link>
                        )
                    })}
                </div>
                </CardContent>
            </Card>
            );
        }

        return (
            <Link href={`/purchase/${service.type}`} key={service.type} className="contents">
            <div className="group relative flex flex-col items-center gap-2 sm:gap-3 rounded-2xl bg-card/40 backdrop-blur-md p-2 sm:p-3 md:p-4 transition-all hover:bg-primary/10 border border-white/5 hover:border-primary/30 shadow-sm active:scale-95 text-center h-full min-h-[90px] sm:min-h-[110px] justify-center">
                <div className={cn("flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl transition-all group-hover:scale-110", service.iconColor, "bg-background/80 shadow-inner")}>
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground group-hover:text-primary uppercase tracking-tighter leading-tight">{service.title}</p>
            </div>
            </Link>
        );
        })}
    </div>
  );
}
