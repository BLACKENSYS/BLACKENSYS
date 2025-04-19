"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowDown,
  ArrowUp,
  Download,
  File,
  FileText,
  Film,
  Folder,
  Grid,
  ImageIcon,
  List,
  MoreHorizontal,
  Music,
  Plus,
  Search,
  Share2,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// File type icons
const fileTypeIcons: Record<string, React.ReactNode> = {
  image: <ImageIcon className="h-12 w-12 text-blue-500" />,
  video: <Film className="h-12 w-12 text-red-500" />,
  audio: <Music className="h-12 w-12 text-purple-500" />,
  document: <FileText className="h-12 w-12 text-yellow-500" />,
  folder: <Folder className="h-12 w-12 text-muted-foreground" />,
  default: <File className="h-12 w-12 text-muted-foreground" />,
}

// Mock file data
interface FileItem {
  id: string
  name: string
  type: string
  size: number
  modified: string
  shared: boolean
  path: string
}

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Project Documents",
    type: "folder",
    size: 0,
    modified: "2025-04-01",
    shared: false,
    path: "/Project Documents",
  },
  {
    id: "2",
    name: "Personal Videos",
    type: "folder",
    size: 0,
    modified: "2025-04-02",
    shared: true,
    path: "/Personal Videos",
  },
  {
    id: "3",
    name: "vacation_photo.jpg",
    type: "image",
    size: 2500000, // 2.5 MB
    modified: "2025-04-03",
    shared: false,
    path: "/vacation_photo.jpg",
  },
  {
    id: "4",
    name: "presentation.pptx",
    type: "document",
    size: 5800000, // 5.8 MB
    modified: "2025-04-04",
    shared: true,
    path: "/presentation.pptx",
  },
  {
    id: "5",
    name: "intro_video.mp4",
    type: "video",
    size: 24000000, // 24 MB
    modified: "2025-04-05",
    shared: false,
    path: "/intro_video.mp4",
  },
  {
    id: "6",
    name: "song.mp3",
    type: "audio",
    size: 8700000, // 8.7 MB
    modified: "2025-04-06",
    shared: false,
    path: "/song.mp3",
  },
  {
    id: "7",
    name: "notes.txt",
    type: "document",
    size: 1200, // 1.2 KB
    modified: "2025-04-07",
    shared: false,
    path: "/notes.txt",
  },
  {
    id: "8",
    name: "profile_pic.png",
    type: "image",
    size: 1800000, // 1.8 MB
    modified: "2025-04-08",
    shared: true,
    path: "/profile_pic.png",
  },
]

