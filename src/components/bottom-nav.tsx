'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Wallet, Receipt, User, MessagesSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/dashboard', icon: LayoutGrid, label: 'Home' },
    { href: '/wallet', icon: Wallet, label: 'Wallet' },
    { href: '/transactions', icon: Receipt, label: 'History' },
    { href: '/chat', icon: MessagesSquare, label: 'Chat' },
    { href: '/profile', icon: User, label: 'Profile' },
]

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="grid h-16 grid-cols-5 max-w-lg mx-auto">
        {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
                <Link key={item.href} href={item.href} className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted group">
                    <Icon className={cn("w-5 h-5 mb-1 text-muted-foreground group-hover:text-primary", isActive && "text-primary")} />
                    <span className={cn("text-xs text-muted-foreground group-hover:text-primary", isActive && "text-primary")}>{item.label}</span>
                </Link>
            )
        })}
      </div>
    </div>
  );
}
