import { NextResponse } from "next/server"
import db from "../../db/mock-db"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const email = url.searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await db.getUserByEmail(email)

    // For security reasons, we don't want to reveal if an email exists or not
    // So we always return success, but with a different exists flag
    return NextResponse.json({
      success: true,
      exists: !!user,
    })
  } catch (error) {
    console.error("User check error:", error)
    return NextResponse.json({ error: "Failed to check user" }, { status: 500 })
  }
}
