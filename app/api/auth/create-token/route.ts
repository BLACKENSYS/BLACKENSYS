import { NextResponse } from "next/server"
import db from "../../db/mock-db"

export async function POST(request: Request) {
  try {
    const { email, token, type, expiresIn = 24 * 60 * 60 * 1000 } = await request.json()

    if (!email || !token || !type) {
      return NextResponse.json({ error: "Email, token, and type are required" }, { status: 400 })
    }

    // Get user by email
    const user = await db.getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Store token
    const verificationToken = await db.storeVerificationToken(user.id, token, type, expiresIn)

    return NextResponse.json({
      success: true,
      token: verificationToken,
    })
  } catch (error) {
    console.error("Token creation error:", error)
    return NextResponse.json({ error: "Failed to create token" }, { status: 500 })
  }
}
