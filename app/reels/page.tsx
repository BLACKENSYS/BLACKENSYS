"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Play,
  Volume2,
  VolumeX,
  Home,
  Search,
  PlusSquare,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for reels
const mockReels = [
  {
    id: "1",
    userId: "user1",
    userName: "Sarah Johnson",
    userAvatar: "/placeholder.svg?height=48&width=48&text=SJ",
    videoUrl: "/placeholder.svg?height=1920&width=1080&text=Reel+1",
    caption: "Exploring the beautiful sunset at the beach! #sunset #beach #summer",
    likes: 1245,
    comments: 89,
    shares: 32,
    saved: false,
    liked: false,
  },
  {
    id: "2",
    userId: "user2",
    userName: "Mike Chen",
    userAvatar: "/placeholder.svg?height=48&width=48&text=MC",
    videoUrl: "/placeholder.svg?height=1920&width=1080&text=Reel+2",
    caption: "Check out this amazing dance routine! 💃 #dance #trending",
    likes: 5678,
    comments: 234,
    shares: 156,
    saved: false,
    liked: false,
  },
  {
    id: "3",
    userId: "user3",
    userName: "Alex Rodriguez",
    userAvatar: "/placeholder.svg?height=48&width=48&text=AR",
    videoUrl: "/placeholder.svg?height=1920&width=1080&text=Reel+3",
    caption: "New recipe tutorial: How to make the perfect pasta! 🍝 #food #cooking #recipe",
    likes: 3421,
    comments: 178,
    shares: 89,
    saved: false,
    liked: false,
  },
  {
    id: "4",
    userId: "user4",
    userName: "Emily Wilson",
    userAvatar: "/placeholder.svg?height=48&width=48&text=EW",
    videoUrl: "/placeholder.svg?height=1920&width=1080&text=Reel+4",
    caption: "Morning workout routine to start your day right! 💪 #fitness #workout #motivation",
    likes: 2156,
    comments: 124,
    shares: 67,
    saved: false,
    liked: false,
  },
]

// Reel component
const Reel = ({
  reel,
  isActive,
  onLike,
  onSave,
}: {
  reel: (typeof mockReels)[0]
  isActive: boolean
  onLike: () => void
  onSave: () => void
}) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isPlaying) {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isActive, isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  // For demo purposes, we're using an image instead of a video
  // In a real app, you would use a video element
  return (
    <div className="relative h-full w-full snap-start">
      <div className="absolute inset-0 bg-black">
        {/* In a real app, this would be a video element */}
        <img
          src={reel.videoUrl || "/placeholder.svg"}
          alt="Reel"
          className="h-full w-full object-cover"
          onClick={togglePlay}
        />
        {/* Overlay for play/pause */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black/50 p-4">
              <Play className="h-12 w-12 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Reel Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarImage src={reel.userAvatar || "/placeholder.svg"} alt={reel.userName} />
            <AvatarFallback>{reel.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link href={`/profile/${reel.userId}`} className="font-semibold text-white hover:underline">
                {reel.userName}
              </Link>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/10">
                <span className="sr-only">Follow</span>
                <PlusSquare className="h-4 w-4 text-white" />
              </Button>
            </div>
            <p className="text-sm text-white/90 line-clamp-2 mt-1">{reel.caption}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20"
          onClick={onLike}
        >
          <Heart className={`h-6 w-6 ${reel.liked ? "fill-red-500 text-red-500" : "text-white"}`} />
          <span className="sr-only">Like</span>
          <span className="absolute -bottom-6 text-xs font-medium text-white">{reel.likes}</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20">
          <MessageCircle className="h-6 w-6 text-white" />
          <span className="sr-only">Comment</span>
          <span className="absolute -bottom-6 text-xs font-medium text-white">{reel.comments}</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20">
          <Share2 className="h-6 w-6 text-white" />
          <span className="sr-only">Share</span>
          <span className="absolute -bottom-6 text-xs font-medium text-white">{reel.shares}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20"
          onClick={onSave}
        >
          <Bookmark className={`h-6 w-6 ${reel.saved ? "fill-white text-white" : "text-white"}`} />
          <span className="sr-only">Save</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20">
              <MoreVertical className="h-6 w-6 text-white" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>Not interested</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Copy link</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Media Controls */}
      <div className="absolute bottom-4 right-20 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
          <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
        </Button>
      </div>
    </div>
  )
}

export default function ReelsPage() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [reels, setReels] = useState(mockReels)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight } = containerRef.current
      const index = Math.round(scrollTop / clientHeight)
      setCurrentReelIndex(index)
    }
  }

  const handleLike = (reelId: string) => {
    setReels((prevReels) =>
      prevReels.map((reel) => {
        if (reel.id === reelId) {
          const liked = !reel.liked
          return {
            ...reel,
            liked,
            likes: liked ? reel.likes + 1 : reel.likes - 1,
          }
        }
        return reel
      }),
    )
  }

  const handleSave = (reelId: string) => {
    setReels((prevReels) =>
      prevReels.map((reel) => {
        if (reel.id === reelId) {
          return {
            ...reel,
            saved: !reel.saved,
          }
        }
        return reel
      }),
    )
  }

  const goToPreviousReel = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex(currentReelIndex - 1)
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: (currentReelIndex - 1) * containerRef.current.clientHeight,
          behavior: "smooth",
        })
      }
    }
  }

  const goToNextReel = () => {
    if (currentReelIndex < reels.length - 1) {
      setCurrentReelIndex(currentReelIndex + 1)
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: (currentReelIndex + 1) * containerRef.current.clientHeight,
          behavior: "smooth",
        })
      }
    }
  }

  return (
    <div className="flex h-screen flex-col bg-black">
      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around bg-black/90 backdrop-blur-md">
        <Button variant="ghost" className="flex flex-col items-center gap-1 text-white">
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1 text-white">
          <Search className="h-6 w-6" />
          <span className="text-xs">Discover</span>
        </Button>
        <Button
          variant="ghost"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <PlusSquare className="h-6 w-6" />
          <span className="sr-only">Create</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1 text-white">
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs">Inbox</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1 text-white">
          <User className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Button>
      </div>

      {/* Reels Container */}
      <div ref={containerRef} className="h-full w-full overflow-y-auto snap-y snap-mandatory" onScroll={handleScroll}>
        {reels.map((reel, index) => (
          <Reel
            key={reel.id}
            reel={reel}
            isActive={index === currentReelIndex}
            onLike={() => handleLike(reel.id)}
            onSave={() => handleSave(reel.id)}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white ${
          currentReelIndex === 0 ? "invisible" : "visible"
        }`}
        onClick={goToPreviousReel}
      >
        <ChevronUp className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </button>
      <button
        className={`absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white ${
          currentReelIndex === reels.length - 1 ? "invisible" : "visible"
        }`}
        onClick={goToNextReel}
      >
        <ChevronDown className="h-6 w-6" />
        <span className="sr-only">Next</span>
      </button>
    </div>
  )
}
