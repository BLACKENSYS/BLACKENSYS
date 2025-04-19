import { NextResponse } from "next/server"

// Mock user data
const users = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    status: "active",
    joined: "2023-04-09T10:30:00Z",
    plan: "Creator",
    storage: {
      used: 1.2, // GB
      total: 10, // GB
    },
    videos: 12,
    subscribers: 45,
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@example.com",
    status: "pending",
    joined: "2023-04-08T14:20:00Z",
    plan: "Basic",
    storage: {
      used: 0.5, // GB
      total: 2, // GB
    },
    videos: 3,
    subscribers: 12,
  },
  // Add more mock users as needed
]

export async function GET() {
  try {
    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In a real app, you would validate and save the user to a database
    const newUser = {
      id: String(users.length + 1),
      ...body,
      joined: new Date().toISOString(),
      status: "pending",
      storage: {
        used: 0,
        total: body.plan === "Creator" ? 10 : 2,
      },
      videos: 0,
      subscribers: 0,
    }

    // For demo purposes, we'll just return the new user
    return NextResponse.json({ user: newUser })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
