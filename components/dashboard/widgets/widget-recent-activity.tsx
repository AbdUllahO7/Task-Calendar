"use client"

import { format } from "date-fns"
import { CheckCircle2, MessageSquare, PenLine, Plus, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock activity data
const activities = [
  {
    id: "1",
    type: "task_completed",
    user: {
      name: "John Doe",
      image: "/placeholder.svg?height=32&width=32",
    },
    content: "Completed task: Design homepage mockup",
    project: "Website Redesign",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "2",
    type: "comment",
    user: {
      name: "Jane Smith",
      image: "/placeholder.svg?height=32&width=32",
    },
    content: "Commented on: API integration plan",
    project: "Mobile App Development",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
  },
  {
    id: "3",
    type: "task_created",
    user: {
      name: "Bob Johnson",
      image: "/placeholder.svg?height=32&width=32",
    },
    content: "Created task: Prepare social media assets",
    project: "Marketing Campaign",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
  },
  {
    id: "4",
    type: "user_added",
    user: {
      name: "Alice Brown",
      image: "/placeholder.svg?height=32&width=32",
    },
    content: "Added Charlie Davis to project",
    project: "Product Launch",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
]

export function WidgetRecentActivity() {
  // Function to format timestamp
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
    } else {
      return format(timestamp, "MMM d, h:mm a")
    }
  }

  // Function to get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "task_completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "task_created":
        return <Plus className="h-4 w-4 text-purple-500" />
      case "user_added":
        return <UserPlus className="h-4 w-4 text-amber-500" />
      case "task_updated":
        return <PenLine className="h-4 w-4 text-sky-500" />
      default:
        return <CheckCircle2 className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4 h-full">
      <h3 className="font-semibold text-sm">Recent Activity</h3>
      <div className="space-y-4 overflow-auto max-h-[calc(100%-2rem)]">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.user.image} alt={activity.user.name} />
              <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.user.name}</p>
                <span className="text-xs text-muted-foreground">{formatTimestamp(activity.timestamp)}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {getActivityIcon(activity.type)}
                <span>{activity.content}</span>
              </div>
              <p className="text-xs text-muted-foreground">Project: {activity.project}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
