"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Bell,
  DollarSign,
  Film,
  Users,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  LayoutDashboard,
  Wallet,
  Target,
  TrendingUp,
  Plus,
  Calendar,
  Clock,
  ArrowUpRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BusinessDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-background border-r">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <DollarSign className="h-6 w-6 text-primary" />
            <span>Business Hub</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Link
              href="/business/dashboard"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/business/campaigns"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Target className="h-4 w-4" />
              <span>Ad Campaigns</span>
            </Link>
            <Link
              href="/business/wallet"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Wallet className="h-4 w-4" />
              <span>Wallet</span>
              <Badge className="ml-auto">₹2,500</Badge>
            </Link>
            <Link
              href="/business/analytics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/business/content"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Film className="h-4 w-4" />
              <span>Content</span>
            </Link>
            <Link
              href="/business/audience"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              <span>Audience</span>
            </Link>
            <Link
              href="/business/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3 py-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg?height=36&width=36&text=B" alt="Business" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Acme Corp</span>
              <span className="text-xs text-muted-foreground">business@acme.com</span>
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
                  placeholder="Search campaigns, analytics..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Business Dashboard</h1>
                <p className="text-muted-foreground">Manage your ad campaigns and track performance</p>
              </div>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href="/business/campaigns/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Campaign
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/business/wallet/topup">
                    <Wallet className="mr-2 h-4 w-4" />
                    Top Up Wallet
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹12,345</div>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-500">+5.2%</span> from last month
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Impressions</CardTitle>
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
                  <div className="text-2xl font-bold">1.2M</div>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-500">+12.7%</span> from last month
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-500">+0.5%</span> from last month
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-amber-500">2</span> pending approval
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Campaign Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Track the performance of your active campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Campaign performance chart will appear here</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Daily</Button>
                <Button variant="outline">Weekly</Button>
                <Button>Monthly</Button>
                <Button variant="outline">Yearly</Button>
              </CardFooter>
            </Card>

            {/* Active Campaigns */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Active Campaigns</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/business/campaigns">
                    View All
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">Summer Sale Promotion</h3>
                          <p className="text-sm text-muted-foreground">Video ad campaign targeting 18-35 age group</p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Budget</p>
                          <p className="font-medium">₹5,000 / ₹10,000</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Impressions</p>
                          <p className="font-medium">452,120</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Clicks</p>
                          <p className="font-medium">15,420</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">CTR</p>
                          <p className="font-medium">3.4%</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Budget spent</span>
                          <span className="text-sm text-muted-foreground">50%</span>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Jun 1 - Jun 30, 2023</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4" />
                        <span>15 days remaining</span>
                      </div>
                    </div>
                    <div className="border-t flex divide-x">
                      <Button variant="ghost" className="flex-1 rounded-none h-12" asChild>
                        <Link href="/business/campaigns/1">View Details</Link>
                      </Button>
                      <Button variant="ghost" className="flex-1 rounded-none h-12">
                        Pause Campaign
                      </Button>
                      <Button variant="ghost" className="flex-1 rounded-none h-12">
                        Edit Campaign
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">New Product Launch</h3>
                          <p className="text-sm text-muted-foreground">
                            Carousel ad campaign targeting tech enthusiasts
                          </p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Budget</p>
                          <p className="font-medium">₹3,500 / ₹7,500</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Impressions</p>
                          <p className="font-medium">215,430</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Clicks</p>
                          <p className="font-medium">8,617</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">CTR</p>
                          <p className="font-medium">4.0%</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Budget spent</span>
                          <span className="text-sm text-muted-foreground">47%</span>
                        </div>
                        <Progress value={47} className="h-2" />
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>May 15 - Jun 15, 2023</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4" />
                        <span>10 days remaining</span>
                      </div>
                    </div>
                    <div className="border-t flex divide-x">
                      <Button variant="ghost" className="flex-1 rounded-none h-12" asChild>
                        <Link href="/business/campaigns/2">View Details</Link>
                      </Button>
                      <Button variant="ghost" className="flex-1 rounded-none h-12">
                        Pause Campaign
                      </Button>
                      <Button variant="ghost" className="flex-1 rounded-none h-12">
                        Edit Campaign
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Audience Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Audience Insights</CardTitle>
                <CardDescription>Understand who is engaging with your ads</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="demographics">
                  <TabsList className="mb-4">
                    <TabsTrigger value="demographics">Demographics</TabsTrigger>
                    <TabsTrigger value="geography">Geography</TabsTrigger>
                    <TabsTrigger value="devices">Devices</TabsTrigger>
                    <TabsTrigger value="interests">Interests</TabsTrigger>
                  </TabsList>
                  <TabsContent value="demographics">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-sm font-medium mb-4">Age Distribution</h4>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">18-24</span>
                              <span className="text-sm text-muted-foreground">32%</span>
                            </div>
                            <Progress value={32} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">25-34</span>
                              <span className="text-sm text-muted-foreground">45%</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">35-44</span>
                              <span className="text-sm text-muted-foreground">15%</span>
                            </div>
                            <Progress value={15} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">45-54</span>
                              <span className="text-sm text-muted-foreground">5%</span>
                            </div>
                            <Progress value={5} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">55+</span>
                              <span className="text-sm text-muted-foreground">3%</span>
                            </div>
                            <Progress value={3} className="h-2" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-4">Gender Distribution</h4>
                        <div className="h-[200px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                          <p className="text-muted-foreground">Gender distribution chart will appear here</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="geography">
                    <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Geographic distribution map will appear here</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="devices">
                    <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Device usage chart will appear here</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="interests">
                    <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">User interests chart will appear here</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
