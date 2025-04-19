import Link from "next/link"
import { ArrowRight, Check, Film, Shield, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ChannelCreationPage() {
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
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Create Your Channel</h1>
            <p className="text-muted-foreground mt-2">Set up your channel to start sharing content with the world</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Channel Information</CardTitle>
                <CardDescription>Basic details about your channel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="channel-name">Channel Name</Label>
                  <Input id="channel-name" placeholder="My Awesome Channel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="channel-description">Channel Description</Label>
                  <Textarea
                    id="channel-description"
                    placeholder="Tell viewers about your channel"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Channel Category</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start">
                      Entertainment
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Education
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Technology
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Music
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Gaming
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Other
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification</CardTitle>
                <CardDescription>Verify your identity to create a channel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="id-type">ID Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      PAN Card
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Aadhar Card
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id-number">ID Number</Label>
                  <Input id="id-number" placeholder="Enter your ID number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id-upload">Upload ID Document</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your document here, or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Browse Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Creation Fee</CardTitle>
                <CardDescription>One-time fee to create your channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">One-time Channel Creation Fee</p>
                      <p className="text-sm text-muted-foreground">Required for all channels</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold">₹2</div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">Verified channel status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">Ability to upload unlimited videos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">Access to analytics and insights</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Pay ₹2 & Create Channel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
