
'use client';

import Link from 'next/link';
import type { ServiceType } from '@/lib/networks';
import { SERVICES, NETWORKS } from '@/lib/networks';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ServiceGrid() {
  const serviceOrder: ServiceType[] = ['data', 'airtime', 'airtime-to-cash', 'results', 'bills', 'tv', 'internet', 'vouchers', 'tickets'];

  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 sm:gap-5 md:gap-6">
        {serviceOrder.map((serviceType) => {
        const service = SERVICES[serviceType];
        if (!service) return null;

        const Icon = service.icon;
        
        if (service.type === 'data') {
            const networks = Object.values(NETWORKS).filter(n => n.name !== 'Unknown');
            return (
            <Card key={service.type} className="col-span-4 sm:col-span-4 md:col-span-6 lg:col-span-9 border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {networks.map((network) => {
                        const logo = PlaceHolderImages.find(p => p.id === network.logo);
                        return (
                        <Link href={`/purchase/data?network=${network.name}`} key={network.name} className="contents">
                            <div className="group relative flex flex-col items-center gap-3 sm:gap-4 rounded-[2rem] bg-card/40 backdrop-blur-xl p-4 sm:p-6 md:p-8 transition-all hover:bg-primary/10 border border-white/5 hover:border-primary/30 shadow-xl active:scale-95 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                {logo && (
                                <div className="relative z-10">
                                    <Image
                                        src={logo.imageUrl}
                                        alt={`${network.name} logo`}
                                        width={80}
                                        height={80}
                                        className="h-14 w-14 sm:h-20 sm:w-20 rounded-3xl object-cover ring-2 ring-background group-hover:ring-primary/40 shadow-2xl transition-all group-hover:scale-110"
                                        data-ai-hint={logo.imageHint}
                                    />
                                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background shadow-lg" />
                                </div>
                                )}
                                <div className="relative z-10 text-center">
                                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-tighter text-primary/70 group-hover:text-primary mb-1">Buy Data</p>
                                    <p className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary tracking-tight">{network.name}</p>
                                </div>
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
            <div className="group relative flex flex-col items-center gap-3 rounded-[1.5rem] bg-card/40 backdrop-blur-xl p-3 sm:p-4 transition-all hover:bg-primary/10 border border-white/5 hover:border-primary/30 shadow-lg active:scale-95 text-center h-full min-h-[100px] sm:min-h-[120px] justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={cn("flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl transition-all group-hover:scale-110 relative z-10", service.iconColor, "bg-background/90 shadow-inner ring-1 ring-white/10")}>
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <p className="text-[9px] sm:text-[10px] font-black text-muted-foreground group-hover:text-primary uppercase tracking-widest leading-tight relative z-10">{service.title}</p>
            </div>
            </Link>
        );
        })}
    </div>
  );
}
