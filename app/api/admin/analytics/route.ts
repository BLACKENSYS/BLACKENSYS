import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Get query parameters
  const url = new URL(request.url)
  const period = url.searchParams.get("period") || "week" // day, week, month, year

  // Mock data for demonstration
  const stats = {
    storage: {
      totalStorage: 1024 * 1024 * 1024 * 100, // 100 GB
      usedStorage: 1024 * 1024 * 1024 * 25, // 25 GB
      videoStorage: 1024 * 1024 * 1024 * 18, // 18 GB
      fileStorage: 1024 * 1024 * 1024 * 7, // 7 GB
    },
    users: {
      total: 125,
      active: 98,
      new: 15,
      premium: 42,
      free: 83,
    },
    content: {
      totalVideos: 342,
      totalFiles: 1256,
      newVideos: 24,
      newFiles: 87,
    },
    activity: {
      dailyActiveUsers: [
        { date: "2023-04-04", count: 65 },
        { date: "2023-04-05", count: 72 },
        { date: "2023-04-06", count: 68 },
        { date: "2023-04-07", count: 74 },
        { date: "2023-04-08", count: 82 },
        { date: "2023-04-09", count: 76 },
        { date: "2023-04-10", count: 78 },
      ],
      videoUploads: [
        { date: "2023-04-04", count: 18 },
        { date: "2023-04-05", count: 22 },
        { date: "2023-04-06", count: 19 },
        { date: "2023-04-07", count: 25 },
        { date: "2023-04-08", count: 20 },
        { date: "2023-04-09", count: 21 },
        { date: "2023-04-10", count: 24 },
      ],
      newRegistrations: [
        { date: "2023-04-04", count: 12 },
        { date: "2023-04-05", count: 18 },
        { date: "2023-04-06", count: 15 },
        { date: "2023-04-07", count: 20 },
        { date: "2023-04-08", count: 16 },
        { date: "2023-04-09", count: 14 },
        { date: "2023-04-10", count: 15 },
      ],
    },
    performance: {
      averageResponseTime: 120, // ms
      errorRate: 0.8, // percentage
      serverLoad: 42, // percentage
    },
  }

  return NextResponse.json(stats)
}
