"use client"

import type React from "react"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Users,
  Film,
  HardDrive,
  BarChart,
  Settings,
  Upload,
  Search,
  Eye,
  EyeOff,
  Edit,
  Trash,
  ArrowLeft,
  Plus,
  Download,
  RefreshCw,
  Filter,
  ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "suspended" | "pending"
  createdAt: string
  lastLogin: string
  storageUsed: number
  totalVideos: number
}

interface Video {
  id: string
  title: string
  userId: string
  userName: string
  uploadDate: string
  views: number
  status: "published" | "processing" | "draft" | "deleted"
}

interface StorageStats {
  totalStorage: number
  usedStorage: number
  videoStorage: number
  fileStorage: number
  userCount: number
  activeUsers: number
  totalVideos: number
  totalFiles: number
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users")
  const [users, setUsers] = useState<User[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [stats, setStats] = useState<StorageStats | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch data
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, these would be API calls
        const usersResponse = await fetch("/api/admin/users")
        const videosResponse = await fetch("/api/admin/content")
        const statsResponse = await fetch("/api/admin/analytics")

        if (!usersResponse.ok || !videosResponse.ok || !statsResponse.ok) {
          throw new Error("Failed to fetch data")
        }

        const usersData = await usersResponse.json()
        const videosData = await videosResponse.json()
        const statsData = await statsResponse.json()

        setUsers(usersData.users || [])
        setVideos(videosData.videos || [])
        setStats(statsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const refreshData = async () => {
    setIsRefreshing(true)
    try {
      // In a real app, these would be API calls
      const usersResponse = await fetch("/api/admin/users")
      const videosResponse = await fetch("/api/admin/content")
      const statsResponse = await fetch("/api/admin/analytics")

      if (!usersResponse.ok || !videosResponse.ok || !statsResponse.ok) {
        throw new Error("Failed to fetch data")
      }

      const usersData = await usersResponse.json()
      const videosData = await videosResponse.json()
      const statsData = await statsResponse.json()

      setUsers(usersData.users || [])
      setVideos(videosData.videos || [])
      setStats(statsData)

      toast({
        title: "Data Refreshed",
        description: "The dashboard data has been updated.",
      })
    } catch (error) {
      console.error("Error refreshing data:", error)
      toast({
        title: "Error",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const simulateUpload = async () => {
    if (!selectedImage) return

    setIsUploading(true)
    setUploadProgress(0)

    // Create FormData
    const formData = new FormData()
    formData.append("file", selectedImage)
    formData.append("usedOn", "Homepage")

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      // In a real app, this would be an API call
      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      setUploadProgress(100)

      toast({
        title: "Upload Successful",
        description: "The image has been uploaded successfully.",
      })

      // Reset after a delay
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
      }, 1000)
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Upload Failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
      setIsUploading(false)
    }
  }

  const handleUserAction = async (action: string, userId: string) => {
    try {
      // In a real app, this would be an API call
      const response = await fetch(`/api/admin/users?id=${userId}`, {
        method: action === "delete" ? "DELETE" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          status: action === "activate" ? "active" : action === "suspend" ? "suspended" : undefined,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${action} user`)
      }

      // Update local state
      if (action === "delete") {
        setUsers(users.filter((user) => user.id !== userId))
        toast({
          title: "User Deleted",
          description: "The user has been deleted successfully.",
        })
      } else {
        setUsers(
          users.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  status: action === "activate" ? "active" : "suspended",
                }
              : user,
          ),
        )
        toast({
          title: action === "activate" ? "User Activated" : "User Suspended",
          description: `The user has been ${action === "activate" ? "activated" : "suspended"} successfully.`,
        })
      }
    } catch (error) {
      console.error(`Error ${action} user:`, error)
      toast({
        title: "Action Failed",
        description: `Failed to ${action} user. Please try again.`,
        variant: "destructive",
      })
    }
  }

  const handleVideoAction = async (action: string, videoId: string) => {
    try {
      // In a real app, this would be an API call
      const response = await fetch(`/api/admin/content?id=${videoId}`, {
        method: action === "delete" ? "DELETE" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: videoId,
          status: action === "publish" ? "published" : action === "unpublish" ? "draft" : undefined,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${action} video`)
      }

      // Update local state
      if (action === "delete") {
        setVideos(videos.filter((video) => video.id !== videoId))
        toast({
          title: "Video Deleted",
          description: "The video has been deleted successfully.",
        })
      } else {
        setVideos(
          videos.map((video) =>
            video.id === videoId
              ? {
                  ...video,
                  status: action === "publish" ? "published" : "draft",
                }
              : video,
          ),
        )
        toast({
          title: action === "publish" ? "Video Published" : "Video Unpublished",
          description: `The video has been ${action === "publish" ? "published" : "unpublished"} successfully.`,
        })
      }
    } catch (error) {
      console.error(`Error ${action} video:`, error)
      toast({
        title: "Action Failed",
        description: `Failed to ${action} video. Please try again.`,
        variant: "destructive",
      })
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!statusFilter || user.status === statusFilter) &&
      (!roleFilter || user.role === roleFilter),
  )

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.userName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Link href="/dashboard">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <span>BLACKENSYS Admin</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-32" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
              </div>

              <div className="flex gap-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-10 w-24" />
                  ))}
              </div>

