import { NextResponse } from "next/server"
import db from "../../db/mock-db"

export async function POST(request: Request) {
  try {
    const { token, email, password } = await request.json()

    if (!token || !email || !password) {
      return NextResponse.json({ error: "Token, email, and password are required" }, { status: 400 })
    }

    // Get user by email
    const user = await db.getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify token
    const verificationToken = await db.getVerificationToken(token, "password_reset")
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
    if (verificationToken) {
      if (verificationToken.userId === user.id && verificationToken.expiresAt >= new Date()) {
        // Mark token as used
        await db.useVerificationToken(token, "password_reset")
        tokenUsed = true
      }
    }

    if (!tokenUsed && verificationToken) {
      await db.useVerificationToken(token, "password_reset")
    }

    // Update user password
    await db.updateUser(user.id, { password })

    // Track activity
    await db.trackActivity({
      userId: user.id,
      type: "password_reset",
      metadata: { success: true },
    })

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 })
  }
}
