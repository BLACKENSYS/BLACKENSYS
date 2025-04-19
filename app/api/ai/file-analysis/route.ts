import { type NextRequest, NextResponse } from "next/server"
import db from "../../db/mock-db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "UserId is required" }, { status: 400 })
    }

    // Get user's files
    const files = await db.getFilesByUserId(userId)

    // Aggregate file data
    const fileTypes = files.reduce(
      (acc, file) => {
        const type = file.type
        if (!acc[type]) {
          acc[type] = {
            count: 0,
            totalSize: 0,
            files: [],
          }
        }

        acc[type].count++
        acc[type].totalSize += file.size
        acc[type].files.push({
          id: file.id,
          name: file.name,
          size: file.size,
          createdAt: file.createdAt,
        })

        return acc
      },
      {} as Record<
        string,
        { count: number; totalSize: number; files: { id: string; name: string; size: number; createdAt: string }[] }
      >,
    )

    // Calculate storage usage by time period
    const now = new Date()
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())

    const storageByTime = {
      last30Days: 0,
      last90Days: 0,
      last180Days: 0,
      older: 0,
    }

    files.forEach((file) => {
      const createdAt = new Date(file.createdAt)

      if (createdAt >= oneMonthAgo) {
        storageByTime.last30Days += file.size
      } else if (createdAt >= threeMonthsAgo) {
        storageByTime.last90Days += file.size
      } else if (createdAt >= sixMonthsAgo) {
        storageByTime.last180Days += file.size
      } else {
        storageByTime.older += file.size
      }
    })

    // Find duplicate files (based on name and size)
    const potentialDuplicates: Record<
      string,
      { count: number; files: { id: string; name: string; size: number; createdAt: string }[] }
    > = {}

    files.forEach((file) => {
      const key = `${file.name}-${file.size}`
      if (!potentialDuplicates[key]) {
        potentialDuplicates[key] = {
          count: 0,
          files: [],
        }
      }

      potentialDuplicates[key].count++
      potentialDuplicates[key].files.push({
        id: file.id,
        name: file.name,
        size: file.size,
        createdAt: file.createdAt,
      })
    })

    const duplicates = Object.values(potentialDuplicates)
      .filter((dup) => dup.count > 1)
      .sort((a, b) => b.count - a.count)

    // Find large files that could be optimized
    const largeFiles = files
      .filter((file) => {
        if (file.type === "video" && file.size > 100 * 1024 * 1024) return true // Videos > 100MB
        if (file.type === "image" && file.size > 5 * 1024 * 1024) return true // Images > 5MB
        if (file.type === "document" && file.size > 20 * 1024 * 1024) return true // Documents > 20MB
        return false
      })
      .map((file) => ({
        id: file.id,
        name: file.name,
        type: file.type,
        size: file.size,
        createdAt: file.createdAt,
      }))
      .sort((a, b) => b.size - a.size)

    // Generate insights
    const insights = []

    // Storage distribution insight
    insights.push({
      type: "storage_distribution",
      title: "Storage Distribution",
      description: "See how your storage is distributed across different file types",
      data: Object.entries(fileTypes).map(([type, data]) => ({
        type,
        count: data.count,
        size: data.totalSize,
        percentage: (data.totalSize / files.reduce((acc, file) => acc + file.size, 0)) * 100,
      })),
    })

    // Duplicate files insight
    if (duplicates.length > 0) {
      insights.push({
        type: "duplicate_files",
        title: "Potential Duplicate Files",
        description: `Found ${duplicates.reduce((acc, dup) => acc + dup.count, 0)} potential duplicate files`,
        data: duplicates,
      })
    }

    // Large files insight
    if (largeFiles.length > 0) {
      insights.push({
        type: "large_files",
        title: "Large Files",
        description: `Found ${largeFiles.length} large files that could be optimized`,
        data: largeFiles,
      })
    }

    // Storage growth insight
    insights.push({
      type: "storage_growth",
      title: "Storage Growth",
      description: "See how your storage usage has grown over time",
      data: storageByTime,
    })

    return NextResponse.json({
      fileTypes,
      storageByTime,
      duplicates,
      largeFiles,
      insights,
    })
  } catch (error) {
    console.error("File analysis error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
