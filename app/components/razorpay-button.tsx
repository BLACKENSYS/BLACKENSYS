"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createOrder, initializeRazorpayPayment, createPaymentOptions } from "../razorpay-integration"

interface RazorpayButtonProps {
  amount: number
  currency?: string
  name: string
  description: string
  email: string
  contact: string
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
  buttonText?: string
  className?: string
  disabled?: boolean
}

export function RazorpayButton({
  amount,
  currency = "INR",
  name,
  description,
  email,
  contact,
  onSuccess,
  onError,
  buttonText = "Pay Now",
  className = "",
  disabled = false,
}: RazorpayButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    try {
      setIsLoading(true)

      // Create order
      const orderId = await createOrder(amount, currency)

      // Define success callback
      const handlePaymentSuccess = (response: any) => {
        setIsLoading(false)
        console.log("Payment successful:", response)

        // Verify payment on server
        fetch("/api/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.verified) {
              if (onSuccess) onSuccess(response)
            } else {
              throw new Error("Payment verification failed")
            }
          })
          .catch((error) => {
            console.error("Verification error:", error)
            if (onError) onError(error)
          })
      }

      // Create payment options
      const options = createPaymentOptions(
        amount,
        currency,
        name,
        description,
        orderId,
        email,
        contact,
        handlePaymentSuccess,
      )

      // Initialize Razorpay
      const razorpay = await initializeRazorpayPayment(options)

      // Handle modal close
      razorpay.on("payment.failed", (response: any) => {
        setIsLoading(false)
        console.error("Payment failed:", response.error)
        if (onError) onError(response.error)
      })
    } catch (error) {
      setIsLoading(false)
      console.error("Payment initialization error:", error)
      if (onError) onError(error)
    }
  }

  return (
    <Button onClick={handlePayment} disabled={isLoading || disabled} className={className}>
      {isLoading ? "Processing..." : buttonText}
    </Button>
  )
}
