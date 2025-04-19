// This file defines the database schema for the BLACKENSYS platform

// User model
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password?: string
  role?: string
  profile_image?: string
  bio?: string
  status: "active" | "suspended" | "pending"
  createdAt: Date
  updatedAt?: Date
  preferences?: {
    contentPreferences: string[]
  }
  lastLogin?: Date
}

// Video model
export interface Video {
  id: string
  title: string
  description?: string
  userId: string
  userName: string
  uploadDate: string
  duration: number
  views: number
  likes: number
  comments: number
  shares: number
  thumbnailUrl: string
  url: string
  status: string
  category: string
  tags: string[]
  createdAt?: Date
  updatedAt?: Date
}

// Comment model
export interface Comment {
  id: string
  videoId: string
  userId: string
  text: string
  likes: number
  parentId?: string
  createdAt?: Date
  updatedAt?: Date
}

// File model
export interface File {
  id: string
  userId: string
  name: string
  type: string
  size: number
  url: string
  folderId?: string
  isShared: boolean
  sharedWith: string[]
  createdAt: string
  updatedAt: string
}

// Folder model
export interface Folder {
  id: string
  userId: string
  name: string
  parentId?: string
  createdAt?: Date
  updatedAt?: Date
}

// Activity model
export interface Activity {
  id: string
  userId: string
  type: string
  metadata: Record<string, any>
  timestamp: Date
  ipAddress?: string
  userAgent?: string
}

// Recommendation model
export interface Recommendation {
  userId: string
  contentId: string
  contentType: string
  score: number
  reason: string
  timestamp: Date
}

// VerificationToken model
export interface VerificationToken {
  id: string
  userId: string
  token: string
  type: string
  createdAt: Date
  expiresAt: Date
  used: boolean
}
