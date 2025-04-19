import { type NextRequest, NextResponse } from "next/server"
import db from "../db/mock-db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

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

    // Get existing recommendations
    const existingRecommendations = await db.getRecommendationsForUser(userId)

    // Get all videos for recommendation
    const allVideos = await db.getVideos(100)

    // Simple recommendation algorithm based on user activity and preferences
    const videoScores = new Map<string, { score: number; reason: string }>()

    // Score based on user's content preferences
    for (const video of allVideos) {
      if (video.userId === userId) continue // Skip user's own videos

      let score = 0
      let reason = ""

      // Check if video matches user's content preferences
      for (const tag of video.tags) {
        if (user.preferences.contentPreferences.includes(tag)) {
          score += 0.2
          reason = "Based on your interests"
        }
      }

      // Check user's viewing history
      const viewActivities = activities.filter((a) => a.type === "video_view" && a.metadata.videoId !== video.id)

      for (const activity of viewActivities) {
        const viewedVideo = await db.getVideoById(activity.metadata.videoId)
        if (viewedVideo) {
          // Check for common tags
          const commonTags = viewedVideo.tags.filter((tag) => video.tags.includes(tag))
          if (commonTags.length > 0) {
            score += 0.1 * commonTags.length
            reason = "Based on your viewing history"
          }

          // Check for same category
          if (viewedVideo.category === video.category) {
            score += 0.15
            reason = reason || "Based on categories you watch"
          }
        }
      }

      // Popularity boost
      score += (video.views / 10000) * 0.1 // Max 0.1 for 10,000 views

      // Store the score if it's significant
      if (score > 0.3) {
        videoScores.set(video.id, {
          score,
          reason: reason || "Popular content you might like",
        })
      }
    }

    // Convert scores to recommendations
    const recommendations = Array.from(videoScores.entries())
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, 10)
      .map(([contentId, { score, reason }]) => ({
        userId,
        contentId,
        contentType: "video",
        score,
        reason,
        timestamp: new Date(),
      }))

    // Store new recommendations
    for (const rec of recommendations) {
      // Check if recommendation already exists
      const exists = existingRecommendations.some(
        (er) => er.contentId === rec.contentId && er.contentType === rec.contentType,
      )

      if (!exists) {
        await db.addRecommendation(rec)
      }
    }

    // Get videos for the recommendations
    const recommendedVideos = await Promise.all(
      recommendations.map(async (rec) => {
        const video = await db.getVideoById(rec.contentId)
        return {
          ...video,
          recommendationScore: rec.score,
          recommendationReason: rec.reason,
        }
      }),
    )

    return NextResponse.json(recommendedVideos.filter(Boolean))
  } catch (error) {
    console.error("Get recommendations error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
