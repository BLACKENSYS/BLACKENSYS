import { NextResponse } from "next/server"

// Mock AI recommendation data
const recommendations = {
  forYou: [
    {
      id: "4",
      title: "Advanced Video Editing Techniques",
      description: "Learn advanced video editing techniques for professional-looking content.",
      userId: "3",
      userName: "Amit Kumar",
      thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Advanced",
      duration: 420, // seconds
      views: 567,
      likes: 89,
      confidence: 0.92, // AI confidence score
    },
    {
      id: "5",
      title: "Monetization Strategies for Creators",
      description: "Discover effective monetization strategies for content creators.",
      userId: "4",
      userName: "Neha Singh",
      thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Monetization",
      duration: 360, // seconds
      views: 432,
      likes: 76,
      confidence: 0.88, // AI confidence score
    },
    {
      id: "6",
      title: "Building Your Personal Brand",
      description: "Tips and tricks for building a strong personal brand online.",
      userId: "5",
      userName: "Vikram Mehta",
      thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Branding",
      duration: 300, // seconds
      views: 321,
      likes: 54,
      confidence: 0.85, // AI confidence score
    },
  ],
  trending: [
    {
      id: "7",
      title: "Latest Tech Gadgets Review",
      description: "Review of the latest tech gadgets in the market.",
      userId: "6",
      userName: "Ananya Gupta",
      thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Tech",
      duration: 480, // seconds
      views: 1234,
      likes: 210,
      trendingScore: 0.95, // Trending score
    },
    {
      id: "8",
      title: "Healthy Cooking Recipes",
      description: "Quick and easy healthy cooking recipes for busy people.",
      userId: "7",
      userName: "Rajesh Verma",
      thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Cooking",
      duration: 540, // seconds
      views: 987,
      likes: 176,
      trendingScore: 0.92, // Trending score
    },
    {
      id: "9",
      title: "Workout Routine for Beginners",
      description: "Simple workout routine for beginners to stay fit.",
      userId: "8",
      userName: "Meera Kapoor",
      thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Workout",
      duration: 420, // seconds
      views: 876,
      likes: 154,
      trendingScore: 0.89, // Trending score
    },
  ],
  similar: [
    {
      id: "10",
      title: "Cloud Storage Security Tips",
      description: "Essential security tips for protecting your cloud storage.",
      userId: "2",
      userName: "Priya Patel",
      thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Security",
      duration: 270, // seconds
      views: 345,
      likes: 67,
      similarityScore: 0.94, // Similarity score
    },
    {
      id: "11",
      title: "Organizing Your Digital Files",
      description: "Effective strategies for organizing your digital files.",
      userId: "9",
      userName: "Sanjay Sharma",
      thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Organization",
      duration: 330, // seconds
      views: 432,
      likes: 87,
      similarityScore: 0.91, // Similarity score
    },
    {
      id: "12",
      title: "Backup Strategies for Content Creators",
      description: "Essential backup strategies for content creators.",
      userId: "10",
      userName: "Kavita Reddy",
      thumbnailUrl: "/placeholder.svg?height=720&width=1280&text=Backup",
      duration: 300, // seconds
      views: 321,
      likes: 65,
      similarityScore: 0.88, // Similarity score
    },
  ],
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const videoId = searchParams.get("videoId")
    const type = searchParams.get("type") || "all"

    let response = {}

    if (type === "all") {
      response = recommendations
    } else if (type === "forYou") {
      response = { forYou: recommendations.forYou }
    } else if (type === "trending") {
      response = { trending: recommendations.trending }
    } else if (type === "similar") {
      response = { similar: recommendations.similar }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
  }
}
