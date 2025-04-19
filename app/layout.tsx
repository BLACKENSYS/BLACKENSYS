import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BLACKENSYS - Video Streaming & Cloud Storage",
  description: "Stream short videos and store your files securely with BLACKENSYS - Dark After Light",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="BLACKENSYS - Video Streaming & Unlimited Cloud Storage" />
        <meta name="keywords" content="video streaming, cloud storage, content creation, BLACKENSYS" />
        <meta name="author" content="BLACKENSYS Private Limited" />
        <meta property="og:title" content="BLACKENSYS - Video Streaming & Cloud Storage" />
        <meta property="og:description" content="Stream short videos and store your files securely with BLACKENSYS" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.blackensys.com" />
        <meta property="og:image" content="/images/blackensys-og.jpg" />
        <link rel="canonical" href="https://www.blackensys.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
