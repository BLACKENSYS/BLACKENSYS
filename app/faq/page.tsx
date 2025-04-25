import Link from "next/link"
import { Film } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"

export const metadata = {
  title: "Frequently Asked Questions | BLACKENSYS Private Limited",
  description:
    "Find answers to common questions about BLACKENSYS Private Limited's video streaming and unlimited cloud storage services.",
  keywords: ["blackensys faq", "blackensys questions", "blackensys private limited faq", "blackensys limited help"],
  alternates: {
    canonical: "/faq",
  },
}

// FAQ data
const faqData = [
  {
    question: "What is BLACKENSYS?",
    answer:
      "BLACKENSYS is an all-in-one platform that combines video streaming, content creation, and unlimited cloud storage solutions. Our platform allows creators and businesses to create, share, monetize, and store all their digital content securely.",
  },
  {
    question: "Who founded BLACKENSYS Private Limited?",
    answer:
      "BLACKENSYS Private Limited was founded by Chandar Sekhar Hembram and Saurav Barjo in 2024. The company is headquartered in Khorda, Odisha, India.",
  },
  {
    question: "What plans does BLACKENSYS offer?",
    answer:
      "BLACKENSYS offers three main plans: Free (with 5GB storage and basic features), Premium (₹499/month with 500GB storage and advanced features), and Business (₹1,999/month with 2TB storage and professional tools).",
  },
  {
    question: "Is BLACKENSYS cloud storage really unlimited?",
    answer:
      "Yes, BLACKENSYS Premium and Business plans offer unlimited cloud storage for your files. Our infrastructure is designed to scale with your needs, ensuring you never run out of space.",
  },
  {
    question: "How secure is BLACKENSYS cloud storage?",
    answer:
      "BLACKENSYS uses end-to-end encryption to secure your files. We implement industry-leading security protocols to ensure your data remains private and protected at all times.",
  },
  {
    question: "Can I monetize my content on BLACKENSYS?",
    answer:
      "Yes, BLACKENSYS offers comprehensive monetization tools for content creators. You can earn revenue through ad campaigns, sponsored content, and direct support from your audience.",
  },
  {
    question: "What video formats does BLACKENSYS support?",
    answer:
      "BLACKENSYS supports all major video formats including MP4, MOV, AVI, WMV, and more. Our platform automatically optimizes your videos for the best viewing experience across all devices.",
  },
  {
    question: "How do I contact BLACKENSYS customer support?",
    answer:
      "You can reach BLACKENSYS customer support through our Contact page, by emailing support@blackensys.com, or by calling our customer service line at +91-9876543210.",
  },
  {
    question: "What does 'Dark After Light' mean?",
    answer:
      "Our motto, 'Dark After Light,' represents our commitment to innovation and our belief that after every challenge comes opportunity and growth. It embodies our philosophy of perseverance and continuous improvement.",
  },
  {
    question: "Can I use BLACKENSYS for my business?",
    answer:
      "BLACKENSYS offers specialized business solutions with advanced features like team collaboration, professional video tools, and priority support. Our Business plan is designed to meet the needs of companies of all sizes.",
  },
]

export default function FAQPage() {
  // Create structured data for FAQs
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Film className="h-6 w-6" />
            <span>BLACKENSYS</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:underline underline-offset-4">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About Us
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
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to common questions about BLACKENSYS Private Limited and our services.
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our team is here to help. Contact us for personalized assistance.
            </p>
            <Button asChild>
              <Link href="/contact">Contact BLACKENSYS Support</Link>
            </Button>
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
            <p className="text-sm text-muted-foreground">© 2024 BLACKENSYS Private Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add structured data for FAQs */}
      <JsonLd data={faqStructuredData} />
    </div>
  )
}
