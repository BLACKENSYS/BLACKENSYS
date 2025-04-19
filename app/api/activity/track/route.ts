import { NextResponse } from "next/server"
import db from "../../db/mock-db"

export async function POST(request: Request) {
  try {
    const { userId, activity, details } = await request.json()

    if (!userId || !activity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, this would save to a database
    // For now, we'll use our mock DB
    const activityRecord = await db.trackActivity({
      userId,
      type: activity,
      metadata: details || {},
      ipAddress: details?.ip || "unknown",
      userAgent: details?.userAgent || "unknown",
    })

    return NextResponse.json({ success: true, activity: activityRecord })
  } catch (error) {
    console.error("Error tracking activity:", error)
    return NextResponse.json({ error: "Failed to track activity" }, { status: 500 })
  }
}
