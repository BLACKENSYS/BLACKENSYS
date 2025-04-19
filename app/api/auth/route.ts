import { type NextRequest, NextResponse } from "next/server"
import db from "../db/mock-db"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = await db.getUserByEmail(email)

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Update last login time
    await db.updateUser(user.id, { lastLogin: new Date() })

    // Track login activity
    await db.trackActivity({
      userId: user.id,
      type: "login",
      metadata: { success: true },
      ipAddress: request.headers.get("x-forwarded-for") || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
    })

    // In a real app, you would generate a JWT token here
    const token = `mock-jwt-token-${user.id}`

    // Return user data (excluding password) and token
    const { password: _, ...userData } = user

    return NextResponse.json({
      user: userData,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
