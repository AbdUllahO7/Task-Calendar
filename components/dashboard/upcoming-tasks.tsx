import { Clock, Flag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Mock upcoming tasks data
const upcomingTasks = [
  {
    id: "1",
    title: "Complete project proposal",
    dueDate: "Today, 5:00 PM",
    priority: "high",
    project: "Website Redesign",
    projectColor: "bg-sky-500",
  },
  {
    id: "2",
    title: "Review design mockups",
    dueDate: "Tomorrow, 10:00 AM",
    priority: "medium",
    project: "Mobile App Development",
    projectColor: "bg-rose-500",
  },
  {
    id: "3",
    title: "Team meeting",
    dueDate: "Apr 9, 2:00 PM",
    priority: "medium",
    project: "Website Redesign",
    projectColor: "bg-sky-500",
  },
  {
    id: "4",
    title: "Finalize content strategy",
    dueDate: "Apr 10, 12:00 PM",
    priority: "low",
    project: "Marketing Campaign",
    projectColor: "bg-emerald-500",
  },
  {
    id: "5",
    title: "Client presentation",
    dueDate: "Apr 12, 3:30 PM",
    priority: "high",
    project: "Product Launch",
    projectColor: "bg-amber-500",
  },
]

export function UpcomingTasks() {
  // Function to get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-amber-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      {upcomingTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-start gap-3">
            <Button variant="outline" size="icon" className="h-5 w-5 rounded-full p-0 border">
              <span className="sr-only">Mark as complete</span>
            </Button>
            <div className="space-y-1">
              <div className="font-medium">{task.title}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {task.dueDate}
                </div>
                <div className="flex items-center">
                  <Flag className={cn("mr-1 h-3 w-3", getPriorityColor(task.priority))} />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("h-2 w-2 rounded-full", task.projectColor)}></div>
            <span className="text-xs text-muted-foreground">{task.project}</span>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full">
        View all tasks
      </Button>
    </div>
  )
}
