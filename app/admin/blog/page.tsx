"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, Eye, Plus, Search, Trash, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

// Mock blog posts data
const initialBlogPosts = [
  {
    id: "1",
    title: "Getting Started with BLACKENSYS Video Creation Tools",
    excerpt: "Learn how to create engaging videos using BLACKENSYS's intuitive video creation tools.",
    date: "April 15, 2024",
    author: "Chandar Sekhar Hembram",
    category: "Tutorials",
    status: "published",
  },
  {
    id: "2",
    title: "Maximizing Your Cloud Storage: Tips and Tricks",
    excerpt: "Discover how to efficiently organize and manage your files in BLACKENSYS unlimited cloud storage.",
    date: "April 10, 2024",
    author: "Saurav Barjo",
    category: "Cloud Storage",
    status: "published",
  },
  {
    id: "3",
    title: "Building Your Audience: Community Engagement Strategies",
    excerpt: "Effective strategies to grow your subscriber base and engage with your audience.",
    date: "April 5, 2024",
    author: "Chandar Sekhar Hembram",
    category: "Growth",
    status: "published",
  },
  {
    id: "4",
    title: "Understanding Your Analytics: Data-Driven Content Creation",
    excerpt: "How to use BLACKENSYS analytics to inform your content strategy and grow your channel.",
    date: "April 1, 2024",
    author: "Saurav Barjo",
    category: "Analytics",
    status: "draft",
  },
  {
    id: "5",
    title: "Monetization Strategies for Content Creators",
    excerpt: "Explore different ways to monetize your content on BLACKENSYS platform.",
    date: "March 28, 2024",
    author: "Chandar Sekhar Hembram",
    category: "Monetization",
    status: "published",
  },
]

export default function AdminBlogPage() {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      setBlogPosts(blogPosts.filter((post) => post.id !== id))
      toast({
        title: "Blog post deleted",
        description: "The blog post has been successfully deleted.",
      })
    }
  }

  const handleStatusChange = (id: string, newStatus: "published" | "draft") => {
    setBlogPosts(
      blogPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              status: newStatus,
            }
          : post,
      ),
    )

    toast({
      title: newStatus === "published" ? "Blog post published" : "Blog post saved as draft",
      description:
        newStatus === "published"
          ? "The blog post is now live on your website."
          : "The blog post has been saved as a draft.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <span>BLACKENSYS Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
              <p className="text-muted-foreground">Create, edit, and manage your blog posts</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/blog/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              </Link>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Manage your blog content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search posts..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        {searchQuery ? "No posts match your search criteria" : "No blog posts found"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{post.category}</Badge>
                        </TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>
                          <Badge variant={post.status === "published" ? "default" : "secondary"} className="capitalize">
                            {post.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/blog/${post.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/admin/blog/edit/${post.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            {post.status === "published" ? (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleStatusChange(post.id, "draft")}
                                title="Unpublish"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                  <circle cx="12" cy="12" r="3" />
                                  <path d="m3 3 18 18" />
                                </svg>
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleStatusChange(post.id, "published")}
                                title="Publish"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePost(post.id)}
                              title="Delete"
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
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline" disabled>
                Next
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blog Settings</CardTitle>
              <CardDescription>Configure your blog settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blog Title</label>
                  <Input defaultValue="BLACKENSYS Blog" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Posts Per Page</label>
                  <Input type="number" defaultValue="10" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <label className="text-sm font-medium">Blog Description</label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Latest news, tutorials, and insights about video creation and cloud storage"
                ></textarea>
              </div>

              <Separator />

              <div className="space-y-2">
                <label className="text-sm font-medium">Featured Image</label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-40 bg-muted rounded-md overflow-hidden">
                    <img
                      src="/placeholder.svg?height=80&width=160&text=Blog+Header"
                      alt="Blog header"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Image
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
