"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Film, Share2, Tag, ThumbsUp, User, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

// Mock blog post data
const blogPostsData = {
  "1": {
    id: "1",
    title: "Getting Started with BLACKENSYS Video Creation Tools",
    content: `
# Getting Started with BLACKENSYS Video Creation Tools

Creating engaging videos has never been easier with BLACKENSYS's intuitive video creation tools. Whether you're a beginner or an experienced content creator, our platform provides everything you need to bring your vision to life.

## Understanding the Dashboard

When you first log in to your BLACKENSYS account, you'll be greeted by your personalized dashboard. This is your command center for all video creation activities. Here's what you'll find:

- **My Videos**: Access all your previously created videos
- **Upload**: Add new video content to your library
- **Create**: Launch our video editor to start a new project
- **Templates**: Browse pre-designed templates for quick video creation
- **Assets**: Access your media library including images, audio, and video clips

## Creating Your First Video

### Step 1: Start a New Project

Click on the "Create" button from your dashboard. You'll be presented with options to:
- Start from scratch
- Use a template
- Edit an existing video

For beginners, we recommend starting with a template to understand the workflow.

### Step 2: Add Your Content

Once in the editor, you can:
- Upload your own media files
- Select from our royalty-free library
- Record directly within the platform
- Add text overlays and captions

### Step 3: Edit and Enhance

Our editor provides powerful yet simple tools:
- Trim and cut segments
- Add transitions between clips
- Apply filters and effects
- Adjust colors and lighting
- Add background music and sound effects

### Step 4: Preview and Publish

Before finalizing your video:
- Preview the entire project
- Make any necessary adjustments
- Select your preferred resolution (up to 1080p with the Creator Plan)
- Add metadata including title, description, and tags

Once satisfied, hit "Publish" to make your video available on your channel.

## Advanced Features

As you become more comfortable with the basic tools, explore these advanced features:

- **Motion Graphics**: Add animated elements to make your videos more dynamic
- **Green Screen**: Remove backgrounds and place subjects in new environments
- **Audio Mixing**: Fine-tune multiple audio tracks for professional sound
- **Custom Branding**: Add your logo and brand elements consistently across videos

## Tips for Success

1. **Plan Before You Create**: Outline your video content before starting the editing process
2. **Keep It Concise**: Shorter videos often perform better, especially for new creators
3. **Consistent Style**: Develop a recognizable style for your videos
4. **Optimize Thumbnails**: Create compelling thumbnails to increase click-through rates
5. **Use Analytics**: Review performance data to understand what resonates with your audience

## Next Steps

Once you've created your first video, explore our tutorials on:
- Building your channel
- Growing your audience
- Monetization strategies
- Advanced editing techniques

Happy creating!
    `,
    excerpt: "Learn how to create engaging videos using BLACKENSYS's intuitive video creation tools.",
    date: "April 15, 2024",
    author: "Chandar Sekhar Hembram",
    authorRole: "Co-founder & CEO",
    authorAvatar: "/placeholder.svg?height=100&width=100&text=CH",
    category: "Tutorials",
    tags: ["video creation", "tutorial", "beginners"],
    image: "/placeholder.svg?height=600&width=1200&text=Video+Creation",
    readTime: "5 min read",
    relatedPosts: ["2", "3", "5"],
  },
  "2": {
    id: "2",
    title: "Maximizing Your Cloud Storage: Tips and Tricks",
    content: `
# Maximizing Your Cloud Storage: Tips and Tricks

BLACKENSYS offers unlimited cloud storage, but organizing and managing your files efficiently is key to a productive workflow. This guide will help you make the most of your cloud storage experience.

## Content coming soon...
    `,
    excerpt: "Discover how to efficiently organize and manage your files in BLACKENSYS unlimited cloud storage.",
    date: "April 10, 2024",
    author: "Saurav Barjo",
    authorRole: "Co-founder & CTO",
    authorAvatar: "/placeholder.svg?height=100&width=100&text=SB",
    category: "Cloud Storage",
    tags: ["cloud storage", "organization", "productivity"],
    image: "/placeholder.svg?height=600&width=1200&text=Cloud+Storage",
    readTime: "7 min read",
    relatedPosts: ["1", "4", "5"],
  },
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPost = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const postData = blogPostsData[params.id as keyof typeof blogPostsData]
        if (postData) {
          setPost(postData)
        }
      } catch (error) {
        console.error("Error fetching blog post:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

  const handleLike = () => {
    setLiked(!liked)
    toast({
      title: liked ? "Removed like" : "Added like",
      description: liked ? "You've removed your like from this article" : "You've liked this article",
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Article link copied to clipboard",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Film className="h-6 w-6" />
              <span>BLACKENSYS</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto max-w-4xl">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-64 bg-muted rounded w-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Film className="h-6 w-6" />
              <span>BLACKENSYS</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="container mx-auto max-w-4xl text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/blog">Return to Blog</Link>
            </Button>
          </div>
        </main>
      </div>
    )
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
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <article className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge>{post.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="mr-1 h-4 w-4" />
                  {post.author}
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              <p className="text-lg text-muted-foreground">{post.excerpt}</p>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-sm text-muted-foreground">{post.authorRole}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleLike}>
                  <ThumbsUp className={`mr-1 h-4 w-4 ${liked ? "fill-current text-primary" : ""}`} />
                  {liked ? "Liked" : "Like"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <Separator />

            <div className="prose prose-sm dark:prose-invert max-w-none">
              {post.content.split("\n").map((paragraph: string, index: number) => {
                if (paragraph.startsWith("# ")) {
                  return (
                    <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                      {paragraph.substring(2)}
                    </h1>
                  )
                } else if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-6 mb-3">
                      {paragraph.substring(3)}
                    </h2>
                  )
                } else if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-bold mt-5 mb-2">
                      {paragraph.substring(4)}
                    </h3>
                  )
                } else if (paragraph.startsWith("- ")) {
                  return (
                    <li key={index} className="ml-6">
                      {paragraph.substring(2)}
                    </li>
                  )
                } else if (paragraph.trim() === "") {
                  return <br key={index} />
                } else {
                  return (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  )
                }
              })}
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>

            <Separator className="my-8" />

            <div>
              <h3 className="text-xl font-bold mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {post.relatedPosts.map((relatedId: string) => {
                  const relatedPost = blogPostsData[relatedId as keyof typeof blogPostsData]
                  if (!relatedPost) return null

                  return (
                    <Card key={relatedId}>
                      <CardContent className="p-0">
                        <img
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover"
                        />
                      </CardContent>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base line-clamp-2">{relatedPost.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{relatedPost.excerpt}</CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="link" className="p-0" asChild>
                          <Link href={`/blog/${relatedPost.id}`}>
                            Read More <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </div>
          </article>
        </div>
      </main>

      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-4">
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
