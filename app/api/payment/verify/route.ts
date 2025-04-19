import { NextResponse } from "next/server"
import crypto from "crypto"
import { RAZORPAY_KEY_SECRET } from "../../../razorpay-integration"

export async function POST(request: Request) {
  try {
    const { paymentId, orderId, signature } = await request.json()

    if (!paymentId || !orderId || !signature) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify signature
    const text = `${orderId}|${paymentId}`
    const expectedSignature = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET).update(text).digest("hex")

    const isSignatureValid = expectedSignature === signature

    if (!isSignatureValid) {
      return NextResponse.json({ error: "Invalid signature", verified: false }, { status: 400 })
    }

    // In a real app, you would update the payment status in your database here

    return NextResponse.json({
      success: true,
      verified: true,
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Failed to verify payment", verified: false }, { status: 500 })
  }
}
