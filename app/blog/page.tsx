import Link from "next/link"
import { ArrowRight, Calendar, Film, Search, Tag, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock blog data
const blogPosts = [
  {
    id: "1",
    title: "Getting Started with BLACKENSYS Video Creation Tools",
    excerpt: "Learn how to create engaging videos using BLACKENSYS's intuitive video creation tools.",
    date: "April 15, 2024",
    author: "Chandar Sekhar Hembram",
    category: "Tutorials",
    tags: ["video creation", "tutorial", "beginners"],
    image: "/placeholder.svg?height=400&width=600&text=Video+Creation",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Maximizing Your Cloud Storage: Tips and Tricks",
    excerpt: "Discover how to efficiently organize and manage your files in BLACKENSYS unlimited cloud storage.",
    date: "April 10, 2024",
    author: "Saurav Barjo",
    category: "Cloud Storage",
    tags: ["cloud storage", "organization", "productivity"],
    image: "/placeholder.svg?height=400&width=600&text=Cloud+Storage",
    readTime: "7 min read",
  },
  {
    id: "3",
    title: "Building Your Audience: Community Engagement Strategies",
    excerpt: "Effective strategies to grow your subscriber base and engage with your audience.",
    date: "April 5, 2024",
    author: "Chandar Sekhar Hembram",
    category: "Growth",
    tags: ["community", "engagement", "growth"],
    image: "/placeholder.svg?height=400&width=600&text=Community",
    readTime: "8 min read",
  },
  {
    id: "4",
    title: "Understanding Your Analytics: Data-Driven Content Creation",
    excerpt: "How to use BLACKENSYS analytics to inform your content strategy and grow your channel.",
    date: "April 1, 2024",
    author: "Saurav Barjo",
    category: "Analytics",
    tags: ["analytics", "data", "strategy"],
    image: "/placeholder.svg?height=400&width=600&text=Analytics",
    readTime: "6 min read",
  },
  {
    id: "5",
    title: "Monetization Strategies for Content Creators",
    excerpt: "Explore different ways to monetize your content on BLACKENSYS platform.",
    date: "March 28, 2024",
    author: "Chandar Sekhar Hembram",
    category: "Monetization",
    tags: ["monetization", "revenue", "creator economy"],
    image: "/placeholder.svg?height=400&width=600&text=Monetization",
    readTime: "9 min read",
  },
]

// Categories for filtering
const categories = ["All", "Tutorials", "Cloud Storage", "Growth", "Analytics", "Monetization", "Security", "Updates"]

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Film className="h-6 w-6" />
            <span>BLACKENSYS</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:underline underline-offset-4 text-primary font-bold"
            >
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About Us
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">BLACKENSYS Blog</h1>
            <p className="text-muted-foreground">
              Latest news, tutorials, and insights about video creation and cloud storage
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search articles..." className="pl-8" />
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={category === "All" ? "default" : "ghost"}
                      className="w-full justify-start"
                      size="sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Featured Post */}
              <div>
                <h3 className="font-medium mb-3">Featured Post</h3>
                <Card>
                  <CardContent className="p-0">
                    <img
                      src="/placeholder.svg?height=200&width=400&text=Featured"
                      alt="Featured post"
                      className="w-full h-40 object-cover"
                    />
                  </CardContent>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Security Best Practices for Content Creators</CardTitle>
                    <CardDescription>Protect your content and account with these security tips</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="link" className="p-0" asChild>
                      <Link href="/blog/security-best-practices">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Newsletter Signup */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Subscribe to Our Newsletter</CardTitle>
                  <CardDescription>Get the latest updates directly to your inbox</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Input type="email" placeholder="Your email address" />
                    <Button className="w-full">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Featured Posts Slider (simplified) */}
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=400&width=800&text=Featured+Post"
                    alt="Featured post"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <Badge className="w-fit mb-2">New</Badge>
                    <h2 className="text-2xl font-bold text-white mb-2">Introducing Advanced Video Editing Features</h2>
                    <p className="text-white/80 mb-4">
                      Explore our new suite of professional video editing tools designed for creators
                    </p>
                    <Button variant="default" className="w-fit" asChild>
                      <Link href="/blog/advanced-video-editing">Read Article</Link>
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 left-3" variant="secondary">
                        {post.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 text-xs">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                        <Separator orientation="vertical" className="h-3" />
                        <User className="h-3 w-3" />
                        {post.author}
                        <Separator orientation="vertical" className="h-3" />
                        {post.readTime}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full" asChild>
                        <Link href={`/blog/${post.id}`}>
                          Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-8">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Film className="h-6 w-6" />
                <span>BLACKENSYS</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Stream short videos and store your files securely with BLACKENSYS - Dark After Light
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
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
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
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
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
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
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="text-sm text-muted-foreground hover:text-foreground">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-4">Contact Us</h3>
              <address className="not-italic text-sm text-muted-foreground space-y-2">
                <p>Blackensys Private Limited</p>
                <p>Khorda, Odisha, India</p>
                <p>
                  Email:{" "}
                  <a href="mailto:blackensys@gmail.com" className="hover:text-foreground">
                    blackensys@gmail.com
                  </a>
                </p>
              </address>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 Blackensys Private Limited. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
