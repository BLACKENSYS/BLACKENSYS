"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Cloud,
  Film,
  Users,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  LayoutDashboard,
  FolderPlus,
  Upload,
  MoreVertical,
  Folder,
  File,
  ImageIcon,
  FileText,
  FileVideo,
  FileAudio,
  Share2,
  Download,
  Trash2,
  Lock,
  Eye,
  Grid,
  List,
  Filter,
  ArrowUpDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for files and folders
const mockFolders = [
  { id: "1", name: "Documents", files: 15, size: "2.4 GB", lastModified: "2023-06-10T14:30:00Z" },
  { id: "2", name: "Images", files: 42, size: "1.8 GB", lastModified: "2023-06-08T09:15:00Z" },
  { id: "3", name: "Videos", files: 8, size: "5.2 GB", lastModified: "2023-06-05T16:45:00Z" },
  { id: "4", name: "Projects", files: 23, size: "3.1 GB", lastModified: "2023-06-01T11:20:00Z" },
]

const mockFiles = [
  {
    id: "1",
    name: "Presentation.pptx",
    type: "presentation",
    size: "2.4 MB",
    lastModified: "2023-06-10T14:30:00Z",
    shared: false,
    encrypted: true,
  },
  {
    id: "2",
    name: "Report.pdf",
    type: "document",
    size: "1.8 MB",
    lastModified: "2023-06-08T09:15:00Z",
    shared: true,
    encrypted: true,
  },
  {
    id: "3",
    name: "Profile.jpg",
    type: "image",
    size: "0.8 MB",
    lastModified: "2023-06-05T16:45:00Z",
    shared: false,
    encrypted: false,
  },
  {
    id: "4",
    name: "Tutorial.mp4",
    type: "video",
    size: "15.2 MB",
    lastModified: "2023-06-01T11:20:00Z",
    shared: true,
    encrypted: true,
  },
  {
    id: "5",
    name: "Song.mp3",
    type: "audio",
    size: "3.5 MB",
    lastModified: "2023-05-28T08:10:00Z",
    shared: false,
    encrypted: false,
  },
  {
    id: "6",
    name: "Notes.txt",
    type: "text",
    size: "0.1 MB",
    lastModified: "2023-05-25T15:30:00Z",
    shared: false,
    encrypted: true,
  },
]

// Helper function to get the appropriate icon for a file type
const getFileIcon = (type: string) => {
  switch (type) {
    case "document":
      return <FileText className="h-10 w-10 text-blue-500" />
    case "presentation":
      return <FileText className="h-10 w-10 text-orange-500" />
    case "image":
      return <ImageIcon className="h-10 w-10 text-green-500" />
    case "video":
      return <FileVideo className="h-10 w-10 text-purple-500" />
    case "audio":
      return <FileAudio className="h-10 w-10 text-pink-500" />
    case "text":
      return <File className="h-10 w-10 text-gray-500" />
    default:
      return <File className="h-10 w-10 text-gray-500" />
  }
}