// Format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export default function FileManagerPage() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"name" | "size" | "modified">("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPath, setCurrentPath] = useState("/")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadingFile, setUploadingFile] = useState<File | null>(null)
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")

  // Calculate total storage used
  const totalStorageUsed = files.reduce((total, file) => total + file.size, 0)
  const storageLimit = 2 * 1024 * 1024 * 1024 // 2 TB in bytes
  const storagePercentage = (totalStorageUsed / storageLimit) * 100

  // Sort files
  const sortedFiles = [...files].sort((a, b) => {
    // Folders always come first
    if (a.type === "folder" && b.type !== "folder") return -1
    if (a.type !== "folder" && b.type === "folder") return 1

    // Then sort by the selected criteria
    let comparison = 0
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === "size") {
      comparison = a.size - b.size
    } else if (sortBy === "modified") {
      comparison = new Date(a.modified).getTime() - new Date(b.modified).getTime()
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  // Filter files by search query and current path
  const filteredFiles = sortedFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (currentPath === "/" || file.path.startsWith(currentPath)),
  )

  // Handle file selection
  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setUploadingFile(file)
      setUploadProgress(0)

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)

            // Add the file to our list
            const newFile: FileItem = {
              id: Date.now().toString(),
              name: file.name,
              type: file.type.startsWith("image/")
                ? "image"
                : file.type.startsWith("video/")
                  ? "video"
                  : file.type.startsWith("audio/")
                    ? "audio"
                    : "document",
              size: file.size,
              modified: new Date().toISOString().split("T")[0],
              shared: false,
              path: currentPath + file.name,
            }

            setFiles((prev) => [...prev, newFile])
            setTimeout(() => {
              setUploadDialogOpen(false)
              setUploadingFile(null)
            }, 1000)

            return 100
          }
          return prev + 5
        })
      }, 200)
    }
  }

  // Handle file download
  const downloadFile = (fileId: string) => {
    const file = files.find((f) => f.id === fileId)
    if (!file || file.type === "folder") return

    // In a real app, this would trigger a download from your server or cloud storage
    alert(`Downloading ${file.name} (${formatFileSize(file.size)})`)
  }

  // Handle file sharing
  const shareFiles = () => {
    // In a real app, this would generate sharing links or permissions
    alert(`Sharing ${selectedFiles.length} files`)
    setShareDialogOpen(false)
    // Reset selection after sharing
    setSelectedFiles([])
  }

  // Handle file deletion
  const deleteFiles = () => {
    setFiles((prev) => prev.filter((file) => !selectedFiles.includes(file.id)))
    setSelectedFiles([])
  }

  // Create new folder
  const createNewFolder = () => {
    if (newFolderName.trim() === "") return

    const newFolder: FileItem = {
      id: Date.now().toString(),
      name: newFolderName,
      type: "folder",
      size: 0,
      modified: new Date().toISOString().split("T")[0],
      shared: false,
      path: currentPath + newFolderName,
    }

    setFiles((prev) => [...prev, newFolder])
    setNewFolderName("")
    setNewFolderDialogOpen(false)
  }

  // Navigate to folder
  const navigateToFolder = (folderId: string) => {
    const folder = files.find((f) => f.id === folderId)
    if (folder && folder.type === "folder") {
      setCurrentPath(folder.path + "/")
    }
  }

  // Navigate up one level
  const navigateUp = () => {
    if (currentPath === "/") return
    const pathParts = currentPath.split("/").filter(Boolean)
    pathParts.pop()
    setCurrentPath(pathParts.length === 0 ? "/" : "/" + pathParts.join("/") + "/")
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
            <Link
              href="/file-manager"
              className="text-sm font-medium hover:underline underline-offset-4 text-primary font-bold"
            >
              File Manager
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
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">File Manager</h1>
              <p className="text-muted-foreground">Manage your files and folders</p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button onClick={() => setUploadDialogOpen(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
              <Button variant="outline" onClick={() => setNewFolderDialogOpen(true)}>
                <Folder className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Storage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Used Space</span>
                    <span className="text-sm font-medium">{formatFileSize(totalStorageUsed)} / 2 TB</span>
                  </div>
                  <Progress value={storagePercentage} className="h-2" />
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setCurrentPath("/")}>
                    <Folder className="mr-2 h-4 w-4" />
                    All Files
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Film className="mr-2 h-4 w-4" />
                    Videos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Images
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Documents
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Music className="mr-2 h-4 w-4" />
                    Audio
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="mr-2 h-4 w-4" />
                    Shared with me
                  </Button>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">File Types</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Images</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(
                          files.filter((f) => f.type === "image").reduce((total, file) => total + file.size, 0),
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-sm">Videos</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(
                          files.filter((f) => f.type === "video").reduce((total, file) => total + file.size, 0),
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm">Documents</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(
                          files.filter((f) => f.type === "document").reduce((total, file) => total + file.size, 0),
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm">Audio</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(
                          files.filter((f) => f.type === "audio").reduce((total, file) => total + file.size, 0),
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Upgrade Storage
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-3 space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={navigateUp}
                    disabled={currentPath === "/"}
                    className="h-8 px-2"
                  >
                    <ArrowUp className="h-4 w-4 mr-1" />
                    Up
                  </Button>
                  <div className="text-sm bg-muted px-3 py-1 rounded-md">
                    {currentPath === "/" ? "Root" : currentPath}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search files..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9">
                        {sortBy === "name" ? "Name" : sortBy === "size" ? "Size" : "Date Modified"}
                        {sortOrder === "asc" ? (
                          <ArrowUp className="ml-2 h-3 w-3" />
                        ) : (
                          <ArrowDown className="ml-2 h-3 w-3" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSortBy("name")}>
                        Name
                        {sortBy === "name" &&
                          (sortOrder === "asc" ? (
                            <ArrowUp className="ml-2 h-3 w-3" />
                          ) : (
                            <ArrowDown className="ml-2 h-3 w-3" />
                          ))}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("size")}>
                        Size
                        {sortBy === "size" &&
                          (sortOrder === "asc" ? (
                            <ArrowUp className="ml-2 h-3 w-3" />
                          ) : (
                            <ArrowDown className="ml-2 h-3 w-3" />
                          ))}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("modified")}>
                        Date Modified
                        {sortBy === "modified" &&
                          (sortOrder === "asc" ? (
                            <ArrowUp className="ml-2 h-3 w-3" />
                          ) : (
                            <ArrowDown className="ml-2 h-3 w-3" />
                          ))}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                        {sortOrder === "asc" ? "Ascending" : "Descending"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")}>
                    <TabsList>
                      <TabsTrigger value="grid">
                        <Grid className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="list">
                        <List className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {selectedFiles.length > 0 && (
                <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                  <div className="text-sm">
                    {selectedFiles.length} {selectedFiles.length === 1 ? "item" : "items"} selected
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShareDialogOpen(true)}
                      disabled={selectedFiles.length === 0}
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const selectedFile = files.find((f) => f.id === selectedFiles[0])
                        if (selectedFile && selectedFile.type !== "folder") {
                          downloadFile(selectedFiles[0])
                        }
                      }}
                      disabled={
                        selectedFiles.length !== 1 || files.find((f) => f.id === selectedFiles[0])?.type === "folder"
                      }
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={deleteFiles} disabled={selectedFiles.length === 0}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedFiles([])}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              <Card>
                <CardContent className="p-0">
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                      {filteredFiles.length === 0 ? (
                        <div className="col-span-full text-center py-8 text-muted-foreground">
                          No files found in this location
                        </div>
                      ) : (
                        filteredFiles.map((file) => (
                          <div
                            key={file.id}
                            className={`border rounded-md p-3 hover:bg-muted/50 cursor-pointer relative ${
                              selectedFiles.includes(file.id) ? "bg-muted border-primary" : ""
                            }`}
                            onClick={() => {
                              if (file.type === "folder") {
                                navigateToFolder(file.id)
                              } else {
                                toggleFileSelection(file.id)
                              }
                            }}
                            onDoubleClick={() => {
                              if (file.type !== "folder") {
                                downloadFile(file.id)
                              }
                            }}
                          >
                            <div className="absolute top-2 right-2">
                              <Checkbox
                                checked={selectedFiles.includes(file.id)}
                                onCheckedChange={() => toggleFileSelection(file.id)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            <div className="flex flex-col items-center text-center">
                              {fileTypeIcons[file.type] || fileTypeIcons.default}
                              <span className="text-sm font-medium truncate w-full mt-2">{file.name}</span>
                              <div className="flex items-center justify-between w-full mt-1">
                                <span className="text-xs text-muted-foreground">
                                  {file.type !== "folder" ? formatFileSize(file.size) : "Folder"}
                                </span>
                                {file.shared && (
                                  <Badge variant="outline" className="text-xs">
                                    Shared
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredFiles.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No files found in this location</div>
                      ) : (
                        filteredFiles.map((file) => (
                          <div
                            key={file.id}
                            className={`flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer ${
                              selectedFiles.includes(file.id) ? "bg-muted" : ""
                            }`}
                            onClick={() => {
                              if (file.type === "folder") {
                                navigateToFolder(file.id)
                              } else {
                                toggleFileSelection(file.id)
                              }
                            }}
                            onDoubleClick={() => {
                              if (file.type !== "folder") {
                                downloadFile(file.id)
                              }
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={selectedFiles.includes(file.id)}
                                onCheckedChange={() => toggleFileSelection(file.id)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                  {fileTypeIcons[file.type] ? (
                                    React.cloneElement(fileTypeIcons[file.type] as React.ReactElement, {
                                      className: "h-8 w-8",
                                    })
                                  ) : (
                                    <File className="h-8 w-8 text-muted-foreground" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {file.type !== "folder" ? formatFileSize(file.size) : "Folder"} • Modified{" "}
                                    {file.modified}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {file.shared && (
                                <Badge variant="outline" className="mr-2">
                                  Shared
                                </Badge>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {file.type !== "folder" && (
                                    <DropdownMenuItem onClick={() => downloadFile(file.id)}>
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toggleFileSelection(file.id)
                                      setShareDialogOpen(true)
                                    }}
                                  >
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toggleFileSelection(file.id)
                                      deleteFiles()
                                    }}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">
                    {filteredFiles.length} {filteredFiles.length === 1 ? "item" : "items"}
                  </div>
                  <div className="text-sm text-muted-foreground">{formatFileSize(totalStorageUsed)} used of 2 TB</div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>Upload files to your storage</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {!uploadingFile ? (
              <div
                className="border-2 border-dashed rounded-md p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => document.getElementById("file-upload-input")?.click()}
              >
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-1">Drag and drop files to upload</p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                <input id="file-upload-input" type="file" className="hidden" onChange={handleFileUpload} />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <File className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{uploadingFile.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(uploadingFile.size)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setUploadingFile(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Files</DialogTitle>
            <DialogDescription>Share selected files with others</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>People</Label>
              <div className="flex gap-2">
                <Input placeholder="Add email addresses" className="flex-1" />
                <Button variant="secondary">Add</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Selected Files</Label>
              <div className="border rounded-md divide-y max-h-40 overflow-y-auto">
                {selectedFiles.map((fileId) => {
                  const file = files.find((f) => f.id === fileId)
                  if (!file) return null
                  return (
                    <div key={file.id} className="flex items-center gap-3 p-2">
                      {fileTypeIcons[file.type] ? (
                        React.cloneElement(fileTypeIcons[file.type] as React.ReactElement, {
                          className: "h-5 w-5",
                        })
                      ) : (
                        <File className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Permission</Label>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Can edit</div>
                  <div className="text-sm text-muted-foreground">Recipients can view, comment, and edit</div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Can edit</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Can edit</DropdownMenuItem>
                    <DropdownMenuItem>Can comment</DropdownMenuItem>
                    <DropdownMenuItem>Can view</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="copy-link" />
              <Label htmlFor="copy-link">Create a shareable link</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={shareFiles}>Share</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Folder Dialog */}
      <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>Enter a name for your new folder</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="folder-name">Folder Name</Label>
              <Input
                id="folder-name"
                placeholder="My Folder"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createNewFolder} disabled={!newFolderName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
