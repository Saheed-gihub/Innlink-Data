import Link from 'next/link';
import { PanelTopOpen, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <PanelTopOpen className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">Innlink Data</span>
        </Link>
        <div className="flex items-center gap-2">
            <Link href="/admin">
                <Button variant="ghost" size="icon">
                    <span className="sr-only">Admin Dashboard</span>
                </Button>
            </Link>
             <Button variant="outline" size="sm" className="gap-2">
                <LifeBuoy className="h-4 w-4" />
                <span className="hidden sm:inline">Contact Support</span>
             </Button>
        </div>
      </div>
    </header>
  );
}
