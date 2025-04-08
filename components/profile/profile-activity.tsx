import { format } from "date-fns"
import { CheckCircle2, MessageSquare, PenLine, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock activity data
const activities = [
  {
    id: "1",
    type: "task_completed",
    content: "Completed task: Design homepage mockup",
    project: "Website Redesign",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "2",
    type: "comment",
    content: "Commented on: API integration plan",
    project: "Mobile App Development",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
  },
  {
    id: "3",
    type: "task_created",
    content: "Created task: Prepare social media assets",
    project: "Marketing Campaign",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
  },
  {
    id: "4",
    type: "task_updated",
    content: "Updated task: Research competitor pricing",
    project: "Research Project",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
  },
  {
    id: "5",
    type: "task_completed",
    content: "Completed task: Create wireframes",
    project: "Mobile App Development",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
]

// Mock tasks data
const tasks = [
  {
    id: "1",
    title: "Complete project proposal",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    priority: "high",
    project: "Website Redesign",
    projectColor: "bg-sky-500",
  },
  {
    id: "2",
    title: "Review design mockups",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    priority: "medium",
    project: "Mobile App Development",
    projectColor: "bg-rose-500",
  },
  {
    id: "3",
    title: "Team meeting",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 48), // 2 days from now
    priority: "medium",
    project: "Website Redesign",
    projectColor: "bg-sky-500",
  },
  {
    id: "4",
    title: "Client presentation",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    priority: "high",
    project: "Product Launch",
    projectColor: "bg-amber-500",
  },
]

export function ProfileActivity() {
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
      case "task_updated":
        return <PenLine className="h-4 w-4 text-sky-500" />
      default:
        return <CheckCircle2 className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Your recent activity and upcoming tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="tasks">Upcoming Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="activity" className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">{activity.content}</p>
                    <span className="text-xs text-muted-foreground">{formatTimestamp(activity.timestamp)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Project: {activity.project}</p>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="tasks" className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="space-y-1">
                    <div className="font-medium">{task.title}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div className={`h-2 w-2 rounded-full ${task.projectColor}`}></div>
                        {task.project}
                      </div>
                      <div>Due {format(task.dueDate, "MMM d")}</div>
                    </div>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
