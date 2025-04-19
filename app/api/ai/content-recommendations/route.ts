import { type NextRequest, NextResponse } from "next/server"
import db from "../../db/mock-db"

// Simple AI recommendation algorithm
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const contentType = searchParams.get("type") || "video"

    if (!userId) {
      return NextResponse.json({ error: "UserId is required" }, { status: 400 })
    }

    // Get user's activity history
    const activities = await db.getUserActivities(userId, 50)

    // Get user's preferences
    const user = await db.getUserById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get all videos for recommendation
    const allVideos = await db.getVideos(100)

    // Extract user's viewing patterns
    const viewedVideoIds = activities.filter((a) => a.type === "video_view").map((a) => a.metadata.videoId)

    const viewedVideos = await Promise.all(viewedVideoIds.map((id) => db.getVideoById(id)))

    // Extract categories and tags from viewed videos
    const viewedCategories = new Set<string>()
    const viewedTags = new Set<string>()
    const creators = new Set<string>()

    viewedVideos.forEach((video) => {
      if (!video) return
      viewedCategories.add(video.category)
      video.tags.forEach((tag) => viewedTags.add(tag))
      creators.add(video.userId)
    })

    // Score videos based on user preferences and viewing history
    const scoredVideos = allVideos
      .filter((video) => !viewedVideoIds.includes(video.id)) // Filter out already viewed videos
      .map((video) => {
        let score = 0
        const reasons = []

        // Category match
        if (viewedCategories.has(video.category)) {
          score += 0.3
          reasons.push("Based on categories you watch")
        }

        // Tag matches
        const matchingTags = video.tags.filter((tag) => viewedTags.has(tag))
        if (matchingTags.length > 0) {
          score += 0.2 * Math.min(matchingTags.length / 2, 1) // Cap at 0.2
          reasons.push("Based on topics you're interested in")
        }

        // Creator match
        if (creators.has(video.userId)) {
          score += 0.25
          reasons.push("From creators you watch")
        }

        // User preference match
        const preferenceMatches = video.tags.filter((tag) => user.preferences.contentPreferences.includes(tag))
        if (preferenceMatches.length > 0) {
          score += 0.15 * Math.min(preferenceMatches.length / 2, 1) // Cap at 0.15
          reasons.push("Matches your preferences")
        }

        // Popularity boost
        score += Math.min(video.views / 10000, 1) * 0.1 // Max 0.1 for 10,000+ views

        // Recency boost
        const daysSinceCreation = (Date.now() - new Date(video.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        if (daysSinceCreation < 7) {
          score += 0.1 * (1 - daysSinceCreation / 7) // More recent = higher score
          reasons.push("New content")
        }

        return {
          ...video,
          score,
          reason: reasons.length > 0 ? reasons[0] : "Recommended for you",
        }
      })
      .filter((video) => video.score > 0.3) // Only include videos with significant score
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, 10) // Take top 10

    return NextResponse.json(scoredVideos)
  } catch (error) {
    console.error("AI recommendation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