              <Skeleton className="h-[600px] w-full" />
            </div>
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
            <span>BLACKENSYS Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={refreshData} disabled={isRefreshing}>
              {isRefreshing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, content, and system settings</p>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatBytes(stats.usedStorage)} / {formatBytes(stats.totalStorage)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((stats.usedStorage / stats.totalStorage) * 100)}% used
                  </p>
                  <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(stats.usedStorage / stats.totalStorage) * 100}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.userCount}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.activeUsers} active users ({Math.round((stats.activeUsers / stats.userCount) * 100)}%)
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                      +15 this week
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Videos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalVideos}</div>
                  <p className="text-xs text-muted-foreground">{formatBytes(stats.videoStorage)} storage used</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      24 new uploads
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalFiles}</div>
                  <p className="text-xs text-muted-foreground">{formatBytes(stats.fileStorage)} storage used</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                      87 new files
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content */}
          <Tabs defaultValue="users" onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="users" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-1">
                  <Film className="h-4 w-4" />
                  <span>Videos</span>
                </TabsTrigger>
                <TabsTrigger value="storage" className="flex items-center gap-1">
                  <HardDrive className="h-4 w-4" />
                  <span>Storage</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-1">
                  <BarChart className="h-4 w-4" />
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="uploads" className="flex items-center gap-1">
                  <Upload className="h-4 w-4" />
                  <span>Uploads</span>
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full md:w-64 pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {activeTab === "users" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-auto">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                        Status
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => setStatusFilter(null)}
                        className={!statusFilter ? "bg-muted/50" : ""}
                      >
                        All
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStatusFilter("active")}
                        className={statusFilter === "active" ? "bg-muted/50" : ""}
                      >
                        Active
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStatusFilter("suspended")}
                        className={statusFilter === "suspended" ? "bg-muted/50" : ""}
                      >
                        Suspended
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStatusFilter("pending")}
                        className={statusFilter === "pending" ? "bg-muted/50" : ""}
                      >
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">Role</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => setRoleFilter(null)}
                        className={!roleFilter ? "bg-muted/50" : ""}
                      >
                        All
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setRoleFilter("premium")}
                        className={roleFilter === "premium" ? "bg-muted/50" : ""}
                      >
                        Premium
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setRoleFilter("free")}
                        className={roleFilter === "free" ? "bg-muted/50" : ""}
                      >
                        Free
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                <Button variant="default" size="sm" className="ml-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  {activeTab === "users"
                    ? "Add User"
                    : activeTab === "videos"
                      ? "Add Video"
                      : activeTab === "uploads"
                        ? "Upload File"
                        : "Add New"}
                </Button>
              </div>
            </div>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage all users in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>A list of all users in the system.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Storage Used</TableHead>
                        <TableHead>Videos</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            {searchQuery || statusFilter || roleFilter
                              ? "No users match your search criteria"
                              : "No users found in the system"}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={`/placeholder.svg?height=32&width=32&text=${user.name.charAt(0)}`}
                                    alt={user.name}
                                  />
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {user.name}
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${
                                  user.role === "premium" ? "bg-amber-50 text-amber-800" : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${
                                  user.status === "active"
                                    ? "bg-green-50 text-green-800"
                                    : user.status === "suspended"
                                      ? "bg-red-50 text-red-800"
                                      : "bg-blue-50 text-blue-800"
                                }`}
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatBytes(user.storageUsed)}</TableCell>
                            <TableCell>{user.totalVideos}</TableCell>
                            <TableCell>{formatDate(user.createdAt)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" title="Edit User">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                {user.status === "active" ? (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Suspend User"
                                    onClick={() => handleUserAction("suspend", user.id)}
                                  >
                                    <EyeOff className="h-4 w-4" />
                                  </Button>
                                ) : (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Activate User"
                                    onClick={() => handleUserAction("activate", user.id)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete User"
                                  onClick={() => handleUserAction("delete", user.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Previous</Button>
                  <Button variant="outline">Next</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Video Management</CardTitle>
                  <CardDescription>View and manage all videos in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>A list of all videos in the system.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Uploader</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVideos.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            {searchQuery ? "No videos match your search criteria" : "No videos found in the system"}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredVideos.map((video) => (
                          <TableRow key={video.id}>
                            <TableCell className="font-medium">
                              <Link href={`/watch/${video.id}`} className="hover:underline">
                                {video.title}
                              </Link>
                            </TableCell>
                            <TableCell>{video.userName}</TableCell>
                            <TableCell>{formatDate(video.uploadDate)}</TableCell>
                            <TableCell>{video.views}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${
                                  video.status === "published"
                                    ? "bg-green-50 text-green-800"
                                    : video.status === "processing"
                                      ? "bg-blue-50 text-blue-800"
                                      : video.status === "draft"
                                        ? "bg-gray-100 text-gray-800"
                                        : "bg-red-50 text-red-800"
                                }`}
                              >
                                {video.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" title="Edit Video">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                {video.status === "published" ? (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Unpublish Video"
                                    onClick={() => handleVideoAction("unpublish", video.id)}
                                  >
                                    <EyeOff className="h-4 w-4" />
                                  </Button>
                                ) : (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Publish Video"
                                    onClick={() => handleVideoAction("publish", video.id)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete Video"
                                  onClick={() => handleVideoAction("delete", video.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Previous</Button>
                  <Button variant="outline">Next</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="storage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Storage Management</CardTitle>
                  <CardDescription>Monitor and manage system storage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Storage Overview</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Total Storage</span>
                            <span className="text-sm text-muted-foreground">
                              {formatBytes(stats?.usedStorage || 0)} / {formatBytes(stats?.totalStorage || 0)}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${((stats?.usedStorage || 0) / (stats?.totalStorage || 1)) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Video Storage</span>
                            <span className="text-sm text-muted-foreground">
                              {formatBytes(stats?.videoStorage || 0)} / {formatBytes(stats?.usedStorage || 0)}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${((stats?.videoStorage || 0) / (stats?.usedStorage || 1)) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">File Storage</span>
                            <span className="text-sm text-muted-foreground">
                              {formatBytes(stats?.fileStorage || 0)} / {formatBytes(stats?.usedStorage || 0)}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${((stats?.fileStorage || 0) / (stats?.usedStorage || 1)) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Free Space</span>
                            <span className="text-sm text-muted-foreground">
                              {formatBytes((stats?.totalStorage || 0) - (stats?.usedStorage || 0))}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gray-500 rounded-full"
                              style={{
                                width: `${(((stats?.totalStorage || 0) - (stats?.usedStorage || 0)) / (stats?.totalStorage || 1)) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Top Storage Users</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Storage Used</TableHead>
                            <TableHead>% of Total</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users
                            .sort((a, b) => b.storageUsed - a.storageUsed)
                            .slice(0, 5)
                            .map((user) => (
                              <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage
                                        src={`/placeholder.svg?height=32&width=32&text=${user.name.charAt(0)}`}
                                        alt={user.name}
                                      />
                                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {user.name}
                                  </div>
                                </TableCell>
                                <TableCell>{formatBytes(user.storageUsed)}</TableCell>
                                <TableCell>
                                  {((user.storageUsed / (stats?.usedStorage || 1)) * 100).toFixed(1)}%
                                </TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm">
                                    Manage
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Analytics</CardTitle>
                  <CardDescription>View system performance and usage statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Daily Active Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">78</div>
                          <p className="text-xs text-green-600">↑ 12% from last week</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Video Uploads</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">24</div>
                          <p className="text-xs text-green-600">↑ 8% from last week</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">15</div>
                          <p className="text-xs text-red-600">↓ 5% from last week</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">System Performance</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">120ms</div>
                            <p className="text-xs text-green-600">↓ 15ms from last week</p>
                            <Progress value={60} className="h-2 mt-2" />
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">0.8%</div>
                            <p className="text-xs text-green-600">↓ 0.2% from last week</p>
                            <Progress value={20} className="h-2 mt-2" />
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Server Load</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">42%</div>
                            <p className="text-xs text-amber-600">↑ 5% from last week</p>
                            <Progress value={42} className="h-2 mt-2" />
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">User Activity</h3>
                      <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Analytics charts will be displayed here</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="uploads" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Uploads</CardTitle>
                  <CardDescription>Upload images and content for the website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Upload Homepage Banner</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="banner-image" className="block mb-2">
                            Select Image
                          </Label>
                          <Input id="banner-image" type="file" accept="image/*" onChange={handleImageUpload} />
                          <p className="text-xs text-muted-foreground mt-1">
                            Recommended size: 1920x600px. Max file size: 5MB
                          </p>

                          {selectedImage && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium mb-1">Image Details</h4>
                              <p className="text-xs text-muted-foreground">
                                Name: {selectedImage.name}
                                <br />
                                Size: {formatBytes(selectedImage.size)}
                                <br />
                                Type: {selectedImage.type}
                              </p>

                              {isUploading ? (
                                <div className="mt-4">
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm">Uploading...</span>
                                    <span className="text-sm">{uploadProgress}%</span>
                                  </div>
                                  <Progress value={uploadProgress} className="h-2" />
                                </div>
                              ) : (
                                <Button className="mt-4" onClick={simulateUpload}>
                                  Upload Image
                                </Button>
                              )}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label className="block mb-2">Preview</Label>
                          <div className="border rounded-lg overflow-hidden aspect-[16/5] bg-muted flex items-center justify-center">
                            {imagePreview ? (
                              <img
                                src={imagePreview || "/placeholder.svg"}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <p className="text-muted-foreground">No image selected</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Recent Uploads</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Uploaded</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Used On</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <div className="h-12 w-20 bg-muted rounded overflow-hidden">
                                <img
                                  src="/placeholder.svg?height=48&width=80&text=Banner"
                                  alt="Homepage banner"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">homepage-banner-1.jpg</TableCell>
                            <TableCell>April 8, 2023</TableCell>
                            <TableCell>1.2 MB</TableCell>
                            <TableCell>Homepage</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="h-12 w-20 bg-muted rounded overflow-hidden">
                                <img
                                  src="/placeholder.svg?height=48&width=80&text=Cloud"
                                  alt="Feature cloud"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">feature-cloud.jpg</TableCell>
                            <TableCell>April 5, 2023</TableCell>
                            <TableCell>0.8 MB</TableCell>
                            <TableCell>Features Page</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
