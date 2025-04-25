import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "About BLACKENSYS Private Limited | Video & Cloud Storage Solutions",
  description:
    "Learn about BLACKENSYS Private Limited, founded by Chandar Sekhar Hembram and Saurav Barjo. We provide innovative video streaming and unlimited cloud storage solutions.",
  keywords: [
    "blackensys",
    "blackensys private limited",
    "blackensys limited",
    "about blackensys",
    "blackensys founders",
  ],
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  About <span className="gradient-text">BLACKENSYS Private Limited</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Empowering creators and businesses with innovative video and cloud storage solutions from BLACKENSYS.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">The BLACKENSYS Story</h2>
                <p className="text-muted-foreground">
                  BLACKENSYS Private Limited was founded with a vision to revolutionize how people create, share, and
                  store digital content. Our journey began in 2024 when our founders, Chandar Sekhar Hembram and Saurav
                  Barjo, recognized the need for an integrated platform that combines video creation tools with
                  unlimited cloud storage.
                </p>
                <p className="text-muted-foreground">
                  Incorporated on February 20, 2024, and headquartered in Khorda, Odisha, India, BLACKENSYS has quickly
                  grown to become a trusted platform for content creators, businesses, and casual users alike.
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
                  alt="BLACKENSYS Private Limited office"
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
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Mission & Values</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  We're driven by a set of core values that guide everything we do.
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background card-hover">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-center text-muted-foreground">
                  We constantly push the boundaries of what's possible in video creation and cloud storage.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background card-hover">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Accessibility</h3>
                <p className="text-center text-muted-foreground">
                  We believe in making powerful tools accessible to everyone, regardless of technical expertise.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background card-hover">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Security</h3>
                <p className="text-center text-muted-foreground">
                  We prioritize the security and privacy of our users' data with industry-leading encryption and
                  protocols.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background card-hover">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M17 6.1H3"></path>
                    <path d="M21 12.1H3"></path>
                    <path d="M15.1 18H3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Simplicity</h3>
                <p className="text-center text-muted-foreground">
                  We design our products to be intuitive and easy to use, without sacrificing powerful features.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background card-hover">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-center text-muted-foreground">
                  We foster a supportive community of creators who can connect, collaborate, and grow together.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background card-hover">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M12 8v4l3 3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Reliability</h3>
                <p className="text-center text-muted-foreground">
                  We build our platform to be dependable and consistent, so you can focus on creating great content.
                </p>
              </div>
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
                      alt="Chandar Sekhar Hembram"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300&text=SB"
                      alt="Saurav Barjo"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Leadership</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">Chandar Sekhar Hembram</h3>
                    <p className="text-primary font-medium">Co-founder & CEO</p>
                    <p className="text-muted-foreground mt-2">
                      With a background in cloud computing and video technology, Chandar leads our product vision and
                      overall strategy. His passion for creating accessible technology drives our innovation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Saurav Barjo</h3>
                    <p className="text-primary font-medium">Co-founder & CTO</p>
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
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Company Information</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Blackensys Private Limited</p>
              </div>
              <div className="mx-auto grid max-w-3xl gap-8 py-8">
                <div className="grid gap-2">
                  <h3 className="text-xl font-bold">Incorporation Details</h3>
                  <p className="text-muted-foreground">
                    Incorporated on February 20, 2024
                    <br />
                    Headquartered in Khorda, Odisha, India
                  </p>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-xl font-bold">Directors</h3>
                  <p className="text-muted-foreground">
                    Chandar Sekhar Hembram
                    <br />
                    Saurav Barjo
                  </p>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-xl font-bold">Contact Information</h3>
                  <p className="text-muted-foreground">
                    Email: blackensys@gmail.com
                    <br />
                    Address: Khorda, Odisha, India
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

        {/* Add structured data script for the about page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              mainEntity: {
                "@type": "Organization",
                name: "BLACKENSYS Private Limited",
                alternateName: ["BLACKENSYS", "BLACKENSYS Limited"],
                url: "https://blackensys.com",
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
                  "BLACKENSYS Private Limited offers video streaming, content creation, and unlimited cloud storage solutions.",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Khorda",
                  addressRegion: "Odisha",
                  addressCountry: "IN",
                },
              },
            }),
          }}
        />
      </main>
      <SiteFooter />
    </div>
  )
}
