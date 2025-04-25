// This file defines the database schema for the BLACKENSYS platform

// User model
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password?: string
  role: "user" | "creator" | "business" | "admin" | "super_admin"
  profile_image?: string
  bio?: string
  status: "active" | "suspended" | "pending"
  createdAt: Date
  updatedAt?: Date
  preferences?: {
    contentPreferences: string[]
    notificationSettings: Record<string, boolean>
    privacySettings: Record<string, boolean>
  }
  lastLogin?: Date
  businessProfile?: BusinessProfile
  walletId?: string
  storageUsed: number
  storageLimit: number
}

// Business Profile model
export interface BusinessProfile {
  id: string
  userId: string
  companyName: string
  industry: string
  website?: string
  logo?: string
  description?: string
  contactEmail: string
  contactPhone?: string
  address?: {
    street?: string
    city?: string
    state?: string
    country: string
    postalCode?: string
  }
  taxId?: string
  verificationStatus: "pending" | "verified" | "rejected"
  createdAt: Date
  updatedAt?: Date
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
  status: "processing" | "published" | "private" | "unlisted" | "removed"
  category: string
  tags: string[]
  monetizationEnabled: boolean
  adBreaks?: number[]
  createdAt?: Date
  updatedAt?: Date
  analytics?: VideoAnalytics
}

// Video Analytics model
export interface VideoAnalytics {
  videoId: string
  totalViews: number
  uniqueViewers: number
  averageWatchTime: number
  completionRate: number
  engagementRate: number
  demographics: {
    ageGroups: Record<string, number>
    genders: Record<string, number>
    countries: Record<string, number>
  }
  viewsOverTime: Array<{
    date: string
    views: number
  }>
  referrers: Record<string, number>
  devices: Record<string, number>
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
  status: "active" | "hidden" | "flagged"
}

// File model
export interface File {
  id: string
  userId: string
  name: string
  type: string
  mimeType: string
  size: number
  url: string
  folderId?: string
  isShared: boolean
  sharedWith: Array<{
    userId?: string
    email?: string
    permission: "view" | "edit"
    expiresAt?: Date
  }>
  isEncrypted: boolean
  encryptionKey?: string
  thumbnailUrl?: string
  createdAt: string
  updatedAt: string
  lastAccessed?: string
  version: number
  previousVersions?: string[]
}

// Folder model
export interface Folder {
  id: string
  userId: string
  name: string
  parentId?: string
  path: string
  isShared: boolean
  sharedWith: Array<{
    userId?: string
    email?: string
    permission: "view" | "edit"
    expiresAt?: Date
  }>
  color?: string
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
  contentType: "video" | "creator" | "ad"
  score: number
  reason: string
  timestamp: Date
}

// VerificationToken model
export interface VerificationToken {
  id: string
  userId: string
  token: string
  type: "email" | "password-reset" | "two-factor"
  createdAt: Date
  expiresAt: Date
  used: boolean
}

// Wallet model
export interface Wallet {
  id: string
  userId: string
  balance: number
  currency: string
  transactions: Transaction[]
  createdAt: Date
  updatedAt: Date
  status: "active" | "suspended" | "closed"
}

// Transaction model
export interface Transaction {
  id: string
  walletId: string
  amount: number
  type: "deposit" | "withdrawal" | "ad_spend" | "earnings" | "refund"
  status: "pending" | "completed" | "failed" | "cancelled"
  description: string
  metadata: Record<string, any>
  createdAt: Date
  updatedAt?: Date
}

// Ad Campaign model
export interface AdCampaign {
  id: string
  userId: string
  name: string
  status: "draft" | "pending_approval" | "active" | "paused" | "completed" | "rejected"
  budget: {
    total: number
    daily: number
    spent: number
    currency: string
  }
  targeting: {
    ageRange?: {
      min: number
      max: number
    }
    genders?: string[]
    locations?: string[]
    interests?: string[]
    keywords?: string[]
    devices?: string[]
  }
  schedule: {
    startDate: Date
    endDate?: Date
    timeZone: string
    dayParting?: Record<string, boolean>
  }
  creatives: AdCreative[]
  performance?: {
    impressions: number
    clicks: number
    ctr: number
    conversions: number
    costPerClick: number
    costPerMille: number
    costPerConversion: number
  }
  createdAt: Date
  updatedAt?: Date
}

// Ad Creative model
export interface AdCreative {
  id: string
  campaignId: string
  type: "image" | "video" | "carousel"
  title: string
  description?: string
  mediaUrl: string
  thumbnailUrl?: string
  callToAction: {
    text: string
    url: string
  }
  status: "pending_review" | "approved" | "rejected"
  rejectionReason?: string
  performance?: {
    impressions: number
    clicks: number
    ctr: number
  }
  createdAt: Date
  updatedAt?: Date
}

// Analytics model
export interface Analytics {
  userId: string
  period: "daily" | "weekly" | "monthly" | "yearly"
  date: string
  metrics: {
    views: number
    likes: number
    comments: number
    shares: number
    followers: number
    storageUsed: number
    earnings: number
    adSpend?: number
    adImpressions?: number
    adClicks?: number
  }
}

// Subscription model
export interface Subscription {
  id: string
  userId: string
  plan: "free" | "premium" | "business" | "enterprise"
  status: "active" | "cancelled" | "expired" | "trial"
  startDate: Date
  endDate: Date
  autoRenew: boolean
  paymentMethod?: string
  price: number
  currency: string
  features: string[]
  createdAt: Date
  updatedAt?: Date
}

// Report model
export interface Report {
  id: string
  reporterId: string
  targetType: "video" | "comment" | "user" | "ad"
  targetId: string
  reason: string
  description?: string
  status: "pending" | "reviewed" | "resolved" | "dismissed"
  adminNotes?: string
  createdAt: Date
  updatedAt?: Date
  reviewedBy?: string
  reviewedAt?: Date
}

// Notification model
export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  read: boolean
  actionUrl?: string
  metadata?: Record<string, any>
  createdAt: Date
}

// System Settings model
export interface SystemSettings {
  key: string
  value: any
  description: string
  category: string
  isPublic: boolean
  updatedBy: string
  updatedAt: Date
}

// Audit Log model
export interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId?: string
  details: Record<string, any>
  ipAddress?: string
  userAgent?: string
  timestamp: Date
}
