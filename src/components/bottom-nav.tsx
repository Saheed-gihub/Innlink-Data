import Link from 'next/link';
import { Home, MessageSquare, Bell, Wallet, User } from 'lucide-react';

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="grid h-16 grid-cols-5 max-w-lg mx-auto">
        <Link href="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted group">
          <Home className="w-5 h-5 mb-1 text-muted-foreground group-hover:text-primary" />
          <span className="text-xs text-muted-foreground group-hover:text-primary">Home</span>
        </Link>
        <Link href="/chat" className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted group">
          <MessageSquare className="w-5 h-5 mb-1 text-muted-foreground group-hover:text-primary" />
          <span className="text-xs text-muted-foreground group-hover:text-primary">Chat</span>
        </Link>
        <Link href="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted group">
          <div className="flex items-center justify-center w-16 h-16 -mt-8 bg-primary rounded-full border-4 border-background shadow-lg hover:bg-primary/90">
            <Bell className="w-6 h-6 text-primary-foreground" />
          </div>
        </Link>
        <Link href="#" className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted group">
          <Wallet className="w-5 h-5 mb-1 text-muted-foreground group-hover:text-primary" />
          <span className="text-xs text-muted-foreground group-hover:text-primary">Wallet</span>
        </Link>
        <Link href="#" className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted group">
          <User className="w-5 h-5 mb-1 text-muted-foreground group-hover:text-primary" />
          <span className="text-xs text-muted-foreground group-hover:text-primary">Profile</span>
        </Link>
      </div>
    </div>
  );
}
