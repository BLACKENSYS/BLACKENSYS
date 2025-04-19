import { NextResponse } from "next/server"
import db from "../../db/mock-db"
import { sendEmail, generateVerificationToken } from "../../../services/email-service"

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, password } = await request.json()

    // Validate input
    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if email already exists
    const existingUser = await db.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Create user
    const user = await db.createUser({
      firstName,
      lastName,
      email,
      phone,
      password, // In a real app, this would be hashed
      status: "pending",
      createdAt: new Date(),
    })

    // Generate verification token
    const token = generateVerificationToken()

    // Store token (in a real app, this would be in a database)
    await db.storeVerificationToken(user.id, token, "email_verification")

    // Send verification email
    await sendEmail({
      to: email,
      subject: "Verify Your Email Address",
      template: "verification",
      data: {
        name: `${firstName} ${lastName}`,
        verificationLink: `${request.headers.get("origin") || "http://localhost:3000"}/verify-email?token=${token}&email=${encodeURIComponent(email)}`,
      },
    })

    // Send welcome email
    await sendEmail({
      to: email,
      subject: "Welcome to BLACKENSYS",
      template: "welcome",
      data: {
        name: `${firstName} ${lastName}`,
      },
    })

    // Return user data (excluding password)
    const { password: _, ...userData } = user

    return NextResponse.json({
      success: true,
      user: userData,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}
