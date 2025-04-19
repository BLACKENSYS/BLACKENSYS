"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Film, Shield, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function PremiumPaymentPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")

  // Simulate payment processing
  const processPayment = () => {
    setPaymentStatus("processing")

    // Simulate API call to Razorpay
    setTimeout(() => {
      setPaymentStatus("success")

      // Redirect after successful payment
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 2000)
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
            <Button variant="outline" size="icon">
              <Users className="h-4 w-4" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-6">
            <Link
              href="/signup/premium"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to signup
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mt-2">Complete Your Payment</h1>
            <p className="text-muted-foreground mt-1">Pay to activate your Creator account</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Choose your payment method and complete the transaction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Creator Plan Fees</p>
                      <p className="text-sm text-muted-foreground">One-time and monthly fees</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">₹27</div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Registration Fee</span>
                    <span>₹2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brand Verification</span>
                    <span>₹5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>First Month Subscription</span>
                    <span>₹20</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Select Payment Method</Label>
                <RadioGroup defaultValue="razorpay" className="space-y-3" onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="razorpay" id="razorpay" />
                    <Label htmlFor="razorpay" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Razorpay</div>
                        <img src="/placeholder.svg?height=30&width=80" alt="Razorpay" className="h-8" />
                      </div>
                      <div className="text-sm text-muted-foreground">Pay securely with Razorpay</div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">UPI</div>
                        <img src="/placeholder.svg?height=30&width=80" alt="UPI" className="h-8" />
                      </div>
                      <div className="text-sm text-muted-foreground">Pay using UPI</div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="flex gap-1">
                          <img src="/placeholder.svg?height=30&width=40" alt="Visa" className="h-6" />
                          <img src="/placeholder.svg?height=30&width=40" alt="Mastercard" className="h-6" />
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Pay with your card</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentStatus === "processing" && (
                <div className="rounded-md bg-muted p-4 text-center">
                  <p className="text-sm">Processing your payment...</p>
                  <div className="mt-2 flex justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  </div>
                </div>
              )}

              {paymentStatus === "success" && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <p className="font-medium text-green-700">Payment Successful!</p>
                  </div>
                  <p className="mt-1 text-sm text-green-600">
                    Your payment has been processed successfully. Your Creator account is now active. Redirecting to
                    dashboard...
                  </p>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-red-500" />
                    <p className="font-medium text-red-700">Payment Failed</p>
                  </div>
                  <p className="mt-1 text-sm text-red-600">
                    There was an issue processing your payment. Please try again.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/signup/premium">Cancel</Link>
              </Button>
              <Button onClick={processPayment} disabled={paymentStatus === "processing" || paymentStatus === "success"}>
                {paymentStatus === "processing" ? "Processing..." : "Pay ₹27"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
