import Link from "next/link"
import { ArrowRight, CheckCircle, Cloud, Film, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "BLACKENSYS Limited - Video Streaming & Cloud Storage Solutions",
  description:
    "BLACKENSYS Limited provides innovative video streaming and unlimited cloud storage solutions. Learn about our services, features, and how we can help you manage your digital content.",
  keywords: [
    "blackensys limited",
    "blackensys ltd",
    "blackensys company",
    "video streaming services",
    "cloud storage solutions",
    "digital content management",
  ],
  alternates: {
    canonical: "/blackensys-limited",
  },
}

export default function BlackensysLimitedPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    <span className="text-primary">BLACKENSYS Limited</span>: Digital Content Solutions
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    BLACKENSYS Limited provides cutting-edge video streaming and unlimited cloud storage solutions for
                    individuals and businesses. Create, share, monetize, and store all your digital content securely.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/signup">
                      Get Started with BLACKENSYS Limited
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/features">Explore Our Features</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl">
                  &nbsp;
                </div>
                <div className="relative bg-background rounded-lg overflow-hidden border shadow-lg">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Film className="h-16 w-16 text-primary opacity-80" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">BLACKENSYS Limited Platform Demo</div>
                      <div className="text-sm text-muted-foreground">03:45</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">BLACKENSYS Limited Solutions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  BLACKENSYS Limited offers a comprehensive suite of digital content and storage solutions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              <Card>
                <CardHeader>
                  <Cloud className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Unlimited Cloud Storage</CardTitle>
                  <CardDescription>
                    Securely store all your files with end-to-end encryption and access them from anywhere.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited storage capacity</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>File versioning and recovery</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced sharing controls</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Film className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Video Streaming Platform</CardTitle>
                  <CardDescription>
                    Create engaging short-form videos and share them with your audience instantly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>TikTok-style video feed</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Built-in editing tools</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Audience engagement features</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <DollarSign className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Business & Monetization</CardTitle>
                  <CardDescription>
                    Turn your content into revenue with our comprehensive monetization tools.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Ad campaign management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Creator earnings dashboard</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Detailed analytics and insights</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose BLACKENSYS Limited?</h2>
                <p className="text-muted-foreground">
                  BLACKENSYS Limited was founded with a vision to revolutionize how people create, share, and store
                  digital content. Our all-in-one platform combines the best features of cloud storage, video sharing,
                  and business tools in one seamless experience.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Integrated platform for all your digital needs</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Industry-leading security and privacy</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Scalable solutions for individuals and businesses</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Dedicated customer support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Continuous innovation and updates</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-xl bg-muted">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background"></div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="BLACKENSYS Limited platform interface"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of creators and businesses who are already using BLACKENSYS Limited to grow their
                  digital presence.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Create Free Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Structured data for BLACKENSYS Limited */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BLACKENSYS Limited",
              alternateName: ["BLACKENSYS", "BLACKENSYS Private Limited", "Blackensys Ltd"],
              url: "https://blackensys.com/blackensys-limited",
              logo: "https://blackensys.com/images/logo.png",
              description:
                "BLACKENSYS Limited provides innovative video streaming and unlimited cloud storage solutions for individuals and businesses.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Khorda",
                addressLocality: "Khorda",
                addressRegion: "Odisha",
                postalCode: "752050",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9876543210",
                contactType: "customer service",
                email: "contact@blackensys.com",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
              },
              sameAs: [
                "https://www.facebook.com/blackensys",
                "https://www.twitter.com/blackensys",
                "https://www.instagram.com/blackensys",
                "https://www.linkedin.com/company/blackensys",
              ],
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "INR",
                lowPrice: "0",
                highPrice: "1999",
                offerCount: "3",
                offers: [
                  {
                    "@type": "Offer",
                    name: "Free Plan",
                    price: "0",
                    priceCurrency: "INR",
                    description: "Basic features with 5GB storage",
                  },
                  {
                    "@type": "Offer",
                    name: "Premium Plan",
                    price: "499",
                    priceCurrency: "INR",
                    description: "Advanced features with 500GB storage",
                  },
                  {
                    "@type": "Offer",
                    name: "Business Plan",
                    price: "1999",
                    priceCurrency: "INR",
                    description: "Professional features with 2TB storage",
                  },
                ],
              },
            }),
          }}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
