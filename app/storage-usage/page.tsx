"use client"

import { useState } from "react"
import Link from "next/link"
import { Film, Folder, HardDrive, ImageIcon, Music, PieChart, Trash2, Users, FileText, File } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock storage data
interface StorageData {
  total: number // in bytes
  used: number // in bytes
  categories: {
    videos: number // in bytes
    images: number // in bytes
    documents: number // in bytes
    audio: number // in bytes
    other: number // in bytes
  }
  history: {
    date: string
    used: number // in bytes
  }[]
}

const mockStorageData: StorageData = {
  total: 2 * 1024 * 1024 * 1024 * 1024, // 2 TB
  used: 256 * 1024 * 1024 * 1024, // 256 GB
  categories: {
    videos: 150 * 1024 * 1024 * 1024, // 150 GB
    images: 50 * 1024 * 1024 * 1024, // 50 GB
    documents: 30 * 1024 * 1024 * 1024, // 30 GB
    audio: 20 * 1024 * 1024 * 1024, // 20 GB
    other: 6 * 1024 * 1024 * 1024, // 6 GB
  },
  history: [
    { date: "Jan", used: 200 * 1024 * 1024 * 1024 }, // 200 GB
    { date: "Feb", used: 220 * 1024 * 1024 * 1024 }, // 220 GB
    { date: "Mar", used: 235 * 1024 * 1024 * 1024 }, // 235 GB
    { date: "Apr", used: 256 * 1024 * 1024 * 1024 }, // 256 GB
  ],
}

