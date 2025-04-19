"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check, AlertCircle, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)

  // Password strength indicator
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
  })

  useEffect(() => {
    const verifyToken = async () => {
      if (!token || !email) {
        setTokenValid(false)
        setError("Invalid password reset link. Please request a new one.")
        return
      }

      try {
        // Verify token validity
        const response = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, email, type: "password_reset" }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Invalid token")
        }

        setTokenValid(true)
      } catch (err) {
        setTokenValid(false)
        setError("This password reset link is invalid or has expired. Please request a new one.")
      }
    }

    verifyToken()
  }, [token, email])

  // Check password strength
  const checkPasswordStrength = (value: string) => {
    let score = 0
    let message = ""

    if (value.length >= 8) score += 1
    if (/[A-Z]/.test(value)) score += 1
    if (/[a-z]/.test(value)) score += 1
    if (/[0-9]/.test(value)) score += 1
    if (/[^A-Za-z0-9]/.test(value)) score += 1

    if (score === 0) message = "Very weak"
    else if (score === 1) message = "Weak"
    else if (score === 2) message = "Fair"
    else if (score === 3) message = "Good"
    else if (score === 4) message = "Strong"
    else message = "Very strong"

    return { score, message }
  }

  // Update password strength when password changes
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password))
  }, [password])

  // Validate password
  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required"
    }
    if (value.trim() === "") {
      return "Password cannot be only spaces"
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters long"
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter"
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter"
    }
    if (!/[0-9]/.test(value)) {
      return "Password must contain at least one number"
    }
    if (!/[^A-Za-z0-9]/.test(value)) {
      return "Password must contain at least one special character"
    }
    return ""
  }

  // Validate confirm password
  const validateConfirmPassword = (value: string) => {
    if (!value) {
      return "Please confirm your password"
    }
    if (value !== password) {
      return "Passwords do not match"
    }
    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      return
    }

    const confirmPasswordError = validateConfirmPassword(confirmPassword)
    if (confirmPasswordError) {
      setError(confirmPasswordError)
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password")
      }

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset your password. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          </div>
          <CardDescription>Create a new password for your account</CardDescription>
        </CardHeader>

        {error && (
          <CardContent className="pt-0 pb-3">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardContent>
        )}

        {tokenValid === null && (
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-center text-sm text-muted-foreground">Verifying your reset link...</p>
            </div>
          </CardContent>
        )}

        {tokenValid === false && (
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This password reset link is invalid or has expired. Please request a new one.
              </AlertDescription>
            </Alert>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/forgot-password">Request New Link</Link>
              </Button>
            </div>
          </CardContent>
        )}

        {tokenValid === true && !isSubmitted && (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-gray-200">
                        <div
                          className={`h-full rounded-full ${
                            passwordStrength.score === 0
                              ? "bg-red-500 w-1/5"
                              : passwordStrength.score === 1
                                ? "bg-orange-500 w-2/5"
                                : passwordStrength.score === 2
                                  ? "bg-yellow-500 w-3/5"
                                  : passwordStrength.score === 3
                                    ? "bg-lime-500 w-4/5"
                                    : "bg-green-500 w-full"
                          }`}
                        ></div>
                      </div>
                      <span className="text-xs">{passwordStrength.message}</span>
                    </div>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters and include uppercase, lowercase, number, and special character
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Resetting Password..." : "Reset Password"}
              </Button>
            </CardContent>
          </form>
        )}

        {isSubmitted && (
          <CardContent className="space-y-4">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Password Reset Successful</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Your password has been successfully reset. You will be redirected to the login page in a few
                      seconds.
                    </p>
                  </div>
                </div>
              </div>
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
