import { type NextRequest, NextResponse } from "next/server"

// This would be replaced with actual database queries in a real application
export async function GET(request: NextRequest) {
  // Mock data for demonstration
  const users = [
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "premium",
      status: "active",
      createdAt: "2023-01-15T10:30:00Z",
      lastLogin: "2023-04-10T14:25:00Z",
      storageUsed: 1024 * 1024 * 500, // 500 MB
      totalVideos: 12,
    },
    {
      id: "2",
      name: "Priya Patel",
      email: "priya@example.com",
      role: "free",
      status: "active",
      createdAt: "2023-02-20T09:15:00Z",
      lastLogin: "2023-04-09T11:45:00Z",
      storageUsed: 1024 * 1024 * 120, // 120 MB
      totalVideos: 5,
    },
    // More users would be here
  ]

  // Get query parameters
  const url = new URL(request.url)
  const search = url.searchParams.get("search") || ""
  const status = url.searchParams.get("status")
  const role = url.searchParams.get("role")
  const limit = Number.parseInt(url.searchParams.get("limit") || "10")
  const page = Number.parseInt(url.searchParams.get("page") || "1")

  // Filter users based on query parameters
  let filteredUsers = users

  if (search) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    )
  }

  if (status) {
    filteredUsers = filteredUsers.filter((user) => user.status === status)
  }

  if (role) {
    filteredUsers = filteredUsers.filter((user) => user.role === role)
  }

  // Paginate results
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  return NextResponse.json({
    users: paginatedUsers,
    total: filteredUsers.length,
    page,
    limit,
    totalPages: Math.ceil(filteredUsers.length / limit),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, this would create a new user in the database
    // For demonstration, we'll just return a success response

    return NextResponse.json(
      {
        id: "new-user-id",
        name: body.name,
        email: body.email,
        role: body.role || "free",
        status: "active",
        createdAt: new Date().toISOString(),
        lastLogin: null,
        storageUsed: 0,
        totalVideos: 0,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 })
    }

    // In a real application, this would update the user in the database
    // For demonstration, we'll just return a success response

    return NextResponse.json({
      id: body.id,
      name: body.name,
      email: body.email,
      role: body.role,
      status: body.status,
      // Other fields would be preserved from the database
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  // Get user ID from query parameters
  const url = new URL(request.url)
  const id = url.searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 })
  }

  // In a real application, this would delete or deactivate the user in the database
  // For demonstration, we'll just return a success response

  return NextResponse.json({ success: true })
}
