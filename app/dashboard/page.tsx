import Link from "next/link"
import { ArrowUpRight, Cloud, Film, Plus, Upload, Users, BarChart2, Clock, Flame, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Film className="h-6 w-6" />
            <span>BLACKENSYS</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-primary font-bold">
              Dashboard
            </Link>
            <Link href="/videos" className="text-sm font-medium hover:underline underline-offset-4">
              My Videos
            </Link>
            <Link href="/cloud-storage" className="text-sm font-medium hover:underline underline-offset-4">
              Cloud Storage
            </Link>
            <Link href="/discover" className="text-sm font-medium hover:underline underline-offset-4">
              Discover
            </Link>
            <Link href="/shorts" className="text-sm font-medium hover:underline underline-offset-4">
              Shorts
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
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's an overview of your account.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link href="/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Video
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/cloud-storage">
                  <Cloud className="mr-2 h-4 w-4" />
                  Manage Files
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-background to-muted">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
                <Film className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-3 w-3 mr-1 text-emerald-500"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                  <span>+2 from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-background to-muted">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-3 w-3 mr-1 text-emerald-500"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                  <span>+15% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-background to-muted">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                <Cloud className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4 GB</div>
                <Progress value={24} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">24% of 10 GB used</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-background to-muted">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-3 w-3 mr-1 text-emerald-500"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                  <span>+5 from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks you might want to perform</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button className="w-full justify-start" asChild>
                  <Link href="/upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Video
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/cloud-storage">
                    <Cloud className="mr-2 h-4 w-4" />
                    Upload to Cloud
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/channel">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Channel
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/analytics">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-4">
              <CardHeader className="pb-2">
                <CardTitle>Activity Overview</CardTitle>
                <CardDescription>Your content performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Activity chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Tabs defaultValue="recent">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="recent" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Recent
                  </TabsTrigger>
                  <TabsTrigger value="trending" className="flex items-center gap-1">
                    <Flame className="h-4 w-4" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="recommended" className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Recommended
                  </TabsTrigger>
                </TabsList>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/videos">
                    View All
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <TabsContent value="recent" className="mt-0">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((id) => (
                    <Card key={id} className="overflow-hidden">
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={`/placeholder.svg?height=720&width=1280&text=Video+${id}`}
                          alt={`Video ${id}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                          3:00
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder.svg?height=36&width=36&text=U" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium line-clamp-1">Video Title {id}</h3>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>156 views</span>
                              <span className="mx-1">•</span>
                              <span>2 days ago</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-0">
                        <Button variant="ghost" className="w-full rounded-none h-10" asChild>
                          <Link href={`/watch/${id}`}>
                            Watch Now
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="trending" className="mt-0">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[4, 5, 6].map((id) => (
                    <Card key={id} className="overflow-hidden">
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={`/placeholder.svg?height=720&width=1280&text=Trending+${id}`}
                          alt={`Trending ${id}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                          4:30
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder.svg?height=36&width=36&text=T" alt="Trending" />
                            <AvatarFallback>T</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium line-clamp-1">Trending Video {id}</h3>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>1.2K views</span>
                              <span className="mx-1">•</span>
                              <span>5 days ago</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-0">
                        <Button variant="ghost" className="w-full rounded-none h-10" asChild>
                          <Link href={`/watch/${id}`}>
                            Watch Now
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommended" className="mt-0">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[7, 8, 9].map((id) => (
                    <Card key={id} className="overflow-hidden">
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={`/placeholder.svg?height=720&width=1280&text=Recommended+${id}`}
                          alt={`Recommended ${id}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                          5:15
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder.svg?height=36&width=36&text=R" alt="Recommended" />
                            <AvatarFallback>R</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium line-clamp-1">Recommended Video {id}</h3>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>843 views</span>
                              <span className="mx-1">•</span>
                              <span>1 week ago</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-0">
                        <Button variant="ghost" className="w-full rounded-none h-10" asChild>
                          <Link href={`/watch/${id}`}>
                            Watch Now
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Storage Overview</CardTitle>
                <CardDescription>Your cloud storage usage by file type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Videos</span>
                      <span className="text-sm text-muted-foreground">1.5 GB</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Images</span>
                      <span className="text-sm text-muted-foreground">0.5 GB</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Documents</span>
                      <span className="text-sm text-muted-foreground">0.3 GB</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Other</span>
                      <span className="text-sm text-muted-foreground">0.1 GB</span>
                    </div>
                    <Progress value={4} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/cloud-storage">Manage Storage</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Uploaded a new video", time: "2 hours ago" },
                    { action: "Received 5 new subscribers", time: "Yesterday" },
                    { action: "Your video reached 100 views", time: "2 days ago" },
                    { action: "Storage usage alert: 25% used", time: "3 days ago" },
                    { action: "New comment on your video", time: "1 week ago" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <div>
                        <p className="text-sm font-medium">{item.action}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/activity">View All Activity</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:h-16">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2025 BLACKENSYS. All rights reserved.</span>
            </div>
            <nav className="flex gap-4 text-sm">
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="/help" className="text-muted-foreground hover:text-foreground">
                Help Center
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
