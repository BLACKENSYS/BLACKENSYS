"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Shield, AlertTriangle, Eye, EyeOff, Lock, Smartphone, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SecurityPage() {
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false)
  const [securityScore, setSecurityScore] = useState(70)
  const [is2faEnabled, setIs2faEnabled] = useState(true)
  const [isEmailNotificationsEnabled, setIsEmailNotificationsEnabled] = useState(true)
  const [isSmsNotificationsEnabled, setIsSmsNotificationsEnabled] = useState(false)
  const [loginHistory, setLoginHistory] = useState([
    {
      date: "April 13, 2025, 10:45 AM",
      location: "Mumbai, India",
      device: "Windows PC - Chrome",
      status: "Success",
    },
    {
      date: "April 12, 2025, 8:30 PM",
      location: "Mumbai, India",
      device: "iPhone - Safari",
      status: "Success",
    },
    {
      date: "April 10, 2025, 3:15 PM",
      location: "Delhi, India",
      device: "Android - Chrome",
      status: "Failed",
    },
  ])

  useEffect(() => {
    // Calculate security score based on enabled security features
    let score = 50 // Base score
    if (is2faEnabled) score += 20
    if (isEmailNotificationsEnabled) score += 10
    if (isSmsNotificationsEnabled) score += 10
    if (showRecoveryCodes) score += 10
    setSecurityScore(score)
  }, [is2faEnabled, isEmailNotificationsEnabled, isSmsNotificationsEnabled, showRecoveryCodes])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6" />
            <span>BLACKENSYS</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Dashboard
            </Link>
            <Link href="/videos" className="text-sm font-medium hover:underline underline-offset-4">
              My Videos
            </Link>
            <Link href="/storage" className="text-sm font-medium hover:underline underline-offset-4">
              Cloud Storage
            </Link>
            <Link href="/account" className="text-sm font-medium hover:underline underline-offset-4">
              Account
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center mb-6">
            <Link href="/account" className="mr-2">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Account Security</h1>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Overview</CardTitle>
                <CardDescription>Your account security status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Security Score</span>
                      <span className="text-sm font-medium">{securityScore}%</span>
                    </div>
                    <Progress value={securityScore} className="h-2" />
                  </div>

                  <div className="grid gap-4">
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Strong Password</h3>
                        <p className="text-sm text-muted-foreground">Your password meets our security requirements</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${is2faEnabled ? "bg-green-100" : "bg-yellow-100"}`}
                      >
                        {is2faEnabled ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">
                          {is2faEnabled ? "2FA is enabled for your account" : "Enable 2FA for additional security"}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center space-x-2">
                        <Switch id="2fa" checked={is2faEnabled} onCheckedChange={setIs2faEnabled} />
                        <Label htmlFor="2fa" className="sr-only">
                          Two-Factor Authentication
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email Verification</h3>
                        <p className="text-sm text-muted-foreground">Your email has been verified</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Recent Login Activity</h3>
                        <p className="text-sm text-muted-foreground">
                          Last login: {loginHistory[0].location} - {loginHistory[0].date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        View All
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Secure your account with 2FA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Email Authentication</h3>
                      <p className="text-sm text-muted-foreground">Receive verification codes via email</p>
                    </div>
                  </div>
                  <Switch id="email-auth" checked={is2faEnabled} onCheckedChange={setIs2faEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">SMS Authentication</h3>
                      <p className="text-sm text-muted-foreground">Receive verification codes via SMS</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Setup
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Authenticator App</h3>
                      <p className="text-sm text-muted-foreground">
                        Use an authenticator app like Google Authenticator
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Setup
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password Management</CardTitle>
                <CardDescription>Update and manage your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Password</h3>
                    <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                  </div>
                  <Button asChild>
                    <Link href="/account/security/change-password">Change Password</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login History</CardTitle>
                <CardDescription>Recent account access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                    <div>Date & Time</div>
                    <div>Location</div>
                    <div>Device</div>
                    <div>Status</div>
                  </div>
                  {loginHistory.map((login, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-4 gap-4 p-4 text-sm ${index !== loginHistory.length - 1 ? "border-b" : ""}`}
                    >
                      <div>{login.date}</div>
                      <div>{login.location}</div>
                      <div>{login.device}</div>
                      <div className={login.status === "Success" ? "text-green-600" : "text-red-600"}>
                        {login.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recovery Options</CardTitle>
                <CardDescription>Manage your account recovery options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Recovery Email</h3>
                    <p className="text-sm text-muted-foreground">backup@example.com</p>
                  </div>
                  <Button variant="outline">Update</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Recovery Phone</h3>
                    <p className="text-sm text-muted-foreground">+91 98765-43210</p>
                  </div>
                  <Button variant="outline">Update</Button>
                </div>

                <div className="pt-4">
                  <h3 className="font-medium mb-2">Recovery Codes</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Recovery codes can be used to access your account if you lose your phone or cannot receive
                    verification codes.
                  </p>

                  <div className="bg-muted p-4 rounded-md mb-4">
                    {showRecoveryCodes ? (
                      <div className="font-mono text-sm grid grid-cols-2 gap-2">
                        <div>ABCD-EFGH-IJKL</div>
                        <div>MNOP-QRST-UVWX</div>
                        <div>1234-5678-9012</div>
                        <div>3456-7890-1234</div>
                        <div>5678-9012-3456</div>
                        <div>7890-1234-5678</div>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">Recovery codes are hidden for security</div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowRecoveryCodes(!showRecoveryCodes)}
                      className="flex items-center gap-1"
                    >
                      {showRecoveryCodes ? (
                        <>
                          <EyeOff className="h-4 w-4" /> Hide Codes
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" /> Show Codes
                        </>
                      )}
                    </Button>
                    <Button variant="outline">Generate New Codes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Notifications</CardTitle>
                <CardDescription>Manage how you receive security alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive email alerts for suspicious login attempts</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="email-notifications"
                      checked={isEmailNotificationsEnabled}
                      onCheckedChange={setIsEmailNotificationsEnabled}
                    />
                    <Label htmlFor="email-notifications" className="sr-only">
                      Email Notifications
                    </Label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive text message alerts for suspicious login attempts
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sms-notifications"
                      checked={isSmsNotificationsEnabled}
                      onCheckedChange={setIsSmsNotificationsEnabled}
                    />
                    <Label htmlFor="sms-notifications" className="sr-only">
                      SMS Notifications
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Security Tip</AlertTitle>
              <AlertDescription>
                Never share your password or recovery codes with anyone. BLACKENSYS will never ask for your password via
                email or phone.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>
    </div>
  )
}
