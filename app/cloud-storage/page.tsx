"use client"

import { useState, useRef, useEffect, type ChangeEvent } from "react"
import Link from "next/link"
import {
  File,
  Film,
  Folder,
  Grid,
  List,
  Plus,
  Search,
  Upload,
  Users,
  Download,
  Trash2,
  Share2,
  MoreVertical,
  Music,
  FileText,
  ImageIcon,
  AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

interface FileItem {
  id: string
  name: string
  type: string
  size: number
  url: string
  folderId?: string
  isShared: boolean
  sharedWith: string[]
  createdAt: string
  updatedAt: string
}

interface FolderItem {
  id: string
  name: string
  parentId?: string
  createdAt: string
  updatedAt: string
}

interface User {
  id: string
  name: string
  email: string
  storageUsed: number
  storageLimit: number
}

// Mock initial data
const initialFiles: FileItem[] = [
  {
    id: "file1",
    name: "Project Presentation.pptx",
    type: "document",
    size: 2.4 * 1024 * 1024,
    url: "/files/presentation.pptx",
    isShared: false,
    sharedWith: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "file2",
    name: "Company Logo.png",
    type: "image",
    size: 0.8 * 1024 * 1024,
    url: "/files/logo.png",
    isShared: true,
    sharedWith: ["user2@example.com"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "file3",
    name: "Product Demo.mp4",
    type: "video",
    size: 15 * 1024 * 1024,
    url: "/files/demo.mp4",
    isShared: false,
    sharedWith: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const initialFolders: FolderItem[] = [
  {
    id: "folder1",
    name: "Documents",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "folder2",
    name: "Images",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "folder3",
    name: "Videos",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export default function CloudStoragePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentFolder, setCurrentFolder] = useState("root")
  const [folderPath, setFolderPath] = useState<{ id: string; name: string }[]>([{ id: "root", name: "My Files" }])
  const [newFolderName, setNewFolderName] = useState("")
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [shareEmail, setShareEmail] = useState("")
  const [sharePermission, setSharePermission] = useState("view")
  const [files, setFiles] = useState<FileItem[]>(initialFiles)
  const [folders, setFolders] = useState<FolderItem[]>(initialFolders)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock user authentication
  useEffect(() => {
    // In a real app, this would check for authentication
    setUser({
      id: "mock-user-id",
      name: "Test User",
      email: "user@example.com",
      storageUsed: 500 * 1024 * 1024, // 500 MB
      storageLimit: 2 * 1024 * 1024 * 1024 * 1024, // 2 TB
    })
  }, [])

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Filter files and folders based on search query
  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
  const filteredFolders = folders.filter((folder) => folder.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Handle file upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles || selectedFiles.length === 0 || !user) return

    setIsUploading(true)
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
    }, 200)

    // Process each file
    Array.from(selectedFiles).forEach(async (file, index) => {
      try {
        // Determine file type
        let fileType = "other"
        if (file.type.startsWith("video/")) fileType = "video"
        else if (file.type.startsWith("image/")) fileType = "image"
        else if (file.type.startsWith("audio/")) fileType = "audio"
        else if (
          file.type.includes("document") ||
          file.type.includes("pdf") ||
          file.type.includes("text") ||
          file.name.endsWith(".doc") ||
          file.name.endsWith(".docx") ||
          file.name.endsWith(".pdf") ||
          file.name.endsWith(".txt")
        )
          fileType = "document"

        // In a real app, this would upload the file to a storage service
        // and get a URL back
        const fileUrl = `/files/${file.name}`

        // Create new file object
        const newFile: FileItem = {
          id: `file${Date.now()}${index}`,
          name: file.name,
          type: fileType,
          size: file.size,
          url: fileUrl,
          folderId: currentFolder === "root" ? undefined : currentFolder,
          isShared: false,
          sharedWith: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        // Add file to state
        setFiles((prev) => [...prev, newFile])

        // Update user storage used
        if (user) {
          setUser({
            ...user,
            storageUsed: user.storageUsed + file.size,
          })
        }

        // If this is the last file, finish upload
        if (index === selectedFiles.length - 1) {
          setTimeout(() => {
            setIsUploading(false)
            setUploadProgress(0)

            // Reset file input
            if (fileInputRef.current) {
              fileInputRef.current.value = ""
            }

            toast({
              title: "Files uploaded successfully",
              description: `${selectedFiles.length} file(s) uploaded to ${currentFolder === "root" ? "My Files" : folderPath[folderPath.length - 1].name}`,
            })
          }, 500)
        }
      } catch (err) {
        console.error("Error uploading file:", err)
        setIsUploading(false)

        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}. Please try again.`,
          variant: "destructive",
        })

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }
    })
  }

  // Handle folder navigation
  const navigateToFolder = async (folderId: string, folderName: string) => {
    setCurrentFolder(folderId)

    // Update folder path
    if (folderId === "root") {
      setFolderPath([{ id: "root", name: "My Files" }])
    } else {
      const folderIndex = folderPath.findIndex((f) => f.id === folderId)

      if (folderIndex >= 0) {
        // If folder is already in path, truncate to that point
        setFolderPath(folderPath.slice(0, folderIndex + 1))
      } else {
        // Add folder to path
        setFolderPath([...folderPath, { id: folderId, name: folderName }])
      }
    }
  }

  // Create new folder
  const createNewFolder = async () => {
    if (!newFolderName.trim() || !user) return

    try {
      // Create new folder object
      const newFolder: FolderItem = {
        id: `folder${Date.now()}`,
        name: newFolderName,
        parentId: currentFolder === "root" ? undefined : currentFolder,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Add folder to state
      setFolders([newFolder, ...folders])
      setNewFolderName("")
      setIsCreatingFolder(false)

      toast({
        title: "Folder created",
        description: `Folder "${newFolderName}" created successfully`,
      })
    } catch (err) {
      console.error("Error creating folder:", err)

      toast({
        title: "Failed to create folder",
        description: "An error occurred while creating the folder. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle file selection
  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => {
      if (prev.includes(fileId)) {
        return prev.filter((id) => id !== fileId)
      } else {
        return [...prev, fileId]
      }
    })
  }

  // Delete selected files
  const deleteSelectedFiles = async () => {
    if (!user || selectedFiles.length === 0) return

    try {
      // Remove files from state
      const filesToDelete = files.filter((file) => selectedFiles.includes(file.id))
      setFiles(files.filter((file) => !selectedFiles.includes(file.id)))

      // Update user storage used
      const spaceFreed = filesToDelete.reduce((total, file) => total + file.size, 0)
      setUser({
        ...user,
        storageUsed: Math.max(0, user.storageUsed - spaceFreed),
      })

      setSelectedFiles([])

      toast({
        title: "Files deleted",
        description: `${filesToDelete.length} file(s) deleted successfully`,
      })
    } catch (err) {
      console.error("Error deleting files:", err)

      toast({
        title: "Failed to delete files",
        description: "An error occurred while deleting the files. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Download file
  const downloadFile = (fileId: string) => {
    const file = files.find((f) => f.id === fileId)
    if (!file) return

    // In a real app, this would trigger a download from the storage service
    toast({
      title: "Download started",
      description: `Downloading ${file.name}...`,
    })
  }

  // Share file
  const shareFile = async () => {
    if (!shareEmail.trim() || selectedFiles.length === 0 || !user) return

    try {
      // Update files with sharing information
      setFiles(
        files.map((file) => {
          if (selectedFiles.includes(file.id)) {
            return {
              ...file,
              isShared: true,
              sharedWith: [...file.sharedWith, shareEmail],
            }
          }
          return file
        }),
      )

      toast({
        title: "Files shared",
        description: `${selectedFiles.length} file(s) shared with ${shareEmail} (${sharePermission} permission)`,
      })

      setShowShareDialog(false)
      setShareEmail("")
    } catch (err) {
      console.error("Error sharing files:", err)

      toast({
        title: "Failed to share files",
        description: "An error occurred while sharing the files. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Get icon for file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="h-12 w-12 text-blue-500" />
      case "video":
        return <Film className="h-12 w-12 text-purple-500" />
      case "document":
        return <FileText className="h-12 w-12 text-green-500" />
      case "image":
        return <ImageIcon className="h-12 w-12 text-pink-500" />
      case "audio":
        return <Music className="h-12 w-12 text-yellow-500" />
      default:
        return <File className="h-12 w-12 text-gray-500" />
    }
  }

  // Calculate storage percentage
  const storagePercentage = user ? (user.storageUsed / user.storageLimit) * 100 : 0

  // Combined items for display
  const combinedItems = [
    ...filteredFolders.map((folder) => ({
      ...folder,
      type: "folder" as const,
      size: 0,
      items: 0, // In a real app, this would be the count of items in the folder
    })),
    ...filteredFiles,
  ]

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
              href="/cloud-storage"
              className="text-sm font-medium hover:underline underline-offset-4 text-primary font-bold"
            >
              Cloud Storage
            </Link>
            <Link href="/shorts" className="text-sm font-medium hover:underline underline-offset-4">
              Shorts
            </Link>
            <Link href="/analytics" className="text-sm font-medium hover:underline underline-offset-4">
              Analytics
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/account">
                <Users className="h-4 w-4" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Cloud Storage</h1>
            <p className="text-muted-foreground">Manage your files and folders</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" multiple />
            <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
            <Dialog open={isCreatingFolder} onOpenChange={setIsCreatingFolder}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Folder className="mr-2 h-4 w-4" />
                  New Folder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Folder</DialogTitle>
                  <DialogDescription>Enter a name for your new folder.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Input
                    placeholder="Folder name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreatingFolder(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createNewFolder}>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Uploading files...</span>
              <span className="text-sm font-medium">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {/* Selected Files Actions */}
        {selectedFiles.length > 0 && (
          <div className="mb-6 p-3 bg-muted rounded-md flex items-center justify-between">
            <span className="text-sm font-medium">{selectedFiles.length} item(s) selected</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedFiles([])}>
                Cancel
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowShareDialog(true)}>
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={deleteSelectedFiles}>
                <Trash2 className="mr-1 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Used Space</span>
                  <span className="text-sm font-medium">
                    {user ? formatFileSize(user.storageUsed) : "0 B"} /{" "}
                    {user ? formatFileSize(user.storageLimit) : "0 B"}
                  </span>
                </div>
                <Progress value={storagePercentage} className="h-2" />
              </div>

              <div className="space-y-2">
                <Button
                  variant={currentFolder === "root" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => navigateToFolder("root", "My Files")}
                >
                  <Folder className="mr-2 h-4 w-4" />
                  All Files
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Film className="mr-2 h-4 w-4" />
                  Videos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Images
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

              <div>
                <h3 className="text-sm font-medium mb-2">Recent Folders</h3>
                <div className="space-y-2">
                  {folders.slice(0, 3).map((folder) => (
                    <div
                      key={folder.id}
                      className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                      onClick={() => navigateToFolder(folder.id, folder.name)}
                    >
                      <Folder className="mr-2 h-4 w-4 text-blue-500" />
                      <span className="text-sm">{folder.name}</span>
                    </div>
                  ))}
                  {folders.length === 0 && <div className="text-sm text-muted-foreground p-2">No folders yet</div>}
                </div>
              </div>

              <div>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Upgrade Storage
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search files and folders..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs defaultValue="grid" className="ml-auto">
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

            {/* Folder Path */}
            <div className="flex items-center gap-1 text-sm">
              {folderPath.map((folder, index) => (
                <div key={folder.id} className="flex items-center">
                  {index > 0 && <span className="mx-1">/</span>}
                  <button
                    className={`hover:underline ${
                      index === folderPath.length - 1 ? "font-medium" : "text-muted-foreground"
                    }`}
                    onClick={() => navigateToFolder(folder.id, folder.name)}
                  >
                    {folder.name}
                  </button>
                </div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{currentFolder === "root" ? "My Files" : folderPath[folderPath.length - 1].name}</CardTitle>
                <CardDescription>
                  {searchQuery
                    ? `Search results for "${searchQuery}"`
                    : `${combinedItems.length} item(s) in this folder`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="py-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2  text-sm text-muted-foreground">Loading files and folders...</p>
                  </div>
                ) : error ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : (
                  <Tabs defaultValue="grid" className="w-full">
                    <TabsContent value="grid" className="mt-0">
                      {combinedItems.length === 0 ? (
                        <div className="py-8 text-center">
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {searchQuery ? "No files match your search" : "This folder is empty"}
                            </AlertDescription>
                          </Alert>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {combinedItems.map((item) => (
                            <div
                              key={item.id}
                              className={`border rounded-md p-3 hover:bg-muted cursor-pointer relative ${
                                selectedFiles.includes(item.id) ? "bg-primary/10 border-primary" : ""
                              }`}
                              onClick={() =>
                                item.type === "folder"
                                  ? navigateToFolder(item.id, item.name)
                                  : toggleFileSelection(item.id)
                              }
                            >
                              {item.type !== "folder" && (
                                <div className="absolute top-2 right-2">
                                  <Checkbox
                                    checked={selectedFiles.includes(item.id)}
                                    onCheckedChange={() => toggleFileSelection(item.id)}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                              )}
                              <div className="flex flex-col items-center text-center">
                                {getFileIcon(item.type)}
                                <span className="text-sm font-medium truncate w-full mt-2">{item.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {item.type === "folder" ? `${item.items} items` : formatFileSize(item.size)}
                                </span>
                              </div>
                              {item.type !== "folder" && (
                                <div className="absolute bottom-2 right-2">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => downloadFile(item.id)}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setSelectedFiles([item.id])
                                          setShowShareDialog(true)
                                        }}
                                      >
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Share
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSelectedFiles([item.id])
                                          deleteSelectedFiles()
                                        }}
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="list" className="mt-0">
                      {combinedItems.length === 0 ? (
                        <div className="py-8 text-center">
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {searchQuery ? "No files match your search" : "This folder is empty"}
                            </AlertDescription>
                          </Alert>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {combinedItems.map((item) => (
                            <div
                              key={item.id}
                              className={`flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer ${
                                selectedFiles.includes(item.id) ? "bg-primary/10" : ""
                              }`}
                              onClick={() =>
                                item.type === "folder"
                                  ? navigateToFolder(item.id, item.name)
                                  : toggleFileSelection(item.id)
                              }
                            >
                              <div className="flex items-center flex-1">
                                {item.type !== "folder" && (
                                  <Checkbox
                                    checked={selectedFiles.includes(item.id)}
                                    onCheckedChange={() => toggleFileSelection(item.id)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="mr-2"
                                  />
                                )}
                                {item.type === "folder" && (
                                  <div className="w-5 h-5 mr-2"></div> // Spacer for alignment
                                )}
                                <div className="mr-3">
                                  {item.type === "folder" ? (
                                    <Folder className="h-5 w-5 text-blue-500" />
                                  ) : item.type === "video" ? (
                                    <Film className="h-5 w-5 text-purple-500" />
                                  ) : item.type === "document" ? (
                                    <FileText className="h-5 w-5 text-green-500" />
                                  ) : item.type === "image" ? (
                                    <ImageIcon className="h-5 w-5 text-pink-500" />
                                  ) : item.type === "audio" ? (
                                    <Music className="h-5 w-5 text-yellow-500" />
                                  ) : (
                                    <File className="h-5 w-5 text-gray-500" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {item.type === "folder" ? `${item.items} items` : formatFileSize(item.size)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-xs text-muted-foreground">
                                  {new Date(item.createdAt).toLocaleDateString()}
                                </div>
                                {item.type !== "folder" && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => downloadFile(item.id)}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setSelectedFiles([item.id])
                                          setShowShareDialog(true)
                                        }}
                                      >
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Share
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSelectedFiles([item.id])
                                          deleteSelectedFiles()
                                        }}
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Load More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Files</DialogTitle>
            <DialogDescription>Share selected files with others by email.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Permission</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="view"
                  value="view"
                  checked={sharePermission === "view"}
                  onChange={() => setSharePermission("view")}
                  className="mr-1"
                />
                <Label htmlFor="view" className="text-sm">
                  View only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="edit"
                  value="edit"
                  checked={sharePermission === "edit"}
                  onChange={() => setSharePermission("edit")}
                  className="mr-1"
                />
                <Label htmlFor="edit" className="text-sm">
                  Can edit
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Cancel
            </Button>
            <Button onClick={shareFile}>Share</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
