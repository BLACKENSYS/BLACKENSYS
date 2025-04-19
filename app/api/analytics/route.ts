import { NextResponse } from "next/server"

// Mock analytics data
const analytics = {
  overview: {
    totalViews: 12345,
    totalLikes: 2345,
    totalComments: 987,
    totalShares: 456,
    averageWatchTime: 120, // seconds
  },
  demographics: {
    age: [
      { group: "13-17", percentage: 5 },
      { group: "18-24", percentage: 25 },
      { group: "25-34", percentage: 40 },
      { group: "35-44", percentage: 20 },
      { group: "45-54", percentage: 7 },
      { group: "55+", percentage: 3 },
    ],
    gender: [
      { group: "Male", percentage: 65 },
      { group: "Female", percentage: 32 },
      { group: "Other", percentage: 3 },
    ],
    location: [
      { country: "India", percentage: 75 },
      { country: "United States", percentage: 10 },
      { country: "United Kingdom", percentage: 5 },
      { country: "Canada", percentage: 3 },
      { country: "Australia", percentage: 2 },
      { country: "Other", percentage: 5 },
    ],
  },
  content: {
    topVideos: [
      { id: "1", title: "Introduction to BLACKENSYS", views: 156 },
      { id: "3", title: "How to Create a Channel", views: 243 },
      { id: "2", title: "Cloud Storage Tutorial", views: 89 },
    ],
    viewsByDay: [
      { date: "2023-04-03", views: 120 },
      { date: "2023-04-04", views: 145 },
      { date: "2023-04-05", views: 132 },
      { date: "2023-04-06", views: 167 },
      { date: "2023-04-07", views: 189 },
      { date: "2023-04-08", views: 210 },
      { date: "2023-04-09", views: 198 },
    ],
  },
  engagement: {
    likeRatio: 0.85, // 85% like ratio
    commentRatio: 0.12, // 12% comment ratio
    shareRatio: 0.05, // 5% share ratio
    averageEngagementRate: 0.23, // 23% engagement rate
  },
}

export async function GET() {
  try {
    return NextResponse.json({ analytics })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
