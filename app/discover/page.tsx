"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Film, Search, Filter, Grid, List, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

interface Video {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  duration: number
  views: number
  uploadDate: string
  userName: string
  userAvatar: string
  category: string
  tags: string[]
}

const categories = [
  "All",
  "Technology",
  "Entertainment",
  "Education",
  "Sports",
  "Music",
  "Gaming",
  "Travel",
  "Food",
  "Fashion",
  "Science",
  "Health",
]

export default function DiscoverPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "trending">("newest")
  const [durationRange, setDurationRange] = useState<[number, number]>([0, 600]) // 0-10 minutes
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const mockVideos: Video[] = Array(20)
          .fill(0)
          .map((_, i) => {
            const categories = [
              "Technology",
              "Entertainment",
              "Education",
              "Sports",
              "Music",
              "Gaming",
              "Travel",
              "Food",
              "Fashion",
              "Science",
              "Health",
            ]
            const category = categories[Math.floor(Math.random() * categories.length)]
            const duration = Math.floor(Math.random() * 600) + 30 // 30 seconds to 10 minutes
            const views = Math.floor(Math.random() * 100000) + 100
            const daysAgo = Math.floor(Math.random() * 30) + 1
            const uploadDate = new Date()
            uploadDate.setDate(uploadDate.getDate() - daysAgo)

            return {
              id: `video-${i + 1}`,
              title: `Discover Video ${i + 1}: ${category} Highlights`,
              description: `This is a sample video about ${category.toLowerCase()}. Watch and enjoy!`,
              thumbnailUrl: `/placeholder.svg?height=720&width=1280&text=${category}`,
              duration,
              views,
              uploadDate: uploadDate.toISOString(),
              userName: `Creator ${(i % 5) + 1}`,
              userAvatar: `/placeholder.svg?height=40&width=40&text=C${(i % 5) + 1}`,
              category,
              tags: [category.toLowerCase(), "discover", i % 2 === 0 ? "featured" : "new"],
            }
          })

        setVideos(mockVideos)
        setFilteredVideos(mockVideos)
      } catch (error) {
        console.error("Error fetching videos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [])

  useEffect(() => {
    // Apply filters
    let result = [...videos]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter((video) => video.category === selectedCategory)
    }

    // Apply duration filter
    result = result.filter((video) => video.duration >= durationRange[0] && video.duration <= durationRange[1])

    // Apply sorting
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    } else if (sortBy === "popular") {
      result.sort((a, b) => b.views - a.views)
    } else if (sortBy === "trending") {
      // For trending, we'll use a combination of recency and views
      result.sort((a, b) => {
        const aScore = b.views / (1 + (new Date().getTime() - new Date(b.uploadDate).getTime()) / 86400000)
        const bScore = a.views / (1 + (new Date().getTime() - new Date(a.uploadDate).getTime()) / 86400000)
        return aScore - bScore
      })
    }

    setFilteredVideos(result)
  }, [videos, searchQuery, selectedCategory, sortBy, durationRange])

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`
    } else {
      return `${views} views`
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      return "1 day ago"
    } else if (diffDays < 30) {
      return `${diffDays} days ago`
    } else if (diffDays < 365) {
      const diffMonths = Math.floor(diffDays / 30)
      return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`
    } else {
      const diffYears = Math.floor(diffDays / 365)
      return `${diffYears} ${diffYears === 1 ? "year" : "years"} ago`
    }
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSortBy("newest")
    setDurationRange([0, 600])
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
            <Link href="/discover" className="text-sm font-medium text-primary hover:underline underline-offset-4">
              Discover
            </Link>
            <Link href="/shorts" className="text-sm font-medium hover:underline underline-offset-4">
              Shorts
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Discover</h1>
              <p className="text-muted-foreground">Find new videos and creators</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search videos..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-7 w-7"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <ChevronDown className="h-4 w-4" />
                      {sortBy === "newest" ? "Newest" : sortBy === "popular" ? "Most Popular" : "Trending"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("popular")}>Most Popular</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("trending")}>Trending</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>Refine your search with these filters</SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                          {categories.map((category) => (
                            <Badge
                              key={category}
                              variant={selectedCategory === category ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => setSelectedCategory(category)}
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">Duration</h3>
                          <span className="text-xs text-muted-foreground">
                            {Math.floor(durationRange[0] / 60)}:{(durationRange[0] % 60).toString().padStart(2, "0")} -{" "}
                            {Math.floor(durationRange[1] / 60)}:{(durationRange[1] % 60).toString().padStart(2, "0")}
                          </span>
                        </div>
                        <Slider
                          defaultValue={[0, 600]}
                          min={0}
                          max={600}
                          step={30}
                          value={durationRange}
                          onValueChange={(value) => setDurationRange(value as [number, number])}
                          className="py-4"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0:00</span>
                          <span>10:00</span>
                        </div>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button variant="outline" onClick={resetFilters}>
                          Reset Filters
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button>Apply Filters</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                <div className="hidden md:flex border rounded-md overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="aspect-video w-full rounded-lg" />
                    <div className="flex gap-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No videos found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredVideos.map((video) => (
                <Link href={`/watch/${video.id}`} key={video.id}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnailUrl || "/placeholder.svg"}
                        alt={video.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                        {formatDuration(video.duration)}
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="h-9 w-9 rounded-full overflow-hidden">
                            <img
                              src={video.userAvatar || "/placeholder.svg"}
                              alt={video.userName}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium line-clamp-2 text-sm">{video.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{video.userName}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <span>{formatViews(video.views)}</span>
                            <span className="mx-1">•</span>
                            <span>{formatDate(video.uploadDate)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVideos.map((video) => (
                <Link href={`/watch/${video.id}`} key={video.id}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative sm:w-64 aspect-video">
                        <img
                          src={video.thumbnailUrl || "/placeholder.svg"}
                          alt={video.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                          {formatDuration(video.duration)}
                        </div>
                      </div>
                      <CardContent className="p-4 flex-1">
                        <h3 className="font-medium line-clamp-2">{video.title}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <span>{formatViews(video.views)}</span>
                          <span className="mx-1">•</span>
                          <span>{formatDate(video.uploadDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="h-6 w-6 rounded-full overflow-hidden">
                            <img
                              src={video.userAvatar || "/placeholder.svg"}
                              alt={video.userName}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">{video.userName}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{video.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{video.category}</Badge>
                          {video.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {filteredVideos.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
