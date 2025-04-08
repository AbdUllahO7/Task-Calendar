"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BarChart3, Calendar, CheckSquare, Clock, Activity, LineChart, ListTodo, MessageSquare } from "lucide-react"

interface WidgetSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (widgetType: string) => void
}

const availableWidgets = [
  {
    id: "stats",
    name: "Stats Overview",
    description: "Key metrics and statistics at a glance",
    icon: BarChart3,
  },
  {
    id: "taskSummary",
    name: "Task Summary",
    description: "Summary of tasks by status and priority",
    icon: ListTodo,
  },
  {
    id: "upcomingTasks",
    name: "Upcoming Tasks",
    description: "View tasks due in the coming days",
    icon: CheckSquare,
  },
  {
    id: "timeTracking",
    name: "Time Tracking",
    description: "Track time spent on tasks and projects",
    icon: Clock,
  },
  {
    id: "calendar",
    name: "Calendar Preview",
    description: "Preview of your upcoming schedule",
    icon: Calendar,
  },
  {
    id: "productivity",
    name: "Productivity Chart",
    description: "Visualize your productivity trends",
    icon: LineChart,
  },
  {
    id: "projectProgress",
    name: "Project Progress",
    description: "Track progress of your active projects",
    icon: Activity,
  },
  {
    id: "recentActivity",
    name: "Recent Activity",
    description: "Latest actions across your workspace",
    icon: MessageSquare,
  },
]

export function WidgetSelector({ open, onOpenChange, onSelect }: WidgetSelectorProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
          <DialogDescription>
            Choose a widget to add to your dashboard. You can rearrange and resize widgets after adding them.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {availableWidgets.map((widget) => (
            <Button
              key={widget.id}
              variant="outline"
              className="h-auto flex flex-col items-start p-4 justify-start text-left"
              onClick={() => onSelect(widget.id)}
            >
              <div className="flex items-center w-full">
                <widget.icon className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">{widget.name}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{widget.description}</p>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
