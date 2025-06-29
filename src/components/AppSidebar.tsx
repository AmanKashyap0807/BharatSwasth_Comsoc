'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bot,
  FolderHeart,
  HeartPulse,
  LayoutDashboard,
  MessageCircle,
  Users,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/check-in', label: 'Check-in', icon: HeartPulse },
    { href: '/consult', label: 'Consult', icon: MessageCircle },
    { href: '/medibot', label: 'MediBot', icon: Bot },
    { href: '/family', label: 'Family Watch', icon: Users },
    { href: '/documents', label: 'Documents', icon: FolderHeart },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
            <Avatar className="h-12 w-12">
                <AvatarImage src="https://placehold.co/100x100.png" alt="Rohan Sharma" data-ai-hint="man portrait"/>
                <AvatarFallback>RS</AvatarFallback>
            </Avatar>
            <div className='group-data-[collapsible=icon]:hidden'>
                <p className="text-base font-semibold text-sidebar-foreground">Rohan Sharma</p>
                <p className="text-sm text-sidebar-foreground/80">Age: 32</p>
            </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
