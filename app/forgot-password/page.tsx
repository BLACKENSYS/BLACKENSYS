"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, AlertCircle, Shield } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { sendEmail, generateVerificationToken } from "../services/email-service"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(0)

  const validateEmail = (value: string) => {
    if (!value) {
      return "Email is required"
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address"
    }
    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailError = validateEmail(email)
    if (emailError) {
      setError(emailError)
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      // Check if user exists
      const userResponse = await fetch(`/api/users/check?email=${encodeURIComponent(email)}`)
      const userData = await userResponse.json()

      if (!userResponse.ok || !userData.exists) {
        // Don't reveal that the email doesn't exist for security reasons
        // Instead, pretend we sent the email
        setIsSubmitting(false)
        setIsSubmitted(true)
        setCountdown(60) // 60 second cooldown for resending

        // Start countdown timer
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)

        return
      }

      // Generate reset token
      const token = generateVerificationToken()

      // Store token
      await fetch("/api/auth/create-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
          type: "password_reset",
          expiresIn: 60 * 60 * 1000, // 1 hour
        }),
      })

      // Send password reset email
      await sendEmail({
        to: email,
        subject: "Reset Your Password",
        template: "reset-password",
        data: {
          resetLink: `${window.location.origin}/reset-password?token=${token}&email=${encodeURIComponent(email)}`,
        },
      })

      setIsSubmitting(false)
      setIsSubmitted(true)
      setCountdown(60) // 60 second cooldown for resending

      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      setError("Failed to send password reset email. Please try again.")
      setIsSubmitting(false)
    }
  }

  const handleResendEmail = async () => {
    if (countdown > 0) return

    setIsSubmitting(true)

    try {
      // Generate reset token
      const token = generateVerificationToken()

      // Store token
      await fetch("/api/auth/create-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
          type: "password_reset",
          expiresIn: 60 * 60 * 1000, // 1 hour
        }),
      })

      // Send password reset email
      await sendEmail({
        to: email,
        subject: "Reset Your Password",
        template: "reset-password",
        data: {
          resetLink: `${window.location.origin}/reset-password?token=${token}&email=${encodeURIComponent(email)}`,
        },
      })

      setIsSubmitting(false)
      setCountdown(60) // 60 second cooldown for resending

      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      setError("Failed to resend password reset email. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Shield className="h-8 w-8 mr-2" />
            <CardTitle className="text-2xl font-bold">BLACKENSYS</CardTitle>
          </div>
          <CardDescription className="text-center">
            Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>

        {error && (
          <CardContent className="pt-0 pb-3">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardContent>
        )}

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </CardContent>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Email sent</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow
                      the instructions to reset your password.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Didn't receive the email?</p>
              <Button variant="outline" onClick={handleResendEmail} disabled={isSubmitting || countdown > 0}>
                {countdown > 0 ? `Resend in ${countdown}s` : isSubmitting ? "Sending..." : "Resend Email"}
              </Button>
            </div>
          </CardContent>
        )}

        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
