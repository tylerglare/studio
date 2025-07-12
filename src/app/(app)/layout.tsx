

"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebarContent } from '@/components/shared/AppSidebarContent'
import { Button } from '@/components/ui/button'
import { Bell, UserCircle, Star, Briefcase, Mail, Search } from 'lucide-react'
import { ConnectWallet } from '@/components/web3/ConnectWallet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const role = pathname.startsWith('/talent') || pathname.startsWith('/governance') ? 'talent' : 'client'

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          {/* Content is now rendered in SidebarInset to ensure client-side rendering */}
        </Sidebar>
        <SidebarInset>
          <AppSidebarContent role={role} />
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New job invite</p>
                      <p className="text-xs text-muted-foreground">From Innovate Inc.</p>
                    </div>
                  </DropdownMenuItem>
                   <DropdownMenuItem>
                    <Star className="mr-2 h-4 w-4 text-accent" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">5-star review</p>
                      <p className="text-xs text-muted-foreground">Alex J. left feedback.</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Briefcase className="mr-2 h-4 w-4 text-green-500" />
                     <div className="flex-1">
                      <p className="text-sm font-medium">Project Started</p>
                      <p className="text-xs text-muted-foreground">"Mobile App Redesign" has begun.</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center text-sm text-muted-foreground hover:text-foreground">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" asChild>
                <Link href={role === 'talent' ? '/talent/messages' : '/client/messages'}>
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Messages</span>
                </Link>
              </Button>
              <ConnectWallet />
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">Profile</span>
              </Button>
            </div>
          </header>
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
