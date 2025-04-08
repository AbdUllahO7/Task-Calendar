import { CheckCircle2, MessageSquare, AlertCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "task" | "reminder" | "update" | "comment"
}

interface NotificationItemProps {
  notification: Notification
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { title, description, time, read, type } = notification

  const getIcon = () => {
    switch (type) {
      case "task":
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />
      case "reminder":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "update":
        return <AlertCircle className="h-5 w-5 text-emerald-500" />
      case "comment":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className={cn("flex gap-3 p-3 hover:bg-muted/50 transition-colors", !read && "bg-muted/30")}>
      <div className="flex-shrink-0 mt-1">{getIcon()}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between">
          <p className={cn("text-sm font-medium", !read && "font-semibold")}>{title}</p>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
