import Link from "next/link"
import { AlertCircle, ArrowLeft, Home, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NotFound() {
  return (
    <div className="container flex h-screen flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-muted p-6">
          <AlertCircle className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="mb-2 text-4xl font-bold">Page Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>

        <div className="mt-8 w-full max-w-md">
          <p className="mb-4 text-sm text-muted-foreground">Or search for something else:</p>
          <form action="/search" method="GET" className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input name="q" type="search" placeholder="Search videos, channels, and more..." className="pl-10 pr-16" />
            <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8">
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
