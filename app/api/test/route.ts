import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "success",
    message: "API is working correctly",
    timestamp: new Date().toISOString(),
    endpoints: [
      { path: "/api/test", methods: ["GET", "POST"], description: "Test API endpoint" },
      { path: "/api/users", methods: ["GET", "POST"], description: "User management" },
      { path: "/api/videos", methods: ["GET", "POST"], description: "Video management" },
      { path: "/api/files", methods: ["GET", "POST"], description: "File management" },
      { path: "/api/analytics", methods: ["GET"], description: "Analytics data" },
    ],
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    return NextResponse.json({
      status: "success",
      message: "Test POST request received",
      receivedData: body,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid JSON in request body",
      },
      { status: 400 },
    )
  }
}
