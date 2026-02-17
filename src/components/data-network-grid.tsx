'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NETWORKS } from '@/lib/networks';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DataNetworkGrid() {
  const networks = Object.values(NETWORKS).filter(n => n.name !== 'Unknown');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">Buy Data Bundle</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {networks.map((network) => {
            const logo = PlaceHolderImages.find(p => p.id === network.logo);
            return (
              <Link href={`/purchase/data?network=${network.name}`} key={network.name}>
                <div className="group cursor-pointer flex flex-col items-center gap-2 rounded-lg p-3 transition-all hover:bg-muted">
                    {logo && (
                    <Image
                        src={logo.imageUrl}
                        alt={`${network.name} logo`}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-full object-cover border-2 border-card group-hover:border-primary transition-all"
                        data-ai-hint={logo.imageHint}
                    />
                    )}
                  <p className="text-sm font-semibold text-center text-muted-foreground group-hover:text-primary">{network.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
