import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Check file size (5MB limit for this example)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds the 5MB limit" }, { status: 400 })
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "File type not supported. Please upload a JPEG, PNG, GIF, or WebP image." },
        { status: 400 },
      )
    }

    // In a real application, this would upload the file to a storage service
    // and save the metadata in the database

    // For demonstration, we'll just return a success response with mock data
    const fileName = file.name
    const fileSize = file.size
    const fileType = file.type
    const uploadDate = new Date().toISOString()
    const fileUrl = `/uploads/${fileName}` // This would be the actual URL in production

    return NextResponse.json(
      {
        id: "new-upload-id",
        fileName,
        fileSize,
        fileType,
        uploadDate,
        fileUrl,
        usedOn: formData.get("usedOn") || null,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to process upload" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Mock data for demonstration
  const uploads = [
    {
      id: "1",
      fileName: "homepage-banner-1.jpg",
      fileSize: 1258291, // ~1.2 MB
      fileType: "image/jpeg",
      uploadDate: "2023-04-08T10:30:00Z",
      fileUrl: "/uploads/homepage-banner-1.jpg",
      usedOn: "Homepage",
    },
    {
      id: "2",
      fileName: "feature-cloud.jpg",
      fileSize: 839168, // ~0.8 MB
      fileType: "image/jpeg",
      uploadDate: "2023-04-05T14:20:00Z",
      fileUrl: "/uploads/feature-cloud.jpg",
      usedOn: "Features Page",
    },
    // More uploads would be here
  ]

  // Get query parameters
  const url = new URL(request.url)
  const search = url.searchParams.get("search") || ""
  const fileType = url.searchParams.get("fileType")
  const usedOn = url.searchParams.get("usedOn")
  const limit = Number.parseInt(url.searchParams.get("limit") || "10")
  const page = Number.parseInt(url.searchParams.get("page") || "1")

  // Filter uploads based on query parameters
  let filteredUploads = uploads

  if (search) {
    filteredUploads = filteredUploads.filter((upload) => upload.fileName.toLowerCase().includes(search.toLowerCase()))
  }

  if (fileType) {
    filteredUploads = filteredUploads.filter((upload) => upload.fileType === fileType)
  }

  if (usedOn) {
    filteredUploads = filteredUploads.filter((upload) => upload.usedOn === usedOn)
  }

  // Paginate results
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const paginatedUploads = filteredUploads.slice(startIndex, endIndex)

  return NextResponse.json({
    uploads: paginatedUploads,
    total: filteredUploads.length,
    page,
    limit,
    totalPages: Math.ceil(filteredUploads.length / limit),
  })
}

export async function DELETE(request: NextRequest) {
  // Get upload ID from query parameters
  const url = new URL(request.url)
  const id = url.searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Missing upload ID" }, { status: 400 })
  }

  // In a real application, this would delete the file from storage
  // and remove the metadata from the database

  // For demonstration, we'll just return a success response
  return NextResponse.json({ success: true })
}
