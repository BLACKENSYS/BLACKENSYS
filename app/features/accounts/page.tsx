import Link from "next/link"
import { ArrowLeft, Film, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AccountsFeaturePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Film className="h-6 w-6" />
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
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link
              href="/features"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to features
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Feature</div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">User Account Management</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Secure sign-up, profile management, and multiple user roles
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Secure Authentication</h2>
                <p className="text-muted-foreground mb-4">
                  Our platform offers multiple secure authentication methods to ensure your account remains protected.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Email and password authentication</li>
                  <li>Phone number verification</li>
                  <li>Social media login options</li>
                  <li>Two-factor authentication (2FA)</li>
                  <li>Biometric authentication support</li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-muted rounded-lg p-4 aspect-video flex items-center justify-center">
                <Users className="h-24 w-24 text-primary" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
                <p className="text-muted-foreground mb-4">
                  Customize your profile to showcase your identity and manage your personal information.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Profile picture and banner customization</li>
                  <li>Bio and personal information</li>
                  <li>Privacy settings</li>
                  <li>Account recovery options</li>
                  <li>Email and notification preferences</li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-muted rounded-lg p-4 aspect-video flex items-center justify-center">
                <Users className="h-24 w-24 text-primary" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Multiple User Roles</h2>
                <p className="text-muted-foreground mb-4">
                  Different account types to suit your needs, whether you're a casual user, content creator, or
                  business.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Basic user accounts</li>
                  <li>Creator accounts with advanced tools</li>
                  <li>Business accounts with advertising capabilities</li>
                  <li>Enterprise solutions with custom features</li>
                  <li>Role-based access controls</li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-muted rounded-lg p-4 aspect-video flex items-center justify-center">
                <Users className="h-24 w-24 text-primary" />
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Ready to create your account?</h2>
              <p className="text-muted-foreground">
                Sign up today and experience our secure account management features.
              </p>
            </div>
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
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
