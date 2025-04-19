import Link from "next/link"
import { ArrowUpRight, Edit, Film, MoreHorizontal, Plus, Search, Trash, Upload, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function VideosPage() {
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
            <Link
              href="/videos"
              className="text-sm font-medium hover:underline underline-offset-4 text-primary font-bold"
            >
              My Videos
            </Link>
            <Link href="/cloud-storage" className="text-sm font-medium hover:underline underline-offset-4">
              Cloud Storage
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
            <h1 className="text-2xl font-bold tracking-tight">My Videos</h1>
            <p className="text-muted-foreground">Manage your video content</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button asChild>
              <Link href="/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload Video
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/channel">
                <Plus className="mr-2 h-4 w-4" />
                Create Channel
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search videos..." className="w-full pl-8" />
            </div>
            <Tabs defaultValue="all" className="ml-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="movies">Movies</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Video Library</CardTitle>
              <CardDescription>Manage your uploaded videos</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsContent value="all" className="mt-0 space-y-4">
                  {/* Video Item */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg">
                    <div className="w-full md:w-48 h-24 bg-muted rounded-md flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-medium">Introduction to BLACKENSYS</h3>
                      <p className="text-sm text-muted-foreground">Uploaded 2 days ago • 156 views</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Published</span>
                        <span className="text-xs text-muted-foreground">HD 1080p</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/videos/edit/1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href="/watch/1">
                              <ArrowUpRight className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/videos/edit/1">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg">
                    <div className="w-full md:w-48 h-24 bg-muted rounded-md flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-medium">Cloud Storage Tutorial</h3>
                      <p className="text-sm text-muted-foreground">Uploaded 5 days ago • 89 views</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Published</span>
                        <span className="text-xs text-muted-foreground">HD 1080p</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/videos/edit/2">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href="/watch/2">
                              <ArrowUpRight className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/videos/edit/2">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg">
                    <div className="w-full md:w-48 h-24 bg-muted rounded-md flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-medium">How to Create a Channel</h3>
                      <p className="text-sm text-muted-foreground">Uploaded 1 week ago • 243 views</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Published</span>
                        <span className="text-xs text-muted-foreground">HD 1080p</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/videos/edit/3">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href="/watch/3">
                              <ArrowUpRight className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/videos/edit/3">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="published" className="mt-0">
                  <p className="text-center py-8 text-muted-foreground">
                    Same content as "All" tab but filtered for published videos
                  </p>
                </TabsContent>

                <TabsContent value="drafts" className="mt-0">
                  <p className="text-center py-8 text-muted-foreground">You don't have any draft videos</p>
                </TabsContent>

                <TabsContent value="movies" className="mt-0 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Movie Item 1 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-muted"></div>
                      <div className="p-4">
                        <h3 className="font-medium">Avengers: Endgame</h3>
                        <p className="text-sm text-muted-foreground">2019 • Action, Adventure</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">HD</span>
                          <Button size="sm" asChild>
                            <Link href="/watch/movie/1">Watch</Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Movie Item 2 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-muted"></div>
                      <div className="p-4">
                        <h3 className="font-medium">The Dark Knight</h3>
                        <p className="text-sm text-muted-foreground">2008 • Action, Crime, Drama</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">HD</span>
                          <Button size="sm" asChild>
                            <Link href="/watch/movie/2">Watch</Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Movie Item 3 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-muted"></div>
                      <div className="p-4">
                        <h3 className="font-medium">Inception</h3>
                        <p className="text-sm text-muted-foreground">2010 • Action, Adventure, Sci-Fi</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">HD</span>
                          <Button size="sm" asChild>
                            <Link href="/watch/movie/3">Watch</Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Movie Item 4 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-muted"></div>
                      <div className="p-4">
                        <h3 className="font-medium">The Shawshank Redemption</h3>
                        <p className="text-sm text-muted-foreground">1994 • Drama</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">HD</span>
                          <Button size="sm" asChild>
                            <Link href="/watch/movie/4">Watch</Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Movie Item 5 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-muted"></div>
                      <div className="p-4">
                        <h3 className="font-medium">Pulp Fiction</h3>
                        <p className="text-sm text-muted-foreground">1994 • Crime, Drama</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">HD</span>
                          <Button size="sm" asChild>
                            <Link href="/watch/movie/5">Watch</Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Movie Item 6 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-muted"></div>
                      <div className="p-4">
                        <h3 className="font-medium">The Godfather</h3>
                        <p className="text-sm text-muted-foreground">1972 • Crime, Drama</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">HD</span>
                          <Button size="sm" asChild>
                            <Link href="/watch/movie/5">Watch</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Load More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
