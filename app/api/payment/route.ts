import { NextResponse } from "next/server"
import crypto from "crypto"
import { RAZORPAY_KEY_SECRET } from "../../razorpay-integration"

// Mock database for orders
const orders = new Map()

export async function POST(request: Request) {
  try {
    const { amount, currency = "INR" } = await request.json()

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 })
    }

    // In a real app, you would use the Razorpay API to create an order
    // For this demo, we'll create a mock order
    const orderId = `order_${Date.now()}`

    // Store order details
    orders.set(orderId, {
      id: orderId,
      amount,
      currency,
      status: "created",
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      orderId,
      amount,
      currency,
    })
  } catch (error) {
    console.error("Payment error:", error)
    return NextResponse.json({ error: "Failed to process payment" }, { status: 500 })
  }
}

// Verify Razorpay payment
export async function PUT(request: Request) {
  try {
    const { paymentId, orderId, signature } = await request.json()

    if (!paymentId || !orderId || !signature) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get order details
    const order = orders.get(orderId)
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Verify signature
    const text = `${orderId}|${paymentId}`
    const expectedSignature = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET).update(text).digest("hex")

    const isSignatureValid = expectedSignature === signature

    if (!isSignatureValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Update order status
    order.status = "paid"
    order.paymentId = paymentId
    order.updatedAt = new Date().toISOString()
    orders.set(orderId, order)

    return NextResponse.json({
      success: true,
      verified: true,
      order,
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
