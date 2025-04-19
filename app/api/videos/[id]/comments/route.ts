import { type NextRequest, NextResponse } from "next/server"
import db from "../../../db/mock-db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const videoId = params.id

    // Check if video exists
    const video = await db.getVideoById(videoId)
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    // Get comments for the video
    const comments = await db.getCommentsByVideoId(videoId)

    return NextResponse.json(comments)
  } catch (error) {
    console.error("Get comments error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const videoId = params.id
    const { userId, text, parentId } = await request.json()

    // Validate input
    if (!userId || !text) {
      return NextResponse.json({ error: "UserId and text are required" }, { status: 400 })
    }

    // Check if video exists
    const video = await db.getVideoById(videoId)
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    // Create new comment
    const newComment = await db.createComment({
      videoId,
      userId,
      text,
      likes: 0,
      parentId,
    })

    // Update comment count on video
    await db.updateVideo(videoId, { comments: video.comments + 1 })

    // Track comment activity
    await db.trackActivity({
      userId,
      type: "video_comment",
      metadata: { videoId, commentId: newComment.id },
      ipAddress: request.headers.get("x-forwarded-for") || undefined,

      userAgent: request.headers.get("user-agent") || undefined,
    })

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    console.error("Create comment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
