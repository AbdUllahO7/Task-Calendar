"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationItem } from "@/components/notifications/notification-item"

// Mock notification data
const notifications = [
  {
    id: "1",
    title: "New task assigned",
    description: "You have been assigned a new task: 'Complete project proposal'",
    time: "2 hours ago",
    read: false,
    type: "task",
  },
  {
    id: "2",
    title: "Meeting reminder",
    description: "Team meeting in 30 minutes",
    time: "30 minutes ago",
    read: false,
    type: "reminder",
  },
  {
    id: "3",
    title: "Project update",
    description: "Website redesign project is 75% complete",
    time: "1 day ago",
    read: true,
    type: "update",
  },
  {
    id: "4",
    title: "Comment on task",
    description: "John commented on 'Design homepage mockup'",
    time: "2 days ago",
    read: true,
    type: "comment",
  },
  {
    id: "5",
    title: "Deadline approaching",
    description: "Task 'Finalize budget report' is due tomorrow",
    time: "3 days ago",
    read: true,
    type: "reminder",
  },
]

export function NotificationsPopover() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = activeTab === "all" ? notifications : notifications.filter((n) => !n.read)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between border-b px-3 py-2">
            <h4 className="font-semibold">Notifications</h4>
            <TabsList className="grid w-32 grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="m-0">
            <ScrollArea className="h-[300px]">
              {filteredNotifications.length > 0 ? (
                <div>
                  {filteredNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              ) : (
                <div className="flex h-[300px] items-center justify-center">
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <ScrollArea className="h-[300px]">
              {filteredNotifications.length > 0 ? (
                <div>
                  {filteredNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              ) : (
                <div className="flex h-[300px] items-center justify-center">
                  <p className="text-sm text-muted-foreground">No unread notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <div className="border-t p-2">
            <Button variant="ghost" size="sm" className="w-full justify-center">
              Mark all as read
            </Button>
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
