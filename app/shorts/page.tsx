"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, MessageCircle, Share2, MoreVertical, Play, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import type { Video } from "../api/db/schema"

interface EnrichedVideo extends Video {
  user: {
    id: string
    name: string
    avatar?: string
  }
  comments: {
    id: string
    text: string
    userId: string
    userName: string
    userAvatar?: string
    likes: number
    createdAt: string
  }[]
  liked: boolean
}

export default function ShortsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [comment, setComment] = useState("")
  const [showComments, setShowComments] = useState(false)
  const [videos, setVideos] = useState<EnrichedVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  // Fetch videos from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        // In a real app, this would be a proper API call with authentication
        const response = await fetch("/api/videos?limit=10")
        if (!response.ok) {
          throw new Error("Failed to fetch videos")
        }

        const data = await response.json()

        // Enrich videos with user data and comments
        const enrichedVideos: EnrichedVideo[] = await Promise.all(
          data.map(async (video: Video) => {
            // Fetch video details including user and comments
            const detailsResponse = await fetch(`/api/videos/${video.id}`)
            if (!detailsResponse.ok) {
              throw new Error(`Failed to fetch details for video ${video.id}`)
            }

            const details = await detailsResponse.json()

            return {
              ...details,
              liked: false, // Initialize liked status
            }
          }),
        )

        setVideos(enrichedVideos)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching videos:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setLoading(false)
      }
    }

    // Mock user authentication
    setUserId("mock-user-id")

    fetchVideos()
  }, [])

  // Set up intersection observer for video scrolling
  useEffect(() => {
    if (videos.length === 0) return

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoElement = entry.target as HTMLVideoElement
            const index = videoRefs.current.findIndex((ref) => ref === videoElement)

            if (index !== -1 && index !== currentIndex) {
              setCurrentIndex(index)
            }
          }
        })
      },
      { threshold: 0.6 }, // Video is considered in view when 60% visible
    )

    videoRefs.current.forEach((video) => {
      if (video) {
        observer.current?.observe(video)
      }
    })

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [videos, currentIndex])

  // Handle video scrolling with keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") {
        // Scroll to next video
        if (currentIndex < videos.length - 1) {
          videoRefs.current[currentIndex + 1]?.scrollIntoView({ behavior: "smooth" })
        }
      } else if (e.key === "ArrowUp" || e.key === "k") {
        // Scroll to previous video
        if (currentIndex > 0) {
          videoRefs.current[currentIndex - 1]?.scrollIntoView({ behavior: "smooth" })
        }
      } else if (e.key === " ") {
        // Toggle play/pause
        togglePlay()
        e.preventDefault()
      } else if (e.key === "m") {
        // Toggle mute
        toggleMute()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, videos.length])

  // Play/pause current video
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          if (isPlaying) {
            video.play().catch(() => {
              // Autoplay was prevented
              setIsPlaying(false)
            })
          } else {
            video.pause()
          }
          video.muted = isMuted
        } else {
          video.pause()
        }
      }
    })
  }, [currentIndex, isPlaying, isMuted])

  // Track video view
  useEffect(() => {
    if (videos.length > 0 && currentIndex >= 0 && userId) {
      const currentVideo = videos[currentIndex]

      // Track view after 2 seconds of watching
      const timer = setTimeout(() => {
        fetch("/api/analytics/user-activity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            type: "video_view",
            metadata: { videoId: currentVideo.id },
          }),
        }).catch((err) => console.error("Error tracking view:", err))
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, videos, userId])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleLike = async (id: string) => {
    if (!userId) return

    setVideos(
      videos.map((video) => {
        if (video.id === id) {
          const newLikedState = !video.liked

          // Track like/unlike activity
          fetch("/api/analytics/user-activity", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              type: "video_like",
              metadata: {
                videoId: id,
                action: newLikedState ? "like" : "unlike",
              },
            }),
          }).catch((err) => console.error("Error tracking like:", err))

          // Update video likes on server
          fetch(`/api/videos/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              likes: newLikedState ? video.likes + 1 : video.likes - 1,
            }),
          }).catch((err) => console.error("Error updating likes:", err))

          return {
            ...video,
            liked: newLikedState,
            likes: newLikedState ? video.likes + 1 : video.likes - 1,
          }
        }
        return video
      }),
    )
  }

  const handleShare = async (id: string) => {
    if (!userId) return

    // Track share activity
    fetch("/api/analytics/user-activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        type: "share",
        metadata: { videoId: id },
      }),
    }).catch((err) => console.error("Error tracking share:", err))

    // Update video shares on server
    const video = videos.find((v) => v.id === id)
    if (video) {
      fetch(`/api/videos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shares: video.shares + 1,
        }),
      }).catch((err) => console.error("Error updating shares:", err))

      setVideos(
        videos.map((v) => {
          if (v.id === id) {
            return {
              ...v,
              shares: v.shares + 1,
            }
          }
          return v
        }),
      )
    }

    // In a real app, this would open a share dialog with social media options
    if (navigator.share) {
      try {
        await navigator.share({
          title: video?.title || "Check out this video",
          text: video?.description || "I found this awesome video",
          url: `${window.location.origin}/watch/${id}`,
        })
      } catch (err) {
        console.error("Error sharing:", err)
        alert(`Share this video: ${window.location.origin}/watch/${id}`)
      }
    } else {
      alert(`Share this video: ${window.location.origin}/watch/${id}`)
    }
  }

  const handleCommentSubmit = async (id: string) => {
    if (!comment.trim() || !userId) return

    // In a real app, this would send the comment to the server
    const newComment = {
      id: `temp-${Date.now()}`,
      text: comment,
      userId,
      userName: "You",
      userAvatar: undefined,
      likes: 0,
      createdAt: new Date().toISOString(),
    }

    // Add comment to video
    setVideos(
      videos.map((video) => {
        if (video.id === id) {
          return {
            ...video,
            comments: [newComment, ...video.comments],
            comments: video.comments + 1,
          }
        }
        return video
      }),
    )

    // Send comment to server
    try {
      const response = await fetch(`/api/videos/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          text: comment,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to post comment")
      }

      // Track comment activity
      fetch("/api/analytics/user-activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          type: "video_comment",
          metadata: { videoId: id },
        }),
      }).catch((err) => console.error("Error tracking comment:", err))
    } catch (err) {
      console.error("Error posting comment:", err)
      // In a real app, you would handle the error and possibly revert the UI change
    }

    setComment("")
    // Keep comments open after submitting
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-black items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        <p className="text-white mt-4">Loading videos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen bg-black items-center justify-center text-white">
        <p>Error: {error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col h-screen bg-black items-center justify-center text-white">
        <p>No videos found</p>
        <Link href="/dashboard" className="mt-4">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <span>BLACKENSYS Shorts</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white">
              Dashboard
            </Link>
            <Link href="/cloud-storage" className="text-sm font-medium text-gray-300 hover:text-white">
              Cloud Storage
            </Link>
          </nav>
        </div>
      </header>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory pt-14"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="h-screen w-full flex items-center justify-center relative snap-start snap-always"
          >
            <div className="relative w-full h-full max-w-md mx-auto bg-black">
              {/* Video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.url}
                  poster={video.thumbnailUrl}
                  className="h-full w-full object-cover"
                  loop
                  playsInline
                  onClick={togglePlay}
                />
              </div>

              {/* Video Controls */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {!isPlaying && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-20 w-20 rounded-full bg-black/30 pointer-events-auto"
                    onClick={togglePlay}
                  >
                    <Play className="h-10 w-10 text-white" />
                  </Button>
                )}
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-end justify-between">
                  {/* User Info and Caption */}
                  <div className="flex-1 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8 border border-white">
                        <AvatarImage
                          src={video.user.avatar || `/placeholder.svg?height=40&width=40`}
                          alt={video.user.name}
                        />
                        <AvatarFallback>{video.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-sm">{video.user.name}</p>
                        <p className="text-xs text-gray-300">@{video.user.name.toLowerCase().replace(/\s+/g, "")}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-8 text-xs text-white bg-primary/80 hover:bg-primary"
                      >
                        Follow
                      </Button>
                    </div>
                    <p className="text-sm mb-4">{video.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-black/30 text-white"
                      onClick={() => toggleLike(video.id)}
                    >
                      <Heart className={`h-6 w-6 ${video.liked ? "fill-red-500 text-red-500" : ""}`} />
                      <span className="text-xs mt-1">{formatNumber(video.likes)}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-black/30 text-white"
                      onClick={() => setShowComments(!showComments)}
                    >
                      <MessageCircle className="h-6 w-6" />
                      <span className="text-xs mt-1">{formatNumber(video.comments)}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-black/30 text-white"
                      onClick={() => handleShare(video.id)}
                    >
                      <Share2 className="h-6 w-6" />
                      <span className="text-xs mt-1">{formatNumber(video.shares)}</span>
                    </Button>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full bg-black/30 text-white">
                          <MoreVertical className="h-6 w-6" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48">
                        <div className="grid gap-1">
                          <Button variant="ghost" size="sm" className="justify-start">
                            Not interested
                          </Button>
                          <Button variant="ghost" size="sm" className="justify-start">
                            Report
                          </Button>
                          <Button variant="ghost" size="sm" className="justify-start">
                            Download
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Volume Control */}
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/30 text-white"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              {/* Comments Section */}
              {showComments && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h3 className="text-white font-bold">Comments ({video.comments})</h3>
                    <Button variant="ghost" size="icon" className="text-white" onClick={() => setShowComments(false)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </Button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {video.comments.length === 0 ? (
                      <div className="text-center text-gray-400 py-8">
                        <p>No comments yet</p>
                        <p className="text-sm">Be the first to comment!</p>
                      </div>
                    ) : (
                      video.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.userAvatar || "/placeholder.svg?height=40&width=40"} />
                            <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-white text-sm font-bold">{comment.userName}</p>
                              <p className="text-gray-400 text-xs">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-white text-sm">{comment.text}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <button className="text-gray-400 text-xs flex items-center gap-1">
                                <Heart className="h-3 w-3" /> {comment.likes}
                              </button>
                              <button className="text-gray-400 text-xs">Reply</button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-4 border-t border-gray-800">
                    <form
                      className="flex gap-2"
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleCommentSubmit(video.id)
                      }}
                    >
                      <Textarea
                        placeholder="Add a comment..."
                        className="min-h-[40px] resize-none bg-gray-900 text-white border-gray-700"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button type="submit" disabled={!comment.trim()}>
                        Post
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
