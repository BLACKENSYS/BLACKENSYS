"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard, Film, Shield, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")

  // Simulate payment processing
  const processPayment = () => {
    setPaymentStatus("processing")

    // Simulate API call to Razorpay
    setTimeout(() => {
      setPaymentStatus("success")
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
        <div className="container mx-auto max-w-3xl">
          <div className="mb-6">
            <Link
              href="/signup"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to signup
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mt-2">Payment</h1>
            <p className="text-muted-foreground mt-1">Complete your payment to access BLACKENSYS</p>
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
                      <p className="font-medium">Registration Fee</p>
                      <p className="text-sm text-muted-foreground">One-time payment</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">₹2</div>
                </div>
              </div>

              <Tabs defaultValue="payment-method">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="payment-method">Payment Method</TabsTrigger>
                  <TabsTrigger value="review">Review</TabsTrigger>
                </TabsList>

                <TabsContent value="payment-method" className="space-y-4 pt-4">
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

                  {paymentMethod === "card" && (
                    <div className="space-y-3 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Name on Card</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="space-y-3 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input id="upi-id" placeholder="yourname@upi" />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="review" className="space-y-4 pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span>Registration Fee</span>
                      <span>₹2</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Tax</span>
                      <span>₹0</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold">
                      <span>Total</span>
                      <span>₹2</span>
                    </div>
                  </div>

                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <p className="text-sm">
                        Your payment information is processed securely. We do not store your credit card details.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

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
                    Your payment has been processed successfully. You can now access all features.
                  </p>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex items-center gap-2">
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
                      className="h-5 w-5 text-red-500"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
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
                <Link href="/signup">Cancel</Link>
              </Button>
              <Button onClick={processPayment} disabled={paymentStatus === "processing" || paymentStatus === "success"}>
                {paymentStatus === "processing" ? "Processing..." : "Pay ₹2"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
