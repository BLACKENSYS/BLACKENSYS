"use client"

import type React from "react"

import Link from "next/link"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDropzone } from "react-dropzone"
import { Upload, X, Film, AlertCircle, Info, Globe, Lock, Users, Loader2, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Video categories
const categories = [
  "Entertainment",
  "Education",
  "Technology",
  "Gaming",
  "Music",
  "Sports",
  "Travel",
  "Food",
  "Fashion",
  "Business",
  "Art",
  "Science",
  "Health",
  "News",
  "Other",
]

// Privacy options
const privacyOptions = [
  { value: "public", label: "Public", icon: <Globe className="h-4 w-4 mr-2" /> },
  { value: "unlisted", label: "Unlisted", icon: <Link className="h-4 w-4 mr-2" /> },
  { value: "private", label: "Private", icon: <Lock className="h-4 w-4 mr-2" /> },
  { value: "members", label: "Members Only", icon: <Users className="h-4 w-4 mr-2" /> },
]

export default function UploadPage() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [currentTab, setCurrentTab] = useState("upload")
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")
  const [videoCategory, setVideoCategory] = useState("")
  const [videoTags, setVideoTags] = useState("")
  const [videoPrivacy, setVideoPrivacy] = useState("public")
  const [thumbnailType, setThumbnailType] = useState("auto")
  const [monetization, setMonetization] = useState(false)
  const [ageRestriction, setAgeRestriction] = useState(false)
  const [commentsEnabled, setCommentsEnabled] = useState(true)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null)
  const [customThumbnail, setCustomThumbnail] = useState<File | null>(null)
  const [processingVideo, setProcessingVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadError(null)

    // Filter for video files
    const videoFiles = acceptedFiles.filter((file) => file.type.startsWith("video/"))

    if (videoFiles.length === 0) {
      setUploadError("Please upload valid video files only.")
      return
    }

    // Take only the first video if multiple are uploaded
    const videoFile = videoFiles[0]

    // Check file size (100MB limit for demo)
    if (videoFile.size > 100 * 1024 * 1024) {
      setUploadError("Video file is too large. Maximum size is 100MB.")
      return
    }

    // Create video preview
    const videoUrl = URL.createObjectURL(videoFile)
    setVideoPreviewUrl(videoUrl)

    // Auto-generate title from filename
    const fileName = videoFile.name.replace(/\.[^/.]+$/, "") // Remove extension
    setVideoTitle(fileName)

    setFiles([videoFile])
    setCurrentTab("details")

    // Generate thumbnail from video
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 1 // Set to 1 second

        videoRef.current.onloadeddata = () => {
          const canvas = document.createElement("canvas")
          canvas.width = videoRef.current!.videoWidth
          canvas.height = videoRef.current!.videoHeight
          const ctx = canvas.getContext("2d")
          ctx?.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height)
          const thumbnailUrl = canvas.toDataURL("image/jpeg")
          setThumbnailPreviewUrl(thumbnailUrl)
        }
      }
    }, 500)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".webm"],
    },
    maxFiles: 1,
  })

  // Handle custom thumbnail upload
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file for the thumbnail.",
          variant: "destructive",
        })
        return
      }

      setCustomThumbnail(file)
      setThumbnailPreviewUrl(URL.createObjectURL(file))
    }
  }

  // Handle video upload
  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadError("Please select a video to upload.")
      return
    }

    if (!videoTitle.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your video.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 300)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 6000))

      clearInterval(interval)
      setUploadProgress(100)

      // Simulate video processing
      setProcessingVideo(true)
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Upload successful!",
        description: "Your video has been uploaded and is now being processed.",
      })

      // Redirect to the video management page
      router.push("/videos")
    } catch (error) {
      clearInterval(interval)
      setUploadError("An error occurred during upload. Please try again.")
      setUploading(false)
    }
  }

  // Handle cancel upload
  const handleCancel = () => {
    if (uploading) {
      // Show confirmation if upload is in progress
      if (confirm("Are you sure you want to cancel the upload?")) {
        setUploading(false)
        setUploadProgress(0)
        setFiles([])
        setVideoPreviewUrl(null)
        setThumbnailPreviewUrl(null)
        setCurrentTab("upload")
      }
    } else {
      setFiles([])
      setVideoPreviewUrl(null)
      setThumbnailPreviewUrl(null)
      setCurrentTab("upload")
    }
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 max-w-5xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Upload Video</h1>
          <p className="text-muted-foreground">Share your content with the world</p>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" disabled={uploading}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="details" disabled={files.length === 0 || uploading}>
            <Info className="h-4 w-4 mr-2" />
            Details
          </TabsTrigger>
          <TabsTrigger value="visibility" disabled={files.length === 0 || uploading}>
            <Globe className="h-4 w-4 mr-2" />
            Visibility
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              {uploadError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{uploadError}</AlertDescription>
                </Alert>
              )}

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4">
                  <div className={`rounded-full p-4 ${isDragActive ? "bg-primary/10" : "bg-muted"}`}>
                    <Upload className={`h-8 w-8 ${isDragActive ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {isDragActive ? "Drop your video here" : "Drag & drop your video here"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse (MP4, MOV, WebM, AVI)</p>
                    <p className="text-xs text-muted-foreground">Maximum file size: 100MB (for demo)</p>
                  </div>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mt-6 flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Film className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">{files[0].name}</p>
                      <p className="text-sm text-muted-foreground">{(files[0].size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleCancel} disabled={uploading}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button onClick={() => setCurrentTab("details")} disabled={files.length === 0}>
                Continue to Details
              </Button>
            </CardFooter>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>By uploading, you confirm this content doesn't violate our Terms of Service</p>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Details</CardTitle>
                  <CardDescription>Add information to help viewers discover your video</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="Add a title that describes your video"
                      maxLength={100}
                    />
                    <div className="text-xs text-muted-foreground text-right">{videoTitle.length}/100</div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                      placeholder="Tell viewers about your video"
                      rows={5}
                      maxLength={5000}
                    />
                    <div className="text-xs text-muted-foreground text-right">{videoDescription.length}/5000</div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={videoCategory} onValueChange={setVideoCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={videoTags}
                      onChange={(e) => setVideoTags(e.target.value)}
                      placeholder="Add tags separated by commas"
                    />
                    <p className="text-xs text-muted-foreground">Tags help viewers find your video through search</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Thumbnail</CardTitle>
                  <CardDescription>Select or upload a picture that shows what's in your video</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="auto-thumbnail"
                        name="thumbnail-type"
                        value="auto"
                        checked={thumbnailType === "auto"}
                        onChange={() => setThumbnailType("auto")}
                        className="rounded-full"
                      />
                      <Label htmlFor="auto-thumbnail">Auto-generated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="custom-thumbnail"
                        name="thumbnail-type"
                        value="custom"
                        checked={thumbnailType === "custom"}
                        onChange={() => setThumbnailType("custom")}
                        className="rounded-full"
                      />
                      <Label htmlFor="custom-thumbnail">Custom thumbnail</Label>
                    </div>
                  </div>

                  {thumbnailType === "auto" ? (
                    <div className="grid grid-cols-3 gap-4">
                      {[0, 0.33, 0.66].map((time, index) => (
                        <div
                          key={index}
                          className="relative aspect-video bg-muted rounded-md overflow-hidden border-2 cursor-pointer hover:border-primary transition-colors"
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.currentTime = videoRef.current.duration * time

                              // Wait for the video to seek
                              setTimeout(() => {
                                const canvas = document.createElement("canvas")
                                canvas.width = videoRef.current!.videoWidth
                                canvas.height = videoRef.current!.videoHeight
                                const ctx = canvas.getContext("2d")
                                ctx?.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height)
                                const thumbnailUrl = canvas.toDataURL("image/jpeg")
                                setThumbnailPreviewUrl(thumbnailUrl)
                              }, 500)
                            }
                          }}
                        >
                          {thumbnailPreviewUrl && index === 0 ? (
                            <img
                              src={thumbnailPreviewUrl || "/placeholder.svg"}
                              alt="Thumbnail preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">Preview {index + 1}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        <Label htmlFor="thumbnail-upload" className="cursor-pointer">
                          <div className="flex flex-col items-center gap-2 py-4">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <span className="text-sm font-medium">Click to upload thumbnail</span>
                            <span className="text-xs text-muted-foreground">JPG, PNG or GIF (16:9 recommended)</span>
                          </div>
                          <input
                            id="thumbnail-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleThumbnailUpload}
                          />
                        </Label>
                      </div>

                      {thumbnailPreviewUrl && (
                        <div className="aspect-video bg-muted rounded-md overflow-hidden">
                          <img
                            src={thumbnailPreviewUrl || "/placeholder.svg"}
                            alt="Custom thumbnail preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="sticky top-20">
                <Card>
                  <CardHeader>
                    <CardTitle>Video Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {videoPreviewUrl ? (
                      <div className="space-y-4">
                        <div className="aspect-video bg-muted rounded-md overflow-hidden">
                          <video ref={videoRef} src={videoPreviewUrl} controls className="w-full h-full" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium line-clamp-1">{videoTitle || "Untitled Video"}</p>
                          <p className="text-sm text-muted-foreground">
                            {files[0]?.name} • {(files[0]?.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <span className="text-muted-foreground">No preview available</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentTab("upload")}>
              Back
            </Button>
            <Button onClick={() => setCurrentTab("visibility")}>Continue to Visibility</Button>
          </div>
        </TabsContent>

        <TabsContent value="visibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visibility Settings</CardTitle>
              <CardDescription>Control who can see your video and how it can be discovered</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Privacy</Label>
                <div className="grid gap-3">
                  {privacyOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                        videoPrivacy === option.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setVideoPrivacy(option.value)}
                    >
                      <div className="flex items-center gap-3">
                        {option.icon}
                        <div>
                          <p className="font-medium">{option.label}</p>
                          <p className="text-sm text-muted-foreground">
                            {option.value === "public" && "Everyone can watch this video"}
                            {option.value === "unlisted" && "Anyone with the link can watch this video"}
                            {option.value === "private" && "Only you can watch this video"}
                            {option.value === "members" && "Only channel members can watch this video"}
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        checked={videoPrivacy === option.value}
                        onChange={() => setVideoPrivacy(option.value)}
                        className="rounded-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Additional Settings</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="monetization">Monetization</Label>
                    <p className="text-sm text-muted-foreground">Enable ads and earn revenue from your video</p>
                  </div>
                  <Switch id="monetization" checked={monetization} onCheckedChange={setMonetization} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="age-restriction">Age Restriction</Label>
                    <p className="text-sm text-muted-foreground">Restrict your video to viewers 18 and older</p>
                  </div>
                  <Switch id="age-restriction" checked={ageRestriction} onCheckedChange={setAgeRestriction} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comments">Comments</Label>
                    <p className="text-sm text-muted-foreground">Allow viewers to comment on your video</p>
                  </div>
                  <Switch id="comments" checked={commentsEnabled} onCheckedChange={setCommentsEnabled} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
              <CardDescription>Choose when to publish your video</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="publish-now"
                    name="publish-time"
                    value="now"
                    defaultChecked
                    className="rounded-full"
                  />
                  <Label htmlFor="publish-now">Publish now</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="publish-later" name="publish-time" value="later" className="rounded-full" />
                  <Label htmlFor="publish-later">Schedule for later</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentTab("details")}>
              Back
            </Button>
            <Button onClick={handleUpload} disabled={uploading || processingVideo}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading ({uploadProgress}%)
                </>
              ) : processingVideo ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                "Upload Video"
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {uploading && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Upload Progress</span>
                <span className="text-sm font-medium">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {uploadProgress < 100 ? "Uploading your video..." : "Upload complete! Processing video..."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
