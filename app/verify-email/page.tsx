"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading")
  const [error, setError] = useState("")

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !email) {
        setVerificationStatus("error")
        setError("Invalid verification link. Please request a new one.")
        return
      }

      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, email }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Verification failed")
        }

        setVerificationStatus("success")
      } catch (err) {
        setVerificationStatus("error")
        setError(err instanceof Error ? err.message : "Failed to verify your email. Please try again.")
      }
    }

    verifyEmail()
  }, [token, email])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription>Verifying your email address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verificationStatus === "loading" && (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-center text-sm text-muted-foreground">Verifying your email address...</p>
            </div>
          )}

          {verificationStatus === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <Check className="h-5 w-5 text-green-500" />
              <AlertDescription className="text-green-700">
                Your email has been successfully verified! You can now log in to your account.
              </AlertDescription>
            </Alert>
          )}

          {verificationStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {verificationStatus === "success" && (
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
          )}
          {verificationStatus === "error" && (
            <Button asChild variant="outline">
              <Link href="/login">Back to Login</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