// Format date to a readable format
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function CloudStoragePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Filter files based on search query
  const filteredFiles = mockFiles.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Sort files based on sort criteria
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortBy === "size") {
      const aSize = Number.parseFloat(a.size.split(" ")[0])
      const bSize = Number.parseFloat(b.size.split(" ")[0])
      return sortOrder === "asc" ? aSize - bSize : bSize - aSize
    } else if (sortBy === "date") {
      const aDate = new Date(a.lastModified).getTime()
      const bDate = new Date(b.lastModified).getTime()
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate
    }
    return 0
  })

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-background border-r">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Cloud className="h-6 w-6 text-primary" />
            <span>Cloud Storage</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/videos"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Film className="h-4 w-4" />
              <span>My Videos</span>
            </Link>
            <Link
              href="/cloud-storage"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <Cloud className="h-4 w-4" />
              <span>Cloud Storage</span>
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              <span>Account</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="mt-6 px-3">
            <h3 className="mb-2 text-sm font-medium">Storage</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">12.5 GB of 50 GB used</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              Upgrade Storage
            </Button>
          </div>

          <div className="mt-6 px-3">
            <h3 className="mb-2 text-sm font-medium">Quick Access</h3>
            <div className="space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4 text-blue-500" />
                Documents
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <ImageIcon className="mr-2 h-4 w-4 text-green-500" />
                Images
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <FileVideo className="mr-2 h-4 w-4 text-purple-500" />
                Videos
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Share2 className="mr-2 h-4 w-4 text-amber-500" />
                Shared with me
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Lock className="mr-2 h-4 w-4 text-red-500" />
                Encrypted
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3 py-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg?height=36&width=36&text=U" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">john@example.com</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Button variant="outline" size="icon" className="md:hidden">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search files and folders..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setViewMode("grid")}>
              <Grid className={`h-4 w-4 ${viewMode === "grid" ? "text-primary" : "text-muted-foreground"}`} />
              <span className="sr-only">Grid View</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => setViewMode("list")}>
              <List className={`h-4 w-4 ${viewMode === "list" ? "text-primary" : "text-muted-foreground"}`} />
              <span className="sr-only">List View</span>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">My Files</h1>
                <p className="text-muted-foreground">Manage your files and folders</p>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
                <Button variant="outline">
                  <FolderPlus className="mr-2 h-4 w-4" />
                  New Folder
                </Button>
              </div>
            </div>

            {/* Filters and Sorting */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Tabs defaultValue="all" className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All Files</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="shared">Shared</TabsTrigger>
                  <TabsTrigger value="encrypted">Encrypted</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex gap-2 w-full sm:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Folders */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Folders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockFolders.map((folder) => (
                  <Card key={folder.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <Folder className="h-10 w-10 text-primary" />
                            <div>
                              <h3 className="font-medium">{folder.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {folder.files} files • {folder.size}
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Open
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="bg-muted/50 px-6 py-3 text-xs">Modified {formatDate(folder.lastModified)}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Files */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Files</h2>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {sortedFiles.map((file) => (
                    <Card key={file.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              {getFileIcon(file.type)}
                              <div>
                                <h3 className="font-medium">{file.name}</h3>
                                <p className="text-sm text-muted-foreground">{file.size}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">More</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Open
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <div className="flex gap-1">
                                {file.shared && (
                                  <Badge variant="outline" className="h-5 text-xs">
                                    <Share2 className="mr-1 h-3 w-3" />
                                    Shared
                                  </Badge>
                                )}
                                {file.encrypted && (
                                  <Badge variant="outline" className="h-5 text-xs">
                                    <Lock className="mr-1 h-3 w-3" />
                                    Encrypted
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-muted/50 px-6 py-3 text-xs">Modified {formatDate(file.lastModified)}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-medium">Name</th>
                        <th className="text-left p-3 font-medium">Type</th>
                        <th className="text-left p-3 font-medium">Size</th>
                        <th className="text-left p-3 font-medium">Modified</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-right p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedFiles.map((file) => (
                        <tr key={file.id} className="border-b">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              {getFileIcon(file.type)}
                              <span className="font-medium">{file.name}</span>
                            </div>
                          </td>
                          <td className="p-3 text-muted-foreground">{file.type}</td>
                          <td className="p-3 text-muted-foreground">{file.size}</td>
                          <td className="p-3 text-muted-foreground">{formatDate(file.lastModified)}</td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              {file.shared && (
                                <Badge variant="outline" className="h-5 text-xs">
                                  <Share2 className="mr-1 h-3 w-3" />
                                  Shared
                                </Badge>
                              )}
                              {file.encrypted && (
                                <Badge variant="outline" className="h-5 text-xs">
                                  <Lock className="mr-1 h-3 w-3" />
                                  Encrypted
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Open
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
