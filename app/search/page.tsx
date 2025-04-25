"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, Filter, Clock, Calendar, Film, User, Grid, List, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for search results
const generateMockResults = (query: string) => {
  // Generate videos
  const videos = Array.from({ length: 15 }, (_, i) => ({
    id: `video-${i}`,
    title: `${query} Tutorial ${i + 1}: Complete Guide`,
    description: `Learn everything about ${query} in this comprehensive tutorial. Perfect for beginners and advanced users alike.`,
    thumbnail: `/placeholder.svg?height=720&width=1280&text=${query}+${i + 1}`,
    views: Math.floor(Math.random() * 1000000),
    uploadDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    duration: `${Math.floor(Math.random() * 20) + 1}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}`,
    channel: {
      id: `channel-${i % 5}`,
      name: `${query} Expert ${(i % 5) + 1}`,
      avatar: `/placeholder.svg?height=40&width=40&text=${(i % 5) + 1}`,
      subscribers: Math.floor(Math.random() * 1000000),
    },
    tags: [`${query}`, "tutorial", "guide", i % 2 === 0 ? "beginner" : "advanced"],
  }))

  // Generate channels
  const channels = Array.from({ length: 5 }, (_, i) => ({
    id: `channel-${i}`,
    name: `${query} Expert ${i + 1}`,
    avatar: `/placeholder.svg?height=40&width=40&text=${i + 1}`,
    subscribers: Math.floor(Math.random() * 1000000),
    videos: Math.floor(Math.random() * 500),
    description: `The best ${query} content creator. Subscribe for daily ${query} videos and tutorials.`,
  }))

  return { videos, channels }
}