// Format file size
function formatFileSize(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export default function StorageUsagePage() {
  const [storageData, setStorageData] = useState<StorageData>(mockStorageData)

  // Calculate percentages
  const usedPercentage = (storageData.used / storageData.total) * 100
  const videosPercentage = (storageData.categories.videos / storageData.used) * 100
  const imagesPercentage = (storageData.categories.images / storageData.used) * 100
  const documentsPercentage = (storageData.categories.documents / storageData.used) * 100
  const audioPercentage = (storageData.categories.audio / storageData.used) * 100
  const otherPercentage = (storageData.categories.other / storageData.used) * 100

  // Mock large files data
  const largeFiles = [
    { name: "Project Video.mp4", size: 5 * 1024 * 1024 * 1024, type: "video" }, // 5 GB
    { name: "Vacation Photos.zip", size: 3 * 1024 * 1024 * 1024, type: "archive" }, // 3 GB
    { name: "Database Backup.sql", size: 2 * 1024 * 1024 * 1024, type: "database" }, // 2 GB
    { name: "Music Collection.zip", size: 1.5 * 1024 * 1024 * 1024, type: "archive" }, // 1.5 GB
    { name: "Design Assets.psd", size: 1 * 1024 * 1024 * 1024, type: "image" }, // 1 GB
  ]

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Film className="h-5 w-5 text-red-500" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "document":
        return <FileText className="h-5 w-5 text-yellow-500" />
      case "audio":
        return <Music className="h-5 w-5 text-purple-500" />
      case "archive":
        return <Folder className="h-5 w-5 text-orange-500" />
      case "database":
        return <HardDrive className="h-5 w-5 text-green-500" />
      default:
        return <File className="h-5 w-5 text-muted-foreground" />
    }
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
              href="/storage-usage"
              className="text-sm font-medium hover:underline underline-offset-4 text-primary font-bold"
            >
              Storage Usage
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
              <h1 className="text-2xl font-bold tracking-tight">Storage Usage</h1>
              <p className="text-muted-foreground">Monitor and manage your cloud storage usage</p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button variant="outline">
                <Trash2 className="mr-2 h-4 w-4" />
                Clean Up Storage
              </Button>
              <Button>
                <HardDrive className="mr-2 h-4 w-4" />
                Upgrade Storage
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Storage Overview</CardTitle>
                <CardDescription>
                  You've used {formatFileSize(storageData.used)} of {formatFileSize(storageData.total)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        {formatFileSize(storageData.used)} of {formatFileSize(storageData.total)} used
                      </span>
                      <span className="text-sm font-medium">{usedPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={usedPercentage} className="h-2" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm font-medium">Videos</span>
                      </div>
                      <div className="text-2xl font-bold">{formatFileSize(storageData.categories.videos)}</div>
                      <div className="text-sm text-muted-foreground">{videosPercentage.toFixed(1)}% of used space</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-medium">Images</span>
                      </div>
                      <div className="text-2xl font-bold">{formatFileSize(storageData.categories.images)}</div>
                      <div className="text-sm text-muted-foreground">{imagesPercentage.toFixed(1)}% of used space</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm font-medium">Documents</span>
                      </div>
                      <div className="text-2xl font-bold">{formatFileSize(storageData.categories.documents)}</div>
                      <div className="text-sm text-muted-foreground">
                        {documentsPercentage.toFixed(1)}% of used space
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm font-medium">Audio</span>
                      </div>
                      <div className="text-2xl font-bold">{formatFileSize(storageData.categories.audio)}</div>
                      <div className="text-sm text-muted-foreground">{audioPercentage.toFixed(1)}% of used space</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                        <span className="text-sm font-medium">Other</span>
                      </div>
                      <div className="text-2xl font-bold">{formatFileSize(storageData.categories.other)}</div>
                      <div className="text-sm text-muted-foreground">{otherPercentage.toFixed(1)}% of used space</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Distribution</CardTitle>
                <CardDescription>Breakdown by file type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <div className="relative h-48 w-48">
                    <PieChart className="h-full w-full text-muted-foreground" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">{usedPercentage.toFixed(1)}%</span>
                      <span className="text-sm text-muted-foreground">Used</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">Videos</span>
                    </div>
                    <span className="text-sm font-medium">{videosPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Images</span>
                    </div>
                    <span className="text-sm font-medium">{imagesPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Documents</span>
                    </div>
                    <span className="text-sm font-medium">{documentsPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm">Audio</span>
                    </div>
                    <span className="text-sm font-medium">{audioPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                      <span className="text-sm">Other</span>
                    </div>
                    <span className="text-sm font-medium">{otherPercentage.toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Usage History</CardTitle>
                <CardDescription>Monthly usage trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-end gap-2">
                  {storageData.history.map((item, index) => {
                    const percentage = (item.used / storageData.total) * 100
                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="w-full bg-primary rounded-t-md" style={{ height: `${percentage * 2}px` }}></div>
                        <div className="mt-2 text-xs">{item.date}</div>
                        <div className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Storage usage has increased by{" "}
                  {(
                    ((storageData.history[storageData.history.length - 1].used - storageData.history[0].used) /
                      storageData.history[0].used) *
                    100
                  ).toFixed(1)}
                  % in the last {storageData.history.length} months
                </div>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Largest Files</CardTitle>
                <CardDescription>Files taking up the most space</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {largeFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Large Files
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Storage Management</CardTitle>
                <CardDescription>Tools to optimize your storage usage</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cleanup">
                  <TabsList className="mb-4">
                    <TabsTrigger value="cleanup">Cleanup Tools</TabsTrigger>
                    <TabsTrigger value="duplicates">Duplicate Files</TabsTrigger>
                    <TabsTrigger value="trash">Trash</TabsTrigger>
                  </TabsList>

                  <TabsContent value="cleanup" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Temporary Files</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">1.2 GB</div>
                          <p className="text-sm text-muted-foreground">
                            Cached and temporary files that can be safely removed
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            Clean Up
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Old Versions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">3.5 GB</div>
                          <p className="text-sm text-muted-foreground">
                            Previous versions of files that you may no longer need
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            Review & Clean
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Unused Files</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">8.7 GB</div>
                          <p className="text-sm text-muted-foreground">Files you haven't accessed in over 6 months</p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            Review & Archive
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="duplicates">
                    <div className="text-center py-8">
                      <Button>Scan for Duplicate Files</Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        Find and remove duplicate files to free up storage space
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="trash">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Your trash is empty</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Files in trash are automatically deleted after 30 days
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
