import Link from "next/link"
import { ArrowRight, CheckCircle, Building, Award, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "BLACKENSYS Private Limited - Official Company Information & Services",
  description:
    "BLACKENSYS Private Limited is a registered company offering premium video streaming and unlimited cloud storage solutions. Learn about our company, services, and leadership.",
  keywords: [
    "blackensys private limited",
    "blackensys company",
    "blackensys official",
    "blackensys services",
    "blackensys incorporation",
    "video streaming company",
    "cloud storage provider",
  ],
  alternates: {
    canonical: "/blackensys-private-limited",
  },
}

export default function BlackensysPrivateLimitedPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="gradient-text">BLACKENSYS Private Limited</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Incorporated on February 20, 2024 | Headquartered in Khorda, Odisha, India
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">About BLACKENSYS Private Limited</h2>
                <p className="text-muted-foreground">
                  BLACKENSYS Private Limited is a registered technology company founded with a vision to revolutionize
                  how people create, share, and store digital content. Our journey began in 2024 when our founders,
                  Chandar Sekhar Hembram and Saurav Barjo, recognized the need for an integrated platform that combines
                  video creation tools with unlimited cloud storage.
                </p>
                <p className="text-muted-foreground">
                  As a legally registered private limited company in India, we adhere to the highest standards of
                  corporate governance and transparency. Our company registration number is XXXXXXXX, and we are fully
                  compliant with all regulatory requirements.
                </p>
                <p className="text-muted-foreground">
                  Our motto, "Dark After Light," represents our commitment to innovation and our belief that after every
                  challenge comes opportunity and growth.
                </p>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-xl bg-muted">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background"></div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="BLACKENSYS Private Limited headquarters"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Services</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  BLACKENSYS Private Limited offers a comprehensive suite of digital services
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Video Streaming Platform</CardTitle>
                  <CardDescription>
                    Create, share, and monetize your video content with our cutting-edge platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>TikTok-style short video format</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced editing tools</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Monetization options</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Unlimited Cloud Storage</CardTitle>
                  <CardDescription>Secure, unlimited storage for all your digital assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>End-to-end encryption</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>File versioning and recovery</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Cross-platform access</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Business Solutions</CardTitle>
                  <CardDescription>Enterprise-grade tools for businesses of all sizes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Team collaboration features</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300&text=CS"
                      alt="Chandar Sekhar Hembram - BLACKENSYS Private Limited Co-founder"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300&text=SB"
                      alt="Saurav Barjo - BLACKENSYS Private Limited Co-founder"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Company Leadership</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">Chandar Sekhar Hembram</h3>
                    <p className="text-primary font-medium">Co-founder & CEO, BLACKENSYS Private Limited</p>
                    <p className="text-muted-foreground mt-2">
                      With a background in cloud computing and video technology, Chandar leads our product vision and
                      overall strategy. His passion for creating accessible technology drives our innovation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Saurav Barjo</h3>
                    <p className="text-primary font-medium">Co-founder & CTO, BLACKENSYS Private Limited</p>
                    <p className="text-muted-foreground mt-2">
                      Saurav brings extensive experience in software development and security. He oversees our technical
                      infrastructure and ensures our platform remains secure, reliable, and cutting-edge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Contact BLACKENSYS Private Limited</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get in touch with our team for inquiries, partnerships, or support
                </p>
              </div>
              <div className="mx-auto grid max-w-3xl gap-8 py-8">
                <div className="grid gap-2">
                  <h3 className="text-xl font-bold">Corporate Headquarters</h3>
                  <p className="text-muted-foreground">
                    BLACKENSYS Private Limited
                    <br />
                    Khorda, Odisha, India - 752050
                  </p>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-xl font-bold">Contact Information</h3>
                  <p className="text-muted-foreground">
                    Email: contact@blackensys.com
                    <br />
                    Phone: +91-9876543210
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contact">
                  <Button size="lg" className="gap-1.5">
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Structured data for BLACKENSYS Private Limited */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BLACKENSYS Private Limited",
              alternateName: ["BLACKENSYS", "BLACKENSYS Limited"],
              url: "https://blackensys.com/blackensys-private-limited",
              logo: "https://blackensys.com/images/logo.png",
              foundingDate: "2024-02-20",
              founders: [
                {
                  "@type": "Person",
                  name: "Chandar Sekhar Hembram",
                  jobTitle: "Co-founder & CEO",
                },
                {
                  "@type": "Person",
                  name: "Saurav Barjo",
                  jobTitle: "Co-founder & CTO",
                },
              ],
              description:
                "BLACKENSYS Private Limited is a registered technology company offering video streaming and unlimited cloud storage solutions.",
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
            }),
          }}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
