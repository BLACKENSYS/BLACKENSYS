import Link from "next/link"
import { ArrowLeft, ArrowRight, Cloud, Film, Shield, Users, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Video className="h-6 w-6" />
            <span>BLACKENSYS</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="/#pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
            </Link>
            <Link href="/#faq" className="text-sm font-medium hover:underline underline-offset-4">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">All Features</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore all the features that BLACKENSYS has to offer.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 mb-2" />
                <CardTitle>User Account Management</CardTitle>
                <CardDescription>Secure sign-up, profile management, and multiple user roles</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Sign up via Email, Phone, or Social Media</li>
                  <li>Two-Factor Authentication (2FA)</li>
                  <li>Profile customization options</li>
                  <li>Multiple user roles (Consumer, Creator, Business)</li>
                  <li>Account recovery options</li>
                  <li>User preferences and settings</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/features/accounts" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Film className="h-10 w-10 mb-2" />
                <CardTitle>Video Creation & Consumption</CardTitle>
                <CardDescription>Create, watch, and interact with videos</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Personalized video feed</li>
                  <li>Built-in video editor with effects</li>
                  <li>Live streaming capabilities</li>
                  <li>Interactive features (likes, comments, shares)</li>
                  <li>Video recommendations</li>
                  <li>Playlists and collections</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/features/video" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Cloud className="h-10 w-10 mb-2" />
                <CardTitle>Unlimited Cloud Storage</CardTitle>
                <CardDescription>Store and manage all your files securely</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Unlimited storage capacity</li>
                  <li>File organization and search tools</li>
                  <li>Secure file sharing options</li>
                  <li>File history and versioning</li>
                  <li>Automatic backup</li>
                  <li>Cross-device synchronization</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/features/storage" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 mb-2" />
                <CardTitle>Content Creation Tools</CardTitle>
                <CardDescription>Professional tools for content creators</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Channel creation and verification</li>
                  <li>Advanced video analytics</li>
                  <li>Monetization options</li>
                  <li>Content scheduling and SEO tools</li>
                  <li>Audience engagement features</li>
                  <li>Collaboration tools</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/features/creation" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 mb-2" />
                <CardTitle>Advertisement & Business</CardTitle>
                <CardDescription>Tools for businesses to promote their products</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Ad campaign management</li>
                  <li>Targeted advertising options</li>
                  <li>Performance analytics</li>
                  <li>GST-compliant billing</li>
                  <li>Audience insights</li>
                  <li>Brand safety controls</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/features/business" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Cloud className="h-10 w-10 mb-2" />
                <CardTitle>File Management</CardTitle>
                <CardDescription>Organize and share your files easily</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Drag-and-drop interface</li>
                  <li>Folder organization</li>
                  <li>Shareable links with permissions</li>
                  <li>Collaborative workspaces</li>
                  <li>File tagging and categorization</li>
                  <li>Advanced search capabilities</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/features/files" className="w-full">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Ready to experience all these features?</h2>
              <p className="text-muted-foreground">Sign up today and start creating amazing content.</p>
            </div>
            <Link href="/signup">
              <Button size="lg" className="gap-1.5">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Film className="h-6 w-6" />
              <span>BLACKENSYS</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 BLACKENSYS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
