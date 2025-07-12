

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Briefcase,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Search,
  Sparkles,
  Star,
  Users,
  Wallet,
  CalendarClock,
  MessagesSquare,
  DollarSign,
  Landmark,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const talentLinks = [
  { href: "/talent/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/talent/services", label: "My Services", icon: Briefcase },
  { href: "/talent/invites", label: "Job Invites", icon: Users },
  { href: "/talent/messages", label: "Messages", icon: MessagesSquare },
  { href: "/talent/earnings", label: "Earnings", icon: DollarSign },
  { href: "/talent/deadlines", label: "Deadlines", icon: CalendarClock },
  { href: "/talent/reviews", label: "Reviews", icon: Star },
  { href: "/talent/pricing-tool", label: "Pricing Tool", icon: Sparkles },
  { href: "/governance", label: "Governance", icon: Landmark },
];

const clientLinks = [
  { href: "/client/dashboard", label: "Find Services", icon: Search },
  { href: "/client/projects", label: "Services Acquired", icon: Briefcase },
  { href: "/client/messages", label: "Messages", icon: MessagesSquare },
  { href: "/client/wallet", label: "E-Wallet", icon: Wallet },
  { href: "/client/reviews", label: "Rate Services", icon: ClipboardCheck },
];

export function AppSidebarContent({ role }: { role: 'talent' | 'client' }) {
  const pathname = usePathname();
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const links = role === 'talent' ? talentLinks : clientLinks;

  const handleLogout = () => {
    disconnect();
    router.push('/');
  };

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
           <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="w-8 h-8"
            >
              <g transform="rotate(30 50 50) translate(0 -5)">
                <path 
                  d="M35,20 A15,15 0 0 1 35,80 L65,80 A15,15 0 0 1 65,20 L35,20 Z" 
                  stroke="hsl(var(--sidebar-primary-foreground))" 
                  strokeWidth="10" 
                  fill="none" 
                  strokeLinecap="round"
                />
                <path
                  d="M65,25 A15,15 0 0 1 65,75"
                  stroke="hsl(var(--sidebar-primary))"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          <h1 className="text-xl font-semibold text-sidebar-foreground font-headline">
             <span className="text-sidebar-primary">CTRL</span><span className="text-sidebar-foreground">CHAIN</span>
          </h1>
        </Link>
      </SidebarHeader>

       <SidebarMenu className="flex-1 px-2 py-4 space-y-1">
        {links.map((link) => (
          <SidebarMenuItem key={link.href}>
             <SidebarMenuButton
              asChild
              isActive={pathname === link.href}
              className="w-full justify-start"
            >
              <Link href={link.href}>
                <link.icon className="mr-3 h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <SidebarSeparator />

      <SidebarFooter>
         <SidebarMenu className="px-2 pb-2 space-y-1">
           <SidebarMenuItem>
             <div className="flex items-center gap-3 p-2">
                <Avatar>
                  <AvatarImage src="https://placehold.co/40x40.png" alt="@username" data-ai-hint="profile avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold text-sidebar-foreground truncate">
                    User Name
                  </p>
                  <p className="text-xs text-muted-foreground/70 truncate">
                    user@email.com
                  </p>
                </div>
              </div>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
