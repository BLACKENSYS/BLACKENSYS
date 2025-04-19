import { type NextRequest, NextResponse } from "next/server"
import db from "../db/mock-db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const parentId = searchParams.get("parentId")

    if (!userId) {
      return NextResponse.json({ error: "UserId is required" }, { status: 400 })
    }

    let folders
    if (parentId) {
      folders = await db.getFoldersByParentId(parentId)
    } else {
      folders = await db.getFoldersByUserId(userId)
    }

    return NextResponse.json(folders)
  } catch (error) {
    console.error("Get folders error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const folderData = await request.json()

    // Validate input
    if (!folderData.userId || !folderData.name) {
      return NextResponse.json({ error: "UserId and name are required" }, { status: 400 })
    }

    // Create new folder
    const newFolder = await db.createFolder({
      userId: folderData.userId,
      name: folderData.name,
      parentId: folderData.parentId,
    })

    return NextResponse.json(newFolder, { status: 201 })
  } catch (error) {
    console.error("Create folder error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
