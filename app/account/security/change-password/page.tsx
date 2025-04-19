"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check, AlertCircle, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  // Password strength indicator
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
  })

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
    setPasswordStrength(checkPasswordStrength(newPassword))
  }, [newPassword])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPassword) {
      setError("Current password is required")
      return
    }

    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      setError(passwordError)
      return
    }

    if (newPassword === currentPassword) {
      setError("New password must be different from current password")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to change the password
      // For demo purposes, we'll simulate a successful password change
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (err) {
      setError("Failed to change your password. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Link href="/account/security" className="text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 inline mr-1" />
              Back to Security Settings
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>

            {error && (
              <CardContent className="pt-0 pb-3">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </CardContent>
            )}

            {isSubmitted ? (
              <CardContent className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Your password has been successfully changed.
                  </AlertDescription>
                </Alert>
                <Button asChild className="w-full">
                  <Link href="/account/security">Return to Security Settings</Link>
                </Button>
              </CardContent>
            ) : (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                    {newPassword && (
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
                      Password must be at least 8 characters and include uppercase, lowercase, number, and special
                      character
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
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Changing Password..." : "Change Password"}
                  </Button>
                </CardFooter>
              </form>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
