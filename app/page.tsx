import Link from "next/link"
import { ArrowRight, Cloud, Lock, Shield, Video, Play, Check, ChevronRight, Users, BarChart2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted relative overflow-hidden">
          <div className="hero-gradient absolute inset-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                  New Feature: AI-Powered Video Recommendations
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    <span className="gradient-text">BLACKENSYS:</span> Shot Video & Unlimited Cloud Storage
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Create, share, and store your videos with unlimited cloud storage. All in one platform.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="gradient-text font-medium">DARK AFTER LIGHT</span>
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-1.5">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#cloud-storage">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-video overflow-hidden rounded-xl border bg-background shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"></div>
                  <img
                    src="/placeholder.svg?height=720&width=1280"
                    alt="BLACKENSYS Platform preview"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-background/80 p-3 backdrop-blur-sm">
                      <div className="rounded-full bg-primary p-3">
                        <Play className="h-6 w-6 text-primary-foreground" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need in One Platform
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  BLACKENSYS combines video creation, sharing, and storage in one seamless experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-b from-background to-muted border-primary/20 card-hover">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Video Creation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create and edit short videos with our intuitive tools. Add effects, music, and text to make your
                    content stand out.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/features/video-creation" className="text-sm text-primary flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="bg-gradient-to-b from-background to-muted border-primary/20 card-hover">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Cloud className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Unlimited Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Store all your files, videos, and documents with no limits. Never worry about running out of space
                    again.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/features/cloud-storage" className="text-sm text-primary flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="bg-gradient-to-b from-background to-muted border-primary/20 card-hover">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Advanced Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    End-to-end encryption and advanced security protocols keep your content safe and private.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/features/security" className="text-sm text-primary flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="bg-gradient-to-b from-background to-muted border-primary/20 card-hover">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Community Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Build your audience with channels, subscribers, and engagement tools. Connect with like-minded
                    creators.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/features/community" className="text-sm text-primary flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="bg-gradient-to-b from-background to-muted border-primary/20 card-hover">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BarChart2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Analytics & Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Understand your audience with detailed analytics. Track views, engagement, and growth over time.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/features/analytics" className="text-sm text-primary flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="bg-gradient-to-b from-background to-muted border-primary/20 card-hover">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
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
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <CardTitle className="mt-4">Monetization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Turn your passion into profit with multiple monetization options. Earn from ads, subscriptions, and
                    more.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/features/monetization" className="text-sm text-primary flex items-center">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Cloud Storage Section */}
        <section id="cloud-storage" className="w-full py-12 md:py-24 lg:py-32 bg-muted relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Unlimited Cloud Storage
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Secure Cloud Storage for Just ₹12
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Store all your files, videos, and documents with enterprise-grade security. Never worry about running
                  out of space again.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Lock className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">End-to-end encryption for all your files</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Cloud className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Unlimited storage capacity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Advanced security protocols</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                      <Video className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Store videos in original quality</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Start Now for ₹12
                    </Button>
                  </Link>
                  <Link href="/features/security">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Learn About Security
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-3/4 aspect-square">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 rounded-full animate-pulse"></div>
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-primary/30 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Lock className="h-16 w-16 md:h-24 md:w-24 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/4 right-1/4 animate-float">
                  <div className="bg-background shadow-lg rounded-lg p-3">
                    <Video className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="absolute bottom-1/4 left-1/4 animate-float" style={{ animationDelay: "1s" }}>
                  <div className="bg-background shadow-lg rounded-lg p-3">
                    <Cloud className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="absolute top-1/3 left-1/3 animate-float" style={{ animationDelay: "1.5s" }}>
                  <div className="bg-background shadow-lg rounded-lg p-3">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose Your Plan</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple, transparent pricing for everyone. No hidden fees.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Card className="flex flex-col card-hover">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For casual users</CardDescription>
                  <div className="mt-4 text-4xl font-bold gradient-text">₹2</div>
                  <p className="text-sm text-muted-foreground">One-time registration fee</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>2TB Cloud Storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Basic Video Creation Tools</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Standard Video Quality (720p)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Basic Analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Free Account</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col border-primary relative overflow-hidden card-hover">
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase transform rotate-45 translate-x-2 -translate-y-1 shadow-md">
                    Popular
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Creator</CardTitle>
                  <CardDescription>For content creators</CardDescription>
                  <div className="mt-4 text-4xl font-bold gradient-text">₹12</div>
                  <p className="text-sm text-muted-foreground">per month</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Unlimited Cloud Storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Advanced Video Creation Tools</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>HD Video Quality (1080p)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Detailed Analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Brand Verification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Monetization Options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Priority Support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup/premium" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">FAQ</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about BLACKENSYS.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is BLACKENSYS?</AccordionTrigger>
                  <AccordionContent>
                    BLACKENSYS is a comprehensive platform for video creation, sharing, and storage. We provide tools
                    for content creators, businesses, and casual users to create, manage, and share their videos with
                    unlimited cloud storage.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How much does BLACKENSYS cost?</AccordionTrigger>
                  <AccordionContent>
                    We offer two main plans: Basic and Creator. The Basic plan has a one-time registration fee of ₹2 and
                    includes 2TB of cloud storage. The Creator plan costs ₹12 per month and includes unlimited cloud
                    storage, advanced video creation tools, and more.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I upgrade from Basic to Creator plan later?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can upgrade from the Basic plan to the Creator plan at any time. Your existing content and
                    settings will be preserved, and you'll gain access to all the additional features of the Creator
                    plan immediately. There's no need to recreate your account or re-upload your content.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Is my data secure on BLACKENSYS?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we take security very seriously. All your data is encrypted both in transit and at rest. We use
                    industry-standard security protocols and regularly update our systems to protect your content and
                    personal information.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I monetize my content?</AccordionTrigger>
                  <AccordionContent>
                    Creator plan users have access to multiple monetization options including ad revenue sharing,
                    channel memberships, and direct support from viewers. Our analytics tools help you understand your
                    audience and optimize your content for better monetization.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users and creators on our platform today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="gap-1.5">
                    Create Your Account
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
