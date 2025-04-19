"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ThumbsUp, MessageSquare, Share2, Bookmark, MoreVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { VideoPlayer } from "@/components/video-player"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface Video {
  id: string
  title: string
  description: string
  userId: string
  userName: string
  uploadDate: string
  duration: number
  views: number
  likes: number
  comments: number
  thumbnailUrl: string
  videoUrl: string
  status: string
  category?: string
  tags?: string[]
}

interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  text: string
  timestamp: string
  likes: number
}

export default function WatchPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<Video | null>(null)
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch video data
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, these would be actual API calls
        // For demo purposes, we'll use mock data

        // Mock video data
        const videoData: Video = {
          id: params.id,
          title: "Introduction to BLACKENSYS",
          description:
            "Learn about the BLACKENSYS platform and its features. This video covers the basics of video creation, cloud storage, and sharing your content with others.",
          userId: "1",
          userName: "Rahul Sharma",
          uploadDate: "2023-04-09T10:30:00Z",
          duration: 180, // seconds
          views: 156,
          likes: 24,
          comments: 8,
          thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Introduction",
          videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", // Sample video URL
          status: "published",
          category: "Technology",
          tags: ["tutorial", "cloud", "storage", "video"],
        }

        // Mock related videos
        const relatedVideosData: Video[] = [
          {
            id: "2",
            title: "Cloud Storage Tutorial",
            description: "How to use BLACKENSYS cloud storage effectively.",
            userId: "2",
            userName: "Priya Patel",
            uploadDate: "2023-04-08T14:20:00Z",
            duration: 240, // seconds
            views: 89,
            likes: 15,
            comments: 3,
            thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Tutorial",
            videoUrl: "/videos/tutorial.mp4",
            status: "published",
          },
          {
            id: "3",
            title: "How to Create a Channel",
            description: "Step-by-step guide to creating your own channel on BLACKENSYS.",
            userId: "1",
            userName: "Rahul Sharma",
            uploadDate: "2023-04-05T09:15:00Z",
            duration: 300, // seconds
            views: 243,
            likes: 32,
            comments: 12,
            thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Channel",
            videoUrl: "/videos/channel.mp4",
            status: "published",
          },
          {
            id: "4",
            title: "Advanced Video Editing Techniques",
            description: "Learn advanced video editing techniques for professional-looking content.",
            userId: "3",
            userName: "Amit Kumar",
            uploadDate: "2023-04-04T16:45:00Z",
            duration: 420, // seconds
            views: 567,
            likes: 89,
            comments: 21,
            thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Editing",
            videoUrl: "/videos/editing.mp4",
            status: "published",
          },
        ]

        // Mock comments
        const commentsData: Comment[] = [
          {
            id: "1",
            userId: "2",
            userName: "Priya Patel",
            userAvatar: "/placeholder.svg?height=40&width=40&text=PP",
            text: "Great introduction to the platform! I've been using BLACKENSYS for a month now and it's been amazing.",
            timestamp: "2023-04-09T12:30:00Z",
            likes: 5,
          },
          {
            id: "2",
            userId: "3",
            userName: "Amit Kumar",
            userAvatar: "/placeholder.svg?height=40&width=40&text=AK",
            text: "The cloud storage feature is a game-changer. No more worrying about running out of space!",
            timestamp: "2023-04-09T14:15:00Z",
            likes: 3,
          },
          {
            id: "3",
            userId: "4",
            userName: "Neha Singh",
            userAvatar: "/placeholder.svg?height=40&width=40&text=NS",
            text: "Can you make a tutorial on how to use the advanced editing features?",
            timestamp: "2023-04-10T09:45:00Z",
            likes: 2,
          },
        ]

        setVideo(videoData)
        setRelatedVideos(relatedVideosData)
        setComments(commentsData)

        // Track view
        if (videoData) {
          try {
            await fetch(`/api/videos/${videoData.id}/view`, {
              method: "POST",
            })
          } catch (error) {
            console.error("Error tracking view:", error)
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load video. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id, toast])

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return

    // In a real app, this would be an API call to save the comment
    const newComment: Comment = {
      id: String(comments.length + 1),
      userId: "current-user", // This would be the actual user ID
      userName: "Current User", // This would be the actual user name
      userAvatar: "/placeholder.svg?height=40&width=40&text=CU",
      text: commentText,
      timestamp: new Date().toISOString(),
      likes: 0,
    }

    setComments([newComment, ...comments])
    setCommentText("")

    toast({
      title: "Comment Posted",
      description: "Your comment has been posted successfully.",
    })
  }

  const handleLike = async () => {
    if (!video) return

    setIsLiked(!isLiked)

    // Update UI optimistically
    setVideo({
      ...video,
      likes: isLiked ? video.likes - 1 : video.likes + 1,
    })

    // In a real app, this would be an API call
    try {
      await fetch(`/api/videos/${video.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: isLiked ? "unlike" : "like" }),
      })
    } catch (error) {
      console.error("Error liking video:", error)

      // Revert UI on error
      setIsLiked(!isLiked)
      setVideo({
        ...video,
        likes: isLiked ? video.likes + 1 : video.likes - 1,
      })

      toast({
        title: "Error",
        description: "Failed to like video. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)

    toast({
      title: isBookmarked ? "Removed from Bookmarks" : "Added to Bookmarks",
      description: isBookmarked ? "Video removed from your bookmarks." : "Video added to your bookmarks.",
    })
  }

  const handleShare = async () => {
    if (!video) return

    // Use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href)

      toast({
        title: "Link Copied",
        description: "Video link copied to clipboard.",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    } else {
      return views.toString()
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-6 w-6" />
                </Button>
              </Link>
              <span>BLACKENSYS</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Skeleton className="aspect-video w-full rounded-lg" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Separator />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-32 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex gap-2">
                      <Skeleton className="w-40 h-24 rounded-md flex-shrink-0" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-6 w-6" />
                </Button>
              </Link>
              <span>BLACKENSYS</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Video Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The video you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
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
            <Link href="/discover" className="text-sm font-medium hover:underline underline-offset-4">
              Discover
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/account">
              <Button variant="outline" size="sm">
                My Account
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {/* Video Player */}
              <VideoPlayer
                src={video.videoUrl}
                poster={video.thumbnailUrl}
                title={video.title}
                className="rounded-lg overflow-hidden aspect-video"
              />

              {/* Video Info */}
              <div>
                <h1 className="text-2xl font-bold">{video.title}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2 text-sm text-muted-foreground">
                  <div>
                    {formatViews(video.views)} views • {formatDate(video.uploadDate)}
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center gap-1 ${isLiked ? "text-primary" : ""}`}
                      onClick={handleLike}
                    >
                      <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                      <span>{video.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{video.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBookmark}
                      className={isBookmarked ? "text-primary" : ""}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {video.category && <Badge variant="secondary">{video.category}</Badge>}
                  {video.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator />

              {/* Channel Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`/placeholder.svg?height=48&width=48&text=${video.userName.charAt(0)}`}
                      alt={video.userName}
                    />
                    <AvatarFallback>{video.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{video.userName}</h3>
                    <p className="text-sm text-muted-foreground">42 subscribers</p>
                  </div>
                </div>
                <Button>Subscribe</Button>
              </div>

              {/* Video Description */}
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm whitespace-pre-line">{video.description}</p>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Comments ({comments.length})</h3>

                {/* Comment Form */}
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=CU" alt="Current User" />
                    <AvatarFallback>CU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Add a comment..."
                      className="resize-none"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="flex justify-end mt-2 gap-2">
                      <Button variant="outline" size="sm" onClick={() => setCommentText("")}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleCommentSubmit} disabled={!commentText.trim()}>
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.userAvatar || "/placeholder.svg"} alt={comment.userName} />
                        <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.userName}</span>
                          <span className="text-xs text-muted-foreground">{formatDate(comment.timestamp)}</span>
                        </div>
                        <p className="text-sm mt-1">{comment.text}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            <span className="text-xs">{comment.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            <span className="text-xs">Reply</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {comments.length > 3 && (
                  <Button variant="outline" className="w-full">
                    Load More Comments
                  </Button>
                )}
              </div>
            </div>

            {/* Related Videos */}
            <div className="space-y-4">
              <h3 className="font-medium">Recommended Videos</h3>

              <div className="space-y-4">
                {relatedVideos.map((relatedVideo) => (
                  <Link href={`/watch/${relatedVideo.id}`} key={relatedVideo.id} className="block">
                    <div className="flex gap-2 group">
                      <div className="w-40 h-24 bg-muted rounded-md flex-shrink-0 overflow-hidden">
                        <img
                          src={relatedVideo.thumbnailUrl || "/placeholder.svg"}
                          alt={relatedVideo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedVideo.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{relatedVideo.userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatViews(relatedVideo.views)} views • {formatDate(relatedVideo.uploadDate)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                Show More
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
