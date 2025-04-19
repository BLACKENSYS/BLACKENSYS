// Mock database service
// This simulates a database for development and testing purposes

import type { User, Video, Comment, File, Folder, Activity, VerificationToken } from "./schema"

// Mock data storage
const users: User[] = []
const videos: Video[] = []
const comments: Comment[] = []
const files: File[] = []
const folders: Folder[] = []
const activities: Activity[] = []
const verificationTokens: VerificationToken[] = []

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15)
}

// User methods
const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  const user: User = {
    id: generateId(),
    ...userData,
    createdAt: userData.createdAt || new Date(),
    updatedAt: new Date(),
  }
  users.push(user)
  return user
}

const getUserById = async (id: string): Promise<User | null> => {
  return users.find((user) => user.id === id) || null
}

const getUserByEmail = async (email: string): Promise<User | null> => {
  return users.find((user) => user.email === email) || null
}

const updateUser = async (id: string, userData: Partial<User>): Promise<User | null> => {
  const index = users.findIndex((user) => user.id === id)
  if (index === -1) return null

  users[index] = {
    ...users[index],
    ...userData,
    updatedAt: new Date(),
  }

  return users[index]
}

const deleteUser = async (id: string): Promise<boolean> => {
  const index = users.findIndex((user) => user.id === id)
  if (index === -1) return false

  users.splice(index, 1)
  return true
}

// Video methods
const createVideo = async (videoData: Omit<Video, "id">): Promise<Video> => {
  const video: Video = {
    id: generateId(),
    ...videoData,
    createdAt: videoData.createdAt || new Date(),
    updatedAt: new Date(),
  }
  videos.push(video)
  return video
}

const getVideoById = async (id: string): Promise<Video | null> => {
  return videos.find((video) => video.id === id) || null
}

const getVideosByUserId = async (userId: string): Promise<Video[]> => {
  return videos.filter((video) => video.userId === userId)
}

const updateVideo = async (id: string, videoData: Partial<Video>): Promise<Video | null> => {
  const index = videos.findIndex((video) => video.id === id)
  if (index === -1) return null

  videos[index] = {
    ...videos[index],
    ...videoData,
    updatedAt: new Date(),
  }

  return videos[index]
}

const deleteVideo = async (id: string): Promise<boolean> => {
  const index = videos.findIndex((video) => video.id === id)
  if (index === -1) return false

  videos.splice(index, 1)
  return true
}

// Comment methods
const createComment = async (commentData: Omit<Comment, "id">): Promise<Comment> => {
  const comment: Comment = {
    id: generateId(),
    ...commentData,
    createdAt: commentData.createdAt || new Date(),
    updatedAt: new Date(),
  }
  comments.push(comment)
  return comment
}

const getCommentsByVideoId = async (videoId: string): Promise<Comment[]> => {
  return comments.filter((comment) => comment.videoId === videoId)
}

const deleteComment = async (id: string): Promise<boolean> => {
  const index = comments.findIndex((comment) => comment.id === id)
  if (index === -1) return false

  comments.splice(index, 1)
  return true
}

// File methods
const createFile = async (fileData: Omit<File, "id">): Promise<File> => {
  const file: File = {
    id: generateId(),
    ...fileData,
    createdAt: fileData.createdAt || new Date(),
    updatedAt: new Date(),
  }
  files.push(file)
  return file
}

const getFileById = async (id: string): Promise<File | null> => {
  return files.find((file) => file.id === id) || null
}

const getFilesByUserId = async (userId: string): Promise<File[]> => {
  return files.filter((file) => file.userId === userId)
}

const getFilesByFolderId = async (folderId: string): Promise<File[]> => {
  return files.filter((file) => file.folderId === folderId)
}

const updateFile = async (id: string, fileData: Partial<File>): Promise<File | null> => {
  const index = files.findIndex((file) => file.id === id)
  if (index === -1) return null

  files[index] = {
    ...files[index],
    ...fileData,
    updatedAt: new Date(),
  }

  return files[index]
}

