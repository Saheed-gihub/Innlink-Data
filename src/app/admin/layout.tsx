import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, Settings, Package, BarChart3, LogOut } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminAvatar = PlaceHolderImages.find(p => p.id === 'admin-avatar');

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
             {adminAvatar && (
                <Avatar className="h-10 w-10">
                    <AvatarImage src={adminAvatar.imageUrl} alt="Admin" data-ai-hint={adminAvatar.imageHint}/>
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
             )}
            <div className="overflow-hidden">
                <p className="font-semibold truncate">Daniel</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">Admin</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/admin" className="w-full">
                    <SidebarMenuButton tooltip="Dashboard" isActive>
                        <LayoutDashboard />
                        <span>Dashboard</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                 <SidebarMenuButton tooltip="Pricing">
                    <BarChart3 />
                    <span>Pricing</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                 <SidebarMenuButton tooltip="Stock">
                    <Package />
                    <span>Stock</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                 <SidebarMenuButton tooltip="Settings">
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
             <SidebarMenu>
                 <SidebarMenuItem>
                    <Link href="/" className="w-full">
                        <SidebarMenuButton tooltip="Logout">
                            <LogOut />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </Link>
                 </SidebarMenuItem>
             </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
