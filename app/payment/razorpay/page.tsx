"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Film, Shield, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RazorpayButton } from "@/app/components/razorpay-button"

export default function RazorpayPaymentPage() {
  const router = useRouter()
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handlePaymentSuccess = () => {
    setPaymentStatus("success")
    // Redirect after successful payment
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  const handlePaymentError = (error: any) => {
    setPaymentStatus("error")
    setErrorMessage(error.message || "Payment failed. Please try again.")
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
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Dashboard
            </Link>
            <Link href="/videos" className="text-sm font-medium hover:underline underline-offset-4">
              My Videos
            </Link>
            <Link href="/cloud-storage" className="text-sm font-medium hover:underline underline-offset-4">
              Cloud Storage
            </Link>
            <Link href="/analytics" className="text-sm font-medium hover:underline underline-offset-4">
              Analytics
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
        <div className="container mx-auto max-w-md">
          <div className="mb-6">
            <Link
              href="/signup"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to signup
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mt-2">Complete Payment</h1>
            <p className="text-muted-foreground mt-1">Pay with Razorpay to access BLACKENSYS</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Complete your payment securely with Razorpay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Registration Fee</p>
                      <p className="text-sm text-muted-foreground">One-time payment</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">₹2</div>
                </div>
              </div>

              {paymentStatus === "success" && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <p className="font-medium text-green-700">Payment Successful!</p>
                  </div>
                  <p className="mt-1 text-sm text-green-600">
                    Your payment has been processed successfully. Redirecting to dashboard...
                  </p>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-red-500" />
                    <p className="font-medium text-red-700">Payment Failed</p>
                  </div>
                  <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
                </div>
              )}

              <div className="rounded-md bg-muted p-4">
                <p className="text-sm text-muted-foreground">
                  Your payment information is processed securely by Razorpay. We do not store your payment details.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              {paymentStatus === "idle" && (
                <RazorpayButton
                  amount={200} // ₹2 in paise
                  name="BLACKENSYS"
                  description="Registration Fee"
                  email="user@example.com"
                  phone="9876543210"
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              )}

              {paymentStatus === "success" && (
                <Button className="w-full" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              )}

              {paymentStatus === "error" && (
                <Button className="w-full" onClick={() => setPaymentStatus("idle")}>
                  Try Again
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
