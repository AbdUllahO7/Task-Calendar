"use client"

import { Check, Trash2 } from "lucide-react"
import type { Task } from "@/components/calendar-view"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Category colors mapping
const categoryColors: Record<string, string> = {
  work: "bg-blue-500",
  personal: "bg-green-500",
  shopping: "bg-amber-500",
  health: "bg-rose-500",
  other: "bg-purple-500",
  default: "bg-slate-500",
}

interface TaskListProps {
  tasks: Task[]
  date: Date
  onToggleComplete: (date: Date, taskId: string) => void
  onDeleteTask: (date: Date, taskId: string) => void
}

export default function TaskList({ tasks, date, onToggleComplete, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return <div className="text-slate-500 dark:text-slate-400 text-sm italic">No tasks for this day</div>
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <div className="flex items-center gap-2 flex-1">
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-5 w-5 rounded-full p-0 border",
                  task.completed && "bg-emerald-500 text-white border-emerald-500",
                )}
                onClick={() => onToggleComplete(date, task.id)}
              >
                {task.completed && <Check className="h-3 w-3" />}
              </Button>
              <div
                className={cn(
                  "absolute -top-1 -right-1 w-2 h-2 rounded-full",
                  categoryColors[task.category] || categoryColors.default,
                )}
              />
            </div>
            <span className={cn("text-sm", task.completed && "line-through text-slate-400 dark:text-slate-500")}>
              {task.text}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-slate-400 hover:text-red-500"
            onClick={() => onDeleteTask(date, task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  )
}