// Format view count
const formatViews = (views: number) => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) {
    return "Yesterday"
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`
  } else if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} months ago`
  } else {
    return `${Math.floor(diffDays / 365)} years ago`
  }
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [searchTerm, setSearchTerm] = useState(query)
  const [activeTab, setActiveTab] = useState("videos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [uploadDate, setUploadDate] = useState("any")
  const [duration, setDuration] = useState("any")
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState<{
    videos: any[]
    channels: any[]
  }>({ videos: [], channels: [] })

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Update URL without full page reload
      const url = new URL(window.location.href)
      url.searchParams.set("q", searchTerm)
      window.history.pushState({}, "", url.toString())

      // Reset loading state and fetch new results
      setIsLoading(true)
      fetchResults(searchTerm)
    }
  }

  // Fetch search results
  const fetchResults = (query: string) => {
    // Simulate API call
    setTimeout(() => {
      const mockResults = generateMockResults(query)
      setResults(mockResults)
      setIsLoading(false)
    }, 1500)
  }

  // Filter and sort results
  const getFilteredResults = () => {
    let filtered = [...results.videos]

    // Filter by upload date
    if (uploadDate !== "any") {
      const now = new Date()
      const cutoffDate = new Date()

      switch (uploadDate) {
        case "hour":
          cutoffDate.setHours(now.getHours() - 1)
          break
        case "today":
          cutoffDate.setHours(0, 0, 0, 0)
          break
        case "week":
          cutoffDate.setDate(now.getDate() - 7)
          break
        case "month":
          cutoffDate.setMonth(now.getMonth() - 1)
          break
        case "year":
          cutoffDate.setFullYear(now.getFullYear() - 1)
          break
      }

      filtered = filtered.filter((video) => new Date(video.uploadDate) >= cutoffDate)
    }

    // Filter by duration
    if (duration !== "any") {
      filtered = filtered.filter((video) => {
        const [minutes, seconds] = video.duration.split(":").map(Number)
        const totalSeconds = minutes * 60 + seconds

        switch (duration) {
          case "short":
            return totalSeconds < 240 // Less than 4 minutes
          case "medium":
            return totalSeconds >= 240 && totalSeconds < 1200 // 4-20 minutes
          case "long":
            return totalSeconds >= 1200 // 20+ minutes
          default:
            return true
        }
      })
    }

    // Sort results
    switch (sortBy) {
      case "date":
        filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
        break
      case "views":
        filtered.sort((a, b) => b.views - a.views)
        break
      case "rating":
        // For demo, we'll just use a random sort for rating
        filtered.sort(() => Math.random() - 0.5)
        break
      // Default is relevance, which is the original order
    }

    return filtered
  }

  // Initialize search on page load
  useEffect(() => {
    if (query) {
      fetchResults(query)
    } else {
      setIsLoading(false)
    }
  }, [query])

  const filteredVideos = getFilteredResults()

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos, channels, and more..."
              className="pl-10 pr-16"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8">
              Search
            </Button>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="h-9 w-9"
          >
            <Grid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="h-9 w-9"
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="date">Upload date</SelectItem>
              <SelectItem value="views">View count</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="sticky top-20 space-y-6">
            <Card>
              <CardContent className="p-4">
                <Accordion type="multiple" defaultValue={["type", "date", "duration"]}>
                  <AccordionItem value="type">
                    <AccordionTrigger className="py-2">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Type</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="videos">Videos</TabsTrigger>
                          <TabsTrigger value="channels">Channels</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="date">
                    <AccordionTrigger className="py-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Upload Date</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {[
                          { value: "any", label: "Any time" },
                          { value: "hour", label: "Last hour" },
                          { value: "today", label: "Today" },
                          { value: "week", label: "This week" },
                          { value: "month", label: "This month" },
                          { value: "year", label: "This year" },
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={`date-${option.value}`}
                              name="upload-date"
                              value={option.value}
                              checked={uploadDate === option.value}
                              onChange={() => setUploadDate(option.value)}
                              className="rounded-full"
                            />
                            <label htmlFor={`date-${option.value}`} className="text-sm cursor-pointer">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="duration">
                    <AccordionTrigger className="py-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Duration</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {[
                          { value: "any", label: "Any duration" },
                          { value: "short", label: "Under 4 minutes" },
                          { value: "medium", label: "4-20 minutes" },
                          { value: "long", label: "Over 20 minutes" },
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={`duration-${option.value}`}
                              name="duration"
                              value={option.value}
                              checked={duration === option.value}
                              onChange={() => setDuration(option.value)}
                              className="rounded-full"
                            />
                            <label htmlFor={`duration-${option.value}`} className="text-sm cursor-pointer">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setUploadDate("any")
                      setDuration("any")
                      setSortBy("relevance")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search results */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="videos" className="mt-0">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Searching for "{query}"...</p>
                </div>
              ) : filteredVideos.length === 0 ? (
                <div className="text-center py-12">
                  <Film className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No videos found</h3>
                  <p className="text-muted-foreground">Try different keywords or filters</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      About {filteredVideos.length} results for "{query}"
                    </p>
                  </div>

                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredVideos.map((video) => (
                        <Link href={`/watch/${video.id}`} key={video.id}>
                          <Card className="overflow-hidden hover-lift">
                            <CardContent className="p-0">
                              <div className="relative aspect-video bg-muted">
                                <img
                                  src={video.thumbnail || "/placeholder.svg"}
                                  alt={video.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                                  {video.duration}
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="flex gap-3">
                                  <Avatar className="h-9 w-9 rounded-full">
                                    <AvatarImage
                                      src={video.channel.avatar || "/placeholder.svg"}
                                      alt={video.channel.name}
                                    />
                                    <AvatarFallback>{video.channel.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-medium line-clamp-2">{video.title}</h3>
                                    <div className="flex flex-col text-xs text-muted-foreground mt-1">
                                      <span>{video.channel.name}</span>
                                      <div className="flex items-center">
                                        <span>{formatViews(video.views)} views</span>
                                        <span className="mx-1">•</span>
                                        <span>{formatDate(video.uploadDate)}</span>
                                      </div>
                                    </div>
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
                          <Card className="overflow-hidden hover:bg-muted/50 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <div className="relative w-40 h-24 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                                  <img
                                    src={video.thumbnail || "/placeholder.svg"}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                                    {video.duration}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium mb-1">{video.title}</h3>
                                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                                    <span>{formatViews(video.views)} views</span>
                                    <span className="mx-1">•</span>
                                    <span>{formatDate(video.uploadDate)}</span>
                                  </div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage
                                        src={video.channel.avatar || "/placeholder.svg"}
                                        alt={video.channel.name}
                                      />
                                      <AvatarFallback>{video.channel.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs">{video.channel.name}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="channels" className="mt-0">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Searching for channels...</p>
                </div>
              ) : results.channels.length === 0 ? (
                <div className="text-center py-12">
                  <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No channels found</h3>
                  <p className="text-muted-foreground">Try different keywords</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      About {results.channels.length} channels for "{query}"
                    </p>
                  </div>

                  <div className="space-y-4">
                    {results.channels.map((channel) => (
                      <Link href={`/channel/${channel.id}`} key={channel.id}>
                        <Card className="overflow-hidden hover:bg-muted/50 transition-colors">
                          <CardContent className="p-6">
                            <div className="flex gap-6">
                              <Avatar className="h-16 w-16 rounded-full">
                                <AvatarImage src={channel.avatar || "/placeholder.svg"} alt={channel.name} />
                                <AvatarFallback>{channel.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="text-xl font-medium">{channel.name}</h3>
                                  <Button>Subscribe</Button>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground mb-2">
                                  <span>{formatViews(channel.subscribers)} subscribers</span>
                                  <span className="mx-2">•</span>
                                  <span>{channel.videos} videos</span>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{channel.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
