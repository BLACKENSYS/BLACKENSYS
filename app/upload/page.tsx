"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Film, Upload, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  const [uploadStep, setUploadStep] = useState(1)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "complete" | "error">("idle")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Simulate file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Simulate upload process
  const startUpload = () => {
    setUploadStatus("uploading")
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus("processing")
          setTimeout(() => {
            setUploadStatus("complete")
            setUploadStep(2)
          }, 1500)
          return 100
        }
        return prev + 5
      })
    }, 300)
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
              href="/videos"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to videos
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mt-2">Upload Video</h1>
            <p className="text-muted-foreground mt-1">Share your content with the world</p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${uploadStep >= 1 ? "bg-primary text-primary-foreground" : "border border-muted-foreground text-muted-foreground"}`}
              >
                1
              </div>
              <div className={`h-px w-12 ${uploadStep >= 2 ? "bg-primary" : "bg-muted-foreground"}`}></div>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${uploadStep >= 2 ? "bg-primary text-primary-foreground" : "border border-muted-foreground text-muted-foreground"}`}
              >
                2
              </div>
              <div className={`h-px w-12 ${uploadStep >= 3 ? "bg-primary" : "bg-muted-foreground"}`}></div>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${uploadStep >= 3 ? "bg-primary text-primary-foreground" : "border border-muted-foreground text-muted-foreground"}`}
              >
                3
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Step {uploadStep} of 3</div>
          </div>

          {uploadStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Select Video</CardTitle>
                <CardDescription>Choose a video file to upload</CardDescription>
              </CardHeader>
              <CardContent>
                {uploadStatus === "idle" && !selectedFile && (
                  <div
                    className="border-2 border-dashed rounded-md p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-1">Drag and drop video files to upload</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your videos will be private until you publish them
                    </p>
                    <Button>
                      SELECT FILES
                      <input
                        id="file-upload"
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </Button>
                  </div>
                )}

                {selectedFile && uploadStatus === "idle" && (
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Film className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {(uploadStatus === "uploading" || uploadStatus === "processing") && (
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Film className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{selectedFile?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {uploadStatus === "uploading" ? `Uploading: ${uploadProgress}%` : "Processing video..."}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {uploadStatus === "complete" && (
                  <div className="border rounded-md p-4 bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Check className="h-8 w-8 text-green-500" />
                        <div>
                          <p className="font-medium">{selectedFile?.name}</p>
                          <p className="text-sm text-muted-foreground">Upload complete</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {uploadStatus === "error" && (
                  <div className="border rounded-md p-4 bg-destructive/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <X className="h-8 w-8 text-destructive" />
                        <div>
                          <p className="font-medium">{selectedFile?.name}</p>
                          <p className="text-sm text-muted-foreground">Upload failed. Please try again.</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setUploadStatus("idle")}>
                        Retry
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/videos">Cancel</Link>
                </Button>
                <Button onClick={startUpload} disabled={!selectedFile || uploadStatus !== "idle"}>
                  {uploadStatus === "idle" ? "Upload" : "Uploading..."}
                </Button>
              </CardFooter>
            </Card>
          )}

          {uploadStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Video Details</CardTitle>
                <CardDescription>Add information about your video</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Add a title that describes your video" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Tell viewers about your video" className="min-h-[100px]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                      <div className="aspect-video bg-muted rounded-md mb-2"></div>
                      <p className="text-xs text-center">Generated</p>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                      <div className="aspect-video bg-muted rounded-md mb-2"></div>
                      <p className="text-xs text-center">Generated</p>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                      <div className="aspect-video bg-muted rounded-md mb-2"></div>
                      <p className="text-xs text-center">Upload</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="education">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Tabs defaultValue="private">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="private">Private</TabsTrigger>
                      <TabsTrigger value="unlisted">Unlisted</TabsTrigger>
                      <TabsTrigger value="public">Public</TabsTrigger>
                    </TabsList>
                    <TabsContent value="private" className="mt-2">
                      <p className="text-sm text-muted-foreground">Only you can watch this video</p>
                    </TabsContent>
                    <TabsContent value="unlisted" className="mt-2">
                      <p className="text-sm text-muted-foreground">Anyone with the link can watch this video</p>
                    </TabsContent>
                    <TabsContent value="public" className="mt-2">
                      <p className="text-sm text-muted-foreground">Everyone can watch this video</p>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setUploadStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setUploadStep(3)}>Next</Button>
              </CardFooter>
            </Card>
          )}

          {uploadStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Publish Video</CardTitle>
                <CardDescription>Review and publish your video</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-md"></div>

                <div className="space-y-2">
                  <h3 className="font-medium">Video Title</h3>
                  <p className="text-sm">This is the title of your video</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Description</h3>
                  <p className="text-sm">This is the description of your video that explains what it's about.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Category</h3>
                    <p className="text-sm">Education</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Visibility</h3>
                    <p className="text-sm">Private</p>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Ready to publish</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your video has been processed and is ready to be published.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setUploadStep(2)}>
                  Back
                </Button>
                <Button asChild>
                  <Link href="/videos">
                    Publish
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
