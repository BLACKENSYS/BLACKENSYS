import { NextResponse } from "next/server"

// Mock video data
const videos = [
  {
    id: "1",
    title: "Introduction to BLACKENSYS",
    description: "Learn about the BLACKENSYS platform and its features.",
    userId: "1",
    userName: "Rahul Sharma",
    uploadDate: "2023-04-09T10:30:00Z",
    duration: 180, // seconds
    views: 156,
    likes: 24,
    comments: 8,
    thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Introduction",
    videoUrl: "/videos/intro.mp4",
    status: "published",
  },
  {
    id: "2",
    title: "Cloud Storage Tutorial",
    description: "How to use BLACKENSYS cloud storage effectively.",
    userId: "2",
    userName: "Priya Patel",
    uploadDate: "2023-04-08T14:20:00Z",
    duration: 240, // seconds
    views: 89,
    likes: 15,
    comments: 3,
    thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Tutorial",
    videoUrl: "/videos/tutorial.mp4",
    status: "published",
  },
  {
    id: "3",
    title: "How to Create a Channel",
    description: "Step-by-step guide to creating your own channel on BLACKENSYS.",
    userId: "1",
    userName: "Rahul Sharma",
    uploadDate: "2023-04-05T09:15:00Z",
    duration: 300, // seconds
    views: 243,
    likes: 32,
    comments: 12,
    thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Channel",
    videoUrl: "/videos/channel.mp4",
    status: "published",
  },
  // Add more mock videos as needed
]

export async function GET() {
  try {
    return NextResponse.json({ videos })
  } catch (error) {
    console.error("Error fetching videos:", error)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In a real app, you would validate and save the video to a database
    const newVideo = {
      id: String(videos.length + 1),
      ...body,
      uploadDate: new Date().toISOString(),
      views: 0,
      likes: 0,
      comments: 0,
      status: "processing", // New videos start in processing status
    }

    // For demo purposes, we'll just return the new video
    return NextResponse.json({ video: newVideo })
  } catch (error) {
    console.error("Error creating video:", error)
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 })
  }
}
