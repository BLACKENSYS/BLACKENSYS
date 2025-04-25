"use client"

import { useState } from "react"
import { Bell, Check, Trash2, Settings, MessageSquare, Heart, User, Film } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    type: "comment",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    title: "New Comment",
    message: "John Doe commented on your video: 'Great content! Keep it up!'",
    icon: <MessageSquare className="h-4 w-4" />,
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32&text=JD",
    },
    link: "/watch/video-1",
  },
  {
    id: "2",
    type: "like",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    title: "New Like",
    message: "Sarah Smith liked your video 'How to Create Amazing Videos'",
    icon: <Heart className="h-4 w-4" />,
    user: {
      name: "Sarah Smith",
      avatar: "/placeholder.svg?height=32&width=32&text=SS",
    },
    link: "/watch/video-2",
  },
  {
    id: "3",
    type: "subscriber",
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    title: "New Subscriber",
    message: "Mike Johnson subscribed to your channel",
    icon: <User className="h-4 w-4" />,
    user: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32&text=MJ",
    },
    link: "/channel/user-3",
  },
  {
    id: "4",
    type: "upload",
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    title: "Upload Complete",
    message: "Your video 'Cloud Storage Tutorial' has been processed and is now live",
    icon: <Film className="h-4 w-4" />,
    link: "/watch/video-4",
  },
  {
    id: "5",
    type: "system",
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    title: "Storage Alert",
    message: "You've used 80% of your storage quota. Consider upgrading your plan.",
    icon: <Bell className="h-4 w-4" />,
    link: "/account/storage",
  },
]

// Format timestamp
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) {
    return "Just now"
  } else if (diffMin < 60) {
    return `${diffMin}m ago`
  } else if (diffHour < 24) {
    return `${diffHour}h ago`
  } else if (diffDay === 1) {
    return "Yesterday"
  } else {
    return `${diffDay}d ago`
  }
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  // Mark single notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    if (activeTab === "all") {
      return notifications
    } else if (activeTab === "unread") {
      return notifications.filter((n) => !n.read)
    } else {
      return notifications.filter((n) => n.type === activeTab)
    }
  }

  const filteredNotifications = getFilteredNotifications()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between p-4 pb-2">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={markAllAsRead}>
                <Check className="h-3 w-3 mr-1" />
                Mark all as read
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Notification settings</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-4">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                All
                {unreadCount > 0 && <Badge className="ml-1 h-5 px-1">{notifications.length}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Unread
                {unreadCount > 0 && <Badge className="ml-1 h-5 px-1">{unreadCount}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="comment" className="flex-1">
                <MessageSquare className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="like" className="flex-1">
                <Heart className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </div>

          <Separator className="my-2" />

          <ScrollArea className="h-[300px]">
            <TabsContent value={activeTab} className="m-0">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <Bell className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">No notifications</p>
                  <p className="text-xs text-muted-foreground">
                    {activeTab === "unread"
                      ? "You've read all your notifications"
                      : "You don't have any notifications yet"}
                  </p>
                </div>
              ) : (
                <div className="space-y-1 p-1">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-3 p-3 rounded-md transition-colors ${
                        notification.read ? "hover:bg-muted/50" : "bg-muted/50 hover:bg-muted"
                      }`}
                      onClick={() => {
                        if (!notification.read) {
                          markAsRead(notification.id)
                        }
                        // In a real app, this would navigate to the notification link
                        setOpen(false)
                      }}
                    >
                      {notification.user ? (
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={notification.user.avatar || "/placeholder.svg"}
                            alt={notification.user.name}
                          />
                          <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          {notification.icon}
                        </div>
                      )}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </ScrollArea>

          <div className="p-2 text-center">
            <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
              <a href="/notifications">View all notifications</a>
            </Button>
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
