import { type ReactNode, Suspense } from "react"
import Link from "next/link"
import { LayoutDashboard, Film, Cloud, Wallet, BarChart3, Settings, Users, Search, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { NotificationCenter } from "@/components/notification-center"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Film className="h-6 w-6" />
            <span>BLACKENSYS</span>
          </div>

          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search videos, files, and more..."
                className="w-full appearance-none bg-background pl-8 shadow-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <NotificationCenter />
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex h-16 items-center border-b px-6">
                  <div className="flex items-center gap-2 font-bold text-xl">
                    <Film className="h-6 w-6" />
                    <span>BLACKENSYS</span>
                  </div>
                  <Button variant="ghost" size="icon" className="absolute right-4 top-4">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <nav className="grid gap-2 p-4">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/videos"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                  >
                    <Film className="h-4 w-4" />
                    <span>My Videos</span>
                  </Link>
                  <Link
                    href="/reels"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                  >
                    <Film className="h-4 w-4" />
                    <span>Reels</span>
                  </Link>
                  <Link
                    href="/cloud-storage"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                  >
                    <Cloud className="h-4 w-4" />
                    <span>Cloud Storage</span>
                  </Link>
                  <Link
                    href="/wallet"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>Wallet</span>
                  </Link>
                  <Link
                    href="/analytics"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                  <Link
                    href="/account"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                  >
                    <Users className="h-4 w-4" />
                    <span>Account</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-background md:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/videos"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Film className="h-4 w-4" />
                  <span>My Videos</span>
                </Link>
                <Link
                  href="/reels"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Film className="h-4 w-4" />
                  <span>Reels</span>
                </Link>
                <Link
                  href="/cloud-storage"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Cloud className="h-4 w-4" />
                  <span>Cloud Storage</span>
                </Link>
                <Link
                  href="/wallet"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Wallet</span>
                </Link>
                <Link
                  href="/analytics"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </Link>
                <Link
                  href="/account"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Users className="h-4 w-4" />
                  <span>Account</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </nav>
            </div>
            <div className="border-t p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36&text=JD" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse flex flex-col items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted"></div>
                  <div className="h-4 w-32 rounded bg-muted"></div>
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  )
}
