import Link from "next/link"
import {
  BarChart3,
  Film,
  Cloud,
  Wallet,
  Users,
  Upload,
  TrendingUp,
  Eye,
  ThumbsUp,
  MessageSquare,
  ArrowUpRight,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's an overview of your account.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-green-500">+12%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5 GB</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-amber-500">25%</span> of your storage
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,450</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-green-500">+18%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-green-500">+32</span> new followers this week
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Content Performance</CardTitle>
          <CardDescription>Track how your videos and reels are performing</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="views">
            <TabsList className="mb-4">
              <TabsTrigger value="views">Views</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            <TabsContent value="views" className="space-y-4">
              <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Views chart will appear here</p>
              </div>
            </TabsContent>
            <TabsContent value="engagement" className="space-y-4">
              <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Engagement chart will appear here</p>
              </div>
            </TabsContent>
            <TabsContent value="followers" className="space-y-4">
              <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Followers chart will appear here</p>
              </div>
            </TabsContent>
            <TabsContent value="earnings" className="space-y-4">
              <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Earnings chart will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Daily</Button>
          <Button variant="outline">Weekly</Button>
          <Button>Monthly</Button>
          <Button variant="outline">Yearly</Button>
        </CardFooter>
      </Card>

      {/* Recent Videos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Videos</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/videos">
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-muted">
                <img
                  src="/placeholder.svg?height=720&width=1280&text=Video+Thumbnail"
                  alt="Video thumbnail"
                  className="object-cover w-full h-full rounded-t-lg"
                />
                <div className="absolute bottom-2 right-2 bg-background/80 text-xs px-2 py-1 rounded backdrop-blur-sm">
                  12:34
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium line-clamp-1">How to Create Amazing Short-Form Videos</h3>
                <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>1.2K</span>
                    <ThumbsUp className="h-4 w-4 ml-2" />
                    <span>85</span>
                    <MessageSquare className="h-4 w-4 ml-2" />
                    <span>12</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-muted">
                <img
                  src="/placeholder.svg?height=720&width=1280&text=Video+Thumbnail"
                  alt="Video thumbnail"
                  className="object-cover w-full h-full rounded-t-lg"
                />
                <div className="absolute bottom-2 right-2 bg-background/80 text-xs px-2 py-1 rounded backdrop-blur-sm">
                  8:45
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium line-clamp-1">Top 10 Cloud Storage Tips for Creators</h3>
                <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>845</span>
                    <ThumbsUp className="h-4 w-4 ml-2" />
                    <span>62</span>
                    <MessageSquare className="h-4 w-4 ml-2" />
                    <span>8</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>5 days ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-muted">
                <img
                  src="/placeholder.svg?height=720&width=1280&text=Video+Thumbnail"
                  alt="Video thumbnail"
                  className="object-cover w-full h-full rounded-t-lg"
                />
                <div className="absolute bottom-2 right-2 bg-background/80 text-xs px-2 py-1 rounded backdrop-blur-sm">
                  15:20
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium line-clamp-1">Monetization Strategies for Content Creators</h3>
                <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>2.4K</span>
                    <ThumbsUp className="h-4 w-4 ml-2" />
                    <span>156</span>
                    <MessageSquare className="h-4 w-4 ml-2" />
                    <span>24</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>1 week ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Storage Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Overview</CardTitle>
          <CardDescription>Monitor your cloud storage usage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">12.5 GB of 50 GB used</span>
              <span className="text-sm font-medium">25%</span>
            </div>
            <Progress value={25} className="h-2" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Videos</span>
              </div>
              <div className="text-xl font-bold">8.2 GB</div>
              <div className="text-xs text-muted-foreground">65% of used space</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Images</span>
              </div>
              <div className="text-xl font-bold">2.1 GB</div>
              <div className="text-xs text-muted-foreground">17% of used space</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-sm">Documents</span>
              </div>
              <div className="text-xl font-bold">1.5 GB</div>
              <div className="text-xs text-muted-foreground">12% of used space</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm">Other</span>
              </div>
              <div className="text-xl font-bold">0.7 GB</div>
              <div className="text-xs text-muted-foreground">6% of used space</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/cloud-storage">
              Manage Storage
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Recent Activity & Trending */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Upload className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Uploaded a new video</p>
                  <p className="text-xs text-muted-foreground">How to Create Amazing Short-Form Videos</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Cloud className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Added files to cloud storage</p>
                  <p className="text-xs text-muted-foreground">5 files added to "Project Assets" folder</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Wallet className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Received earnings</p>
                  <p className="text-xs text-muted-foreground">₹1,250 added to your wallet</p>
                  <p className="text-xs text-muted-foreground">5 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Gained new followers</p>
                  <p className="text-xs text-muted-foreground">32 new followers this week</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trending Content</CardTitle>
            <CardDescription>Popular videos in your niche</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-28 flex-shrink-0 rounded-md bg-muted overflow-hidden">
                  <img
                    src="/placeholder.svg?height=64&width=112&text=Thumbnail"
                    alt="Video thumbnail"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-1 right-1 bg-background/80 text-xs px-1 rounded backdrop-blur-sm">
                    4:20
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium line-clamp-2">10 Tips for Growing Your Audience on Social Media</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>Sarah Johnson</span>
                    <span className="mx-1">•</span>
                    <span>125K views</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Trending #1
                  </Badge>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-28 flex-shrink-0 rounded-md bg-muted overflow-hidden">
                  <img
                    src="/placeholder.svg?height=64&width=112&text=Thumbnail"
                    alt="Video thumbnail"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-1 right-1 bg-background/80 text-xs px-1 rounded backdrop-blur-sm">
                    8:15
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium line-clamp-2">The Ultimate Guide to Video Editing on Mobile</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>Mike Chen</span>
                    <span className="mx-1">•</span>
                    <span>98K views</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Trending #2
                  </Badge>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-28 flex-shrink-0 rounded-md bg-muted overflow-hidden">
                  <img
                    src="/placeholder.svg?height=64&width=112&text=Thumbnail"
                    alt="Video thumbnail"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-1 right-1 bg-background/80 text-xs px-1 rounded backdrop-blur-sm">
                    12:45
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium line-clamp-2">How to Monetize Your Content in 2023</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>Alex Rodriguez</span>
                    <span className="mx-1">•</span>
                    <span>76K views</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Trending #3
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/discover">
                Discover More
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Button asChild className="h-auto flex flex-col items-center justify-center p-6 gap-2">
          <Link href="/upload">
            <Upload className="h-6 w-6" />
            <span>Upload Video</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto flex flex-col items-center justify-center p-6 gap-2">
          <Link href="/cloud-storage">
            <Cloud className="h-6 w-6" />
            <span>Manage Files</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto flex flex-col items-center justify-center p-6 gap-2">
          <Link href="/wallet">
            <Wallet className="h-6 w-6" />
            <span>View Earnings</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto flex flex-col items-center justify-center p-6 gap-2">
          <Link href="/analytics">
            <TrendingUp className="h-6 w-6" />
            <span>View Analytics</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
