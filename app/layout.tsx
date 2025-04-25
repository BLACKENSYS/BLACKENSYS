import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BLACKENSYS - Video Streaming & Unlimited Cloud Storage Platform",
  description:
    "BLACKENSYS Private Limited offers video streaming, content creation, and unlimited cloud storage solutions. Create, share, monetize, and store all your digital content securely.",
  keywords: [
    "blackensys",
    "blackensys private limited",
    "blackensys limited",
    "video sharing",
    "cloud storage",
    "content creation",
    "monetization",
    "business tools",
    "reels",
    "short-form video",
    "unlimited storage",
    "video streaming",
  ],
  authors: [{ name: "BLACKENSYS Team" }],
  creator: "BLACKENSYS Private Limited",
  publisher: "BLACKENSYS Private Limited",
  metadataBase: new URL("https://blackensys.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-us",
      "hi-IN": "/hi-in",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blackensys.com",
    title: "BLACKENSYS - Video Streaming & Unlimited Cloud Storage Platform",
    description:
      "BLACKENSYS Private Limited offers video streaming, content creation, and unlimited cloud storage solutions.",
    siteName: "BLACKENSYS",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BLACKENSYS - Video Streaming & Unlimited Cloud Storage Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BLACKENSYS - Video Streaming & Unlimited Cloud Storage Platform",
    description:
      "BLACKENSYS Private Limited offers video streaming, content creation, and unlimited cloud storage solutions.",
    creator: "@blackensys",
    images: ["/images/twitter-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    other: {
      me: ["support@blackensys.com"],
    },
  },
  category: "Technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center justify-between">
                <MainNav />
                <div className="flex items-center gap-4">
                  <ModeToggle />
                  <div className="hidden md:flex gap-2">
                    <Button variant="ghost" asChild>
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/signup">Sign up</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