const deleteFile = async (id: string): Promise<boolean> => {
  const index = files.findIndex((file) => file.id === id)
  if (index === -1) return false

  files.splice(index, 1)
  return true
}

// Folder methods
const createFolder = async (folderData: Omit<Folder, "id">): Promise<Folder> => {
  const folder: Folder = {
    id: generateId(),
    ...folderData,
    createdAt: folderData.createdAt || new Date(),
    updatedAt: new Date(),
  }
  folders.push(folder)
  return folder
}

const getFolderById = async (id: string): Promise<Folder | null> => {
  return folders.find((folder) => folder.id === id) || null
}

const getFoldersByUserId = async (userId: string): Promise<Folder[]> => {
  return folders.filter((folder) => folder.userId === userId)
}

const getFoldersByParentId = async (parentId: string): Promise<Folder[]> => {
  return folders.filter((folder) => folder.parentId === parentId)
}

const updateFolder = async (id: string, folderData: Partial<Folder>): Promise<Folder | null> => {
  const index = folders.findIndex((folder) => folder.id === id)
  if (index === -1) return null

  folders[index] = {
    ...folders[index],
    ...folderData,
    updatedAt: new Date(),
  }

  return folders[index]
}

const deleteFolder = async (id: string): Promise<boolean> => {
  const index = folders.findIndex((folder) => folder.id === id)
  if (index === -1) return false

  folders.splice(index, 1)
  return true
}

// Activity tracking
const trackActivity = async (activityData: Omit<Activity, "id">): Promise<Activity> => {
  const activity: Activity = {
    id: generateId(),
    ...activityData,
    timestamp: new Date(),
  }
  activities.push(activity)
  return activity
}

const getActivitiesByUserId = async (userId: string): Promise<Activity[]> => {
  return activities.filter((activity) => activity.userId === userId)
}

// Verification tokens
const storeVerificationToken = async (
  userId: string,
  token: string,
  type: string,
  expiresIn: number = 24 * 60 * 60 * 1000, // 24 hours in milliseconds
): Promise<VerificationToken> => {
  const verificationToken: VerificationToken = {
    id: generateId(),
    userId,
    token,
    type,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + expiresIn),
    used: false,
  }
  verificationTokens.push(verificationToken)
  return verificationToken
}

const getVerificationToken = async (token: string, type: string): Promise<VerificationToken | null> => {
  return verificationTokens.find((vt) => vt.token === token && vt.type === type && !vt.used) || null
}

const useVerificationToken = async (token: string, type: string): Promise<boolean> => {
  const index = verificationTokens.findIndex((vt) => vt.token === token && vt.type === type && !vt.used)
  if (index === -1) return false

  verificationTokens[index].used = true
  return true
}

// Initialize with some sample data
const initializeSampleData = () => {
  // Sample users
  createUser({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "1234567890",
    password: "Password123!",
    status: "active",
    createdAt: new Date(),
  })

  createUser({
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "9876543210",
    password: "Password123!",
    status: "active",
    createdAt: new Date(),
  })

  // More sample data can be added as needed
}

// Initialize sample data
initializeSampleData()

// Export all methods
export default {
  // User methods
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,

  // Video methods
  createVideo,
  getVideoById,
  getVideosByUserId,
  updateVideo,
  deleteVideo,

  // Comment methods
  createComment,
  getCommentsByVideoId,
  deleteComment,

  // File methods
  createFile,
  getFileById,
  getFilesByUserId,
  getFilesByFolderId,
  updateFile,
  deleteFile,

  // Folder methods
  createFolder,
  getFolderById,
  getFoldersByUserId,
  getFoldersByParentId,
  updateFolder,
  deleteFolder,

  // Activity tracking
  trackActivity,
  getActivitiesByUserId,

  // Verification tokens
  storeVerificationToken,
  getVerificationToken,
  useVerificationToken,
}
