import { type NextRequest, NextResponse } from "next/server"
import db from "../../db/mock-db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const videoId = params.id
    const video = await db.getVideoById(videoId)

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    // Increment view count
    await db.updateVideo(videoId, { views: video.views + 1 })

    // Get user info for the video
    const user = await db.getUserById(video.userId)
    const { password: _, ...userData } = user || { password: "" }

    // Get comments for the video
    const comments = await db.getCommentsByVideoId(videoId)

    // Track view activity if user is authenticated
    const authHeader = request.headers.get("authorization")
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7)
      const userId = token.split("-").pop() // Extract user ID from mock token

      if (userId) {
        await db.trackActivity({
          userId,
          type: "video_view",
          metadata: { videoId },
          ipAddress: request.headers.get("x-forwarded-for") || undefined,
          userAgent: request.headers.get("user-agent") || undefined,
        })
      }
    }

    return NextResponse.json({
      ...video,
      user: userData,
      comments,
    })
  } catch (error) {
    console.error("Get video error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const videoId = params.id
    const videoData = await request.json()

    // Check if video exists
    const existingVideo = await db.getVideoById(videoId)
    if (!existingVideo) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    // Update video
    const updatedVideo = await db.updateVideo(videoId, videoData)

    return NextResponse.json(updatedVideo)
  } catch (error) {
    console.error("Update video error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const videoId = params.id

    // Check if video exists
    const existingVideo = await db.getVideoById(videoId)
    if (!existingVideo) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    // Delete video
    const success = await db.deleteVideo(videoId)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to delete video" }, { status: 500 })
    }
  } catch (error) {
    console.error("Delete video error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
