import { NextResponse } from "next/server"

// Mock user activity data
const userActivity = {
  recentActivity: [
    {
      id: "1",
      userId: "1",
      userName: "Rahul Sharma",
      action: "upload",
      target: "Introduction to BLACKENSYS",
      targetId: "1",
      timestamp: "2023-04-09T10:30:00Z",
    },
    {
      id: "2",
      userId: "2",
      userName: "Priya Patel",
      action: "comment",
      target: "Cloud Storage Tutorial",
      targetId: "2",
      timestamp: "2023-04-09T11:15:00Z",
    },
    {
      id: "3",
      userId: "1",
      userName: "Rahul Sharma",
      action: "like",
      target: "How to Create a Channel",
      targetId: "3",
      timestamp: "2023-04-09T12:45:00Z",
    },
    {
      id: "4",
      userId: "3",
      userName: "Amit Kumar",
      action: "share",
      target: "Introduction to BLACKENSYS",
      targetId: "1",
      timestamp: "2023-04-09T14:20:00Z",
    },
    {
      id: "5",
      userId: "2",
      userName: "Priya Patel",
      action: "upload",
      target: "Cloud Storage Tutorial",
      targetId: "2",
      timestamp: "2023-04-08T14:20:00Z",
    },
  ],
  activityByType: {
    uploads: 25,
    views: 1234,
    likes: 345,
    comments: 123,
    shares: 67,
  },
  activityByTime: {
    morning: 35, // percentage
    afternoon: 45, // percentage
    evening: 15, // percentage
    night: 5, // percentage
  },
  activityByDay: {
    monday: 15, // percentage
    tuesday: 18, // percentage
    wednesday: 20, // percentage
    thursday: 22, // percentage
    friday: 15, //percentage
    saturday: 5, // percentage
    sunday: 5, // percentage
  },
}

export async function GET() {
  try {
    return NextResponse.json({ userActivity })
  } catch (error) {
    console.error("Error fetching user activity:", error)
    return NextResponse.json({ error: "Failed to fetch user activity" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In a real app, you would validate and save the activity to a database
    const newActivity = {
      id: String(userActivity.recentActivity.length + 1),
      ...body,
      timestamp: new Date().toISOString(),
    }

    // For demo purposes, we'll just return the new activity
    return NextResponse.json({ activity: newActivity })
  } catch (error) {
    console.error("Error creating activity:", error)
    return NextResponse.json({ error: "Failed to create activity" }, { status: 500 })
  }
}
