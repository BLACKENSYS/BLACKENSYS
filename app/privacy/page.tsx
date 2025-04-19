import Link from "next/link"
import { ArrowLeft, Film } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
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
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground mb-8">Last updated: April 10, 2025</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">1. Introduction</h2>
              <p>
                At BLACKENSYS, we respect your privacy and are committed to protecting your personal data. This Privacy
                Policy explains how we collect, use, and safeguard your information when you use our platform.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">2. Information We Collect</h2>
              <p>We collect several types of information from and about users of our platform, including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Personal identifiers (name, email address, phone number)</li>
                <li>Account credentials</li>
                <li>Profile information</li>
                <li>Content you upload or create</li>
                <li>Usage data and analytics</li>
                <li>Device and connection information</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
              <p>We use the information we collect for various purposes, including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Providing and maintaining our services</li>
                <li>Personalizing your experience</li>
                <li>Processing transactions</li>
                <li>Communicating with you</li>
                <li>Improving our platform</li>
                <li>Enforcing our terms and policies</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">4. Data Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Service providers who perform services on our behalf</li>
                <li>Other users, according to your privacy settings</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners, with your consent</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized
                access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or
                electronic storage is 100% secure.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">6. Your Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Right to access your data</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to delete your data</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">7. Children's Privacy</h2>
              <p>
                Our platform is not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">8. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">9. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at privacy@blackensys.com.</p>
            </div>
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
