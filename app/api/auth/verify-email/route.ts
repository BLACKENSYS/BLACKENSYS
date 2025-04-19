import { NextResponse } from "next/server"
import db from "../../db/mock-db"

export async function POST(request: Request) {
  try {
    const { token, email } = await request.json()

    if (!token || !email) {
      return NextResponse.json({ error: "Token and email are required" }, { status: 400 })
    }

    // Get user by email
    const user = await db.getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify token
    const verificationToken = await db.getVerificationToken(token, "email_verification")
    if (!verificationToken) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    if (verificationToken.userId !== user.id) {
      return NextResponse.json({ error: "Token does not match user" }, { status: 400 })
    }

    if (verificationToken.expiresAt < new Date()) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 })
    }

    let tokenUsed = false

    // Mark token as used
    if (verificationToken) {
      await db.useVerificationToken(token, "email_verification")
      tokenUsed = true
    }

    if (tokenUsed) {
      // Update user status to active
      await db.updateUser(user.id, { status: "active" })

      // Track activity
      await db.trackActivity({
        userId: user.id,
        type: "email_verification",
        metadata: { success: true },
      })

      return NextResponse.json({
        success: true,
        message: "Email verified successfully",
      })
    } else {
      return NextResponse.json({ error: "Failed to verify email" }, { status: 400 })
    }
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ error: "Failed to verify email" }, { status: 500 })
  }
}
