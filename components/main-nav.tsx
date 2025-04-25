"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Film, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/features",
      label: "Features",
      active: pathname === "/features",
    },
    {
      href: "/pricing",
      label: "Pricing",
      active: pathname === "/pricing",
    },
    {
      href: "/blog",
      label: "Blog",
      active: pathname === "/blog" || pathname.startsWith("/blog/"),
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
  ]

  return (
    <div className="flex items-center">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Film className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">BLACKENSYS</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              route.active ? "text-foreground" : "text-foreground/60",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" aria-label="Toggle Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <div className="px-7">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <Film className="h-6 w-6 mr-2" />
              <span className="font-bold">BLACKENSYS</span>
            </Link>
          </div>
          <nav className="flex flex-col gap-4 text-lg mt-10 px-7">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  route.active ? "text-foreground font-medium" : "text-foreground/60",
                )}
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-7 py-6 border-t">
            <div className="flex gap-2">
              <Button className="w-full" size="sm" asChild onClick={() => setIsOpen(false)}>
                <Link href="/login">Log in</Link>
              </Button>
              <Button className="w-full" size="sm" variant="outline" asChild onClick={() => setIsOpen(false)}>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
