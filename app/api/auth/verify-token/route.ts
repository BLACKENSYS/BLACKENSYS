import { NextResponse } from "next/server"
import db from "../../db/mock-db"

export async function POST(request: Request) {
  try {
    const { token, email, type } = await request.json()

    if (!token || !email || !type) {
      return NextResponse.json({ error: "Token, email, and type are required" }, { status: 400 })
    }

    // Get user by email
    const user = await db.getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify token
    const verificationToken = await db.getVerificationToken(token, type)
    if (!verificationToken) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    if (verificationToken.userId !== user.id) {
      return NextResponse.json({ error: "Token does not match user" }, { status: 400 })
    }

    if (verificationToken.expiresAt < new Date()) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      valid: true,
    })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ error: "Failed to verify token" }, { status: 500 })
  }
}
