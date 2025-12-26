import Link from 'next/link';
import { PanelTopOpen, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <PanelTopOpen className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">Innlink Data</span>
        </Link>
        <Link href="/admin">
           <Button variant="ghost" size="icon">
             <UserCog className="h-5 w-5" />
             <span className="sr-only">Admin Dashboard</span>
           </Button>
        </Link>
      </div>
    </header>
  );
}
