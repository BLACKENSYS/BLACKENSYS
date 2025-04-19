"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpDown,
  Copy,
  File,
  Film,
  LinkIcon,
  MoreHorizontal,
  Search,
  Settings,
  Share2,
  Trash2,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock shared file data
interface SharedFile {
  id: string
  name: string
  type: string
  size: number
  sharedBy: string
  sharedWith: string[]
  dateShared: string
  permission: "view" | "edit" | "comment"
  link?: string
}

const mockSharedFiles: SharedFile[] = [
  {
    id: "1",
    name: "Project Presentation.pptx",
    type: "document",
    size: 5800000, // 5.8 MB
    sharedBy: "You",
    sharedWith: ["john@example.com", "alice@example.com"],
    dateShared: "2025-04-01",
    permission: "edit",
    link: "https://blackensys.com/share/abc123",
  },
  {
    id: "2",
    name: "Team Photo.jpg",
    type: "image",
    size: 2500000, // 2.5 MB
    sharedBy: "You",
    sharedWith: ["team@example.com"],
    dateShared: "2025-04-02",
    permission: "view",
    link: "https://blackensys.com/share/def456",
  },
  {
    id: "3",
    name: "Product Demo.mp4",
    type: "video",
    size: 24000000, // 24 MB
    sharedBy: "john@example.com",
    sharedWith: ["You"],
    dateShared: "2025-04-03",
    permission: "comment",
  },
  {
    id: "4",
    name: "Financial Report.xlsx",
    type: "document",
    size: 1200000, // 1.2 MB
    sharedBy: "alice@example.com",
    sharedWith: ["You", "john@example.com"],
    dateShared: "2025-04-04",
    permission: "view",
  },
  {
    id: "5",
    name: "Marketing Plan.docx",
    type: "document",
    size: 3500000, // 3.5 MB
    sharedBy: "You",
    sharedWith: ["marketing@example.com"],
    dateShared: "2025-04-05",
    permission: "edit",
    link: "https://blackensys.com/share/ghi789",
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

export default function FileSharingPage() {
  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>(mockSharedFiles)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<SharedFile | null>(null)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Filter files by search query
  const filteredFiles = sharedFiles.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Sort files by date shared
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    const dateA = new Date(a.dateShared).getTime()
    const dateB = new Date(b.dateShared).getTime()
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA
  })

  // Copy link to clipboard
  const copyLinkToClipboard = (link: string) => {
    navigator.clipboard.writeText(link)
    alert("Link copied to clipboard!")
  }

  // Generate a sharing link
  const generateSharingLink = (fileId: string) => {
    const file = sharedFiles.find((f) => f.id === fileId)
    if (!file) return

    // If link already exists, return it
    if (file.link) {
      return file.link
    }

    // Generate a new link
    const newLink = `https://blackensys.com/share/${Math.random().toString(36).substring(2, 8)}`

    // Update the file with the new link
    setSharedFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, link: newLink } : f)))

    return newLink
  }

  // Remove sharing
  const removeSharing = (fileId: string) => {
    setSharedFiles((prev) => prev.filter((file) => file.id !== fileId))
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
            <Link href="/file-manager" className="text-sm font-medium hover:underline underline-offset-4">
              File Manager
            </Link>
            <Link
              href="/file-sharing"
              className="text-sm font-medium hover:underline underline-offset-4 text-primary font-bold"
            >
              File Sharing
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
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">File Sharing</h1>
              <p className="text-muted-foreground">Manage your shared files and access files shared with you</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle>Shared Files</CardTitle>
                  <CardDescription>Files you've shared or that have been shared with you</CardDescription>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search shared files..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="shared-by-me">Shared by me</TabsTrigger>
                  <TabsTrigger value="shared-with-me">Shared with me</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {sortedFiles.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No shared files found</div>
                  ) : (
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm border-b">
                        <div className="col-span-5">Name</div>
                        <div className="col-span-2">Shared By</div>
                        <div className="col-span-2">Shared With</div>
                        <div className="col-span-2">Date Shared</div>
                        <div className="col-span-1"></div>
                      </div>
                      <div className="divide-y">
                        {sortedFiles.map((file) => (
                          <div key={file.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                            <div className="col-span-5 flex items-center gap-3">
                              <File className="h-8 w-8 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatFileSize(file.size)} •{" "}
                                  {file.permission === "edit"
                                    ? "Can edit"
                                    : file.permission === "comment"
                                      ? "Can comment"
                                      : "Can view"}
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2">
                              {file.sharedBy === "You" ? (
                                "You"
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={file.sharedBy} />
                                    <AvatarFallback>{file.sharedBy.charAt(0).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm truncate">{file.sharedBy}</span>
                                </div>
                              )}
                            </div>
                            <div className="col-span-2">
                              {file.sharedWith.includes("You") ? (
                                <Badge variant="outline">You</Badge>
                              ) : (
                                <div className="flex flex-wrap gap-1">
                                  {file.sharedWith.length > 1 ? (
                                    <Badge variant="outline">{file.sharedWith.length} people</Badge>
                                  ) : (
                                    <Badge variant="outline">{file.sharedWith[0]}</Badge>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="col-span-2 text-sm">{file.dateShared}</div>
                            <div className="col-span-1 flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {file.sharedBy === "You" && (
                                    <>
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setSelectedFile(file)
                                          setShareDialogOpen(true)
                                        }}
                                      >
                                        <Share2 className="h-4 w-4 mr-2" />
                                        Manage sharing
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setSelectedFile(file)
                                          setLinkDialogOpen(true)
                                        }}
                                      >
                                        <LinkIcon className="h-4 w-4 mr-2" />
                                        Get link
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setSelectedFile(file)
                                          setSettingsDialogOpen(true)
                                        }}
                                      >
                                        <Settings className="h-4 w-4 mr-2" />
                                        Sharing settings
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        onClick={() => removeSharing(file.id)}
                                        className="text-destructive"
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Remove sharing
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {file.sharedBy !== "You" && (
                                    <>
                                      <DropdownMenuItem>
                                        <File className="h-4 w-4 mr-2" />
                                        View file
                                      </DropdownMenuItem>
                                      {file.permission === "edit" && (
                                        <DropdownMenuItem>
                                          <File className="h-4 w-4 mr-2" />
                                          Edit file
                                        </DropdownMenuItem>
                                      )}
                                    </>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="shared-by-me" className="space-y-4">
                  {sortedFiles.filter((file) => file.sharedBy === "You").length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">You haven't shared any files yet</div>
                  ) : (
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm border-b">
                        <div className="col-span-5">Name</div>
                        <div className="col-span-3">Shared With</div>
                        <div className="col-span-2">Date Shared</div>
                        <div className="col-span-2">Access</div>
                      </div>
                      <div className="divide-y">
                        {sortedFiles
                          .filter((file) => file.sharedBy === "You")
                          .map((file) => (
                            <div key={file.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                              <div className="col-span-5 flex items-center gap-3">
                                <File className="h-8 w-8 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                                </div>
                              </div>
                              <div className="col-span-3">
                                <div className="flex flex-wrap gap-1">
                                  {file.sharedWith.length > 1 ? (
                                    <Badge variant="outline">{file.sharedWith.length} people</Badge>
                                  ) : (
                                    <Badge variant="outline">{file.sharedWith[0]}</Badge>
                                  )}
                                </div>
                              </div>
                              <div className="col-span-2 text-sm">{file.dateShared}</div>
                              <div className="col-span-2 flex items-center justify-between">
                                <Badge>
                                  {file.permission === "edit"
                                    ? "Can edit"
                                    : file.permission === "comment"
                                      ? "Can comment"
                                      : "Can view"}
                                </Badge>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedFile(file)
                                        setShareDialogOpen(true)
                                      }}
                                    >
                                      <Share2 className="h-4 w-4 mr-2" />
                                      Manage sharing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedFile(file)
                                        setLinkDialogOpen(true)
                                      }}
                                    >
                                      <LinkIcon className="h-4 w-4 mr-2" />
                                      Get link
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() => removeSharing(file.id)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Remove sharing
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="shared-with-me" className="space-y-4">
                  {sortedFiles.filter((file) => file.sharedWith.includes("You")).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No files have been shared with you yet</div>
                  ) : (
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm border-b">
                        <div className="col-span-5">Name</div>
                        <div className="col-span-3">Shared By</div>
                        <div className="col-span-2">Date Shared</div>
                        <div className="col-span-2">Access</div>
                      </div>
                      <div className="divide-y">
                        {sortedFiles
                          .filter((file) => file.sharedWith.includes("You"))
                          .map((file) => (
                            <div key={file.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                              <div className="col-span-5 flex items-center gap-3">
                                <File className="h-8 w-8 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                                </div>
                              </div>
                              <div className="col-span-3">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={file.sharedBy} />
                                    <AvatarFallback>{file.sharedBy.charAt(0).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm truncate">{file.sharedBy}</span>
                                </div>
                              </div>
                              <div className="col-span-2 text-sm">{file.dateShared}</div>
                              <div className="col-span-2 flex items-center justify-between">
                                <Badge>
                                  {file.permission === "edit"
                                    ? "Can edit"
                                    : file.permission === "comment"
                                      ? "Can comment"
                                      : "Can view"}
                                </Badge>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t">
              <div className="text-sm text-muted-foreground">
                {filteredFiles.length} {filteredFiles.length === 1 ? "file" : "files"}
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share "{selectedFile?.name}"</DialogTitle>
            <DialogDescription>Add people to share this file with</DialogDescription>
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
              <Label>Currently shared with</Label>
              <div className="border rounded-md divide-y max-h-40 overflow-y-auto">
                {selectedFile?.sharedWith.map((person, index) => (
                  <div key={index} className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={person} />
                        <AvatarFallback>{person.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{person}</span>
                    </div>
                    <Select defaultValue={selectedFile?.permission}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Permission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">Can view</SelectItem>
                        <SelectItem value="comment">Can comment</SelectItem>
                        <SelectItem value="edit">Can edit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>General access</Label>
                <Switch id="create-link" />
              </div>
              <div className="text-sm text-muted-foreground">Anyone with the link can access this file</div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShareDialogOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get link for "{selectedFile?.name}"</DialogTitle>
            <DialogDescription>Share this link with others to give them access</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Shareable link</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={selectedFile?.link || generateSharingLink(selectedFile?.id || "")}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => copyLinkToClipboard(selectedFile?.link || "")}
                  disabled={!selectedFile?.link}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Link sharing</Label>
                <Switch id="link-enabled" defaultChecked={!!selectedFile?.link} />
              </div>
              <div className="text-sm text-muted-foreground">
                When enabled, anyone with the link can access this file
              </div>
            </div>

            <div className="space-y-2">
              <Label>Permission for link</Label>
              <Select defaultValue={selectedFile?.permission}>
                <SelectTrigger>
                  <SelectValue placeholder="Permission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">Can view</SelectItem>
                  <SelectItem value="comment">Can comment</SelectItem>
                  <SelectItem value="edit">Can edit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setLinkDialogOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sharing settings for "{selectedFile?.name}"</DialogTitle>
            <DialogDescription>Manage how this file is shared</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Access control</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="prevent-download" />
                  <Label htmlFor="prevent-download">Prevent viewers from downloading</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disable-printing" />
                  <Label htmlFor="disable-printing">Disable printing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="prevent-copying" />
                  <Label htmlFor="prevent-copying">Prevent copying of content</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Expiration</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="set-expiration" />
                <Label htmlFor="set-expiration">Set expiration date</Label>
              </div>
              <Input type="date" disabled className="mt-2" />
            </div>

            <div className="space-y-2">
              <Label>Notification settings</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="notify-access" defaultChecked />
                <Label htmlFor="notify-access">Notify me when file is accessed</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setSettingsDialogOpen(false)}>Save settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
