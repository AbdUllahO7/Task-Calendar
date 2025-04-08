"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Clock, Edit, Flag, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { TaskDialog } from "@/components/tasks/task-dialog"

// Mock tasks data
const initialTasks = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Write and review the project proposal document for the client",
    completed: false,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    priority: "high",
    project: "Website Redesign",
    projectColor: "bg-sky-500",
    category: "work",
    assignedTo: {
      id: "1",
      name: "John Doe",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "2",
    title: "Review design mockups",
    description: "Review and provide feedback on the latest design mockups",
    completed: false,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    priority: "medium",
    project: "Mobile App Development",
    projectColor: "bg-rose-500",
    category: "work",
    assignedTo: {
      id: "1",
      name: "John Doe",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "3",
    title: "Team meeting",
    description: "Weekly team meeting to discuss project progress",
    completed: false,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 48), // 2 days from now
    priority: "medium",
    project: "Website Redesign",
    projectColor: "bg-sky-500",
    category: "meeting",
    assignedTo: {
      id: "1",
      name: "John Doe",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "4",
    title: "Finalize content strategy",
    description: "Complete the content strategy document for the marketing campaign",
    completed: true,
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    priority: "low",
    project: "Marketing Campaign",
    projectColor: "bg-emerald-500",
    category: "planning",
    assignedTo: {
      id: "2",
      name: "Jane Smith",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "5",
    title: "Client presentation",
    description: "Prepare and deliver presentation to the client",
    completed: false,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    priority: "high",
    project: "Product Launch",
    projectColor: "bg-amber-500",
    category: "meeting",
    assignedTo: {
      id: "1",
      name: "John Doe",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "6",
    title: "Research competitor pricing",
    description: "Analyze competitor pricing strategies for the new product",
    completed: true,
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    priority: "medium",
    project: "Research Project",
    projectColor: "bg-purple-500",
    category: "research",
    assignedTo: {
      id: "3",
      name: "Bob Johnson",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
]

export function TaskList() {
  const [tasks, setTasks] = useState(initialTasks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<any | null>(null)
  const { toast } = useToast()

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

  // Function to toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    )

    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      toast({
        title: task.completed ? "Task marked as incomplete" : "Task completed",
        description: task.title,
      })
    }
  }

  // Function to delete task
  const deleteTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))

    if (task) {
      toast({
        title: "Task deleted",
        description: task.title,
      })
    }
  }

  // Function to edit task
  const editTask = (task: any) => {
    setCurrentTask(task)
    setIsDialogOpen(true)
  }

  // Function to save task
  const saveTask = (updatedTask: any) => {
    if (currentTask) {
      // Update existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task)),
      )

      toast({
        title: "Task updated",
        description: updatedTask.title,
      })
    } else {
      // Add new task
      const newTask = {
        ...updatedTask,
        id: Date.now().toString(),
      }
      setTasks((prevTasks) => [...prevTasks, newTask])

      toast({
        title: "Task created",
        description: updatedTask.title,
      })
    }

    setIsDialogOpen(false)
    setCurrentTask(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <Button onClick={() => setIsDialogOpen(true)}>Add Task</Button>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-md border p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-1"
              />
              <div className="space-y-1">
                <div className="font-medium line-clamp-1">{task.title}</div>
                <div className="text-sm text-muted-foreground line-clamp-1">{task.description}</div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {format(task.dueDate, "MMM d, yyyy")}
                  </div>
                  <div className="flex items-center">
                    <Flag className={`mr-1 h-3 w-3 ${getPriorityColor(task.priority)}`} />
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`h-2 w-2 rounded-full ${task.projectColor}`}></div>
                    {task.project}
                  </div>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => editTask(task)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
            <p className="text-muted-foreground">No tasks found</p>
            <Button variant="link" onClick={() => setIsDialogOpen(true)}>
              Create your first task
            </Button>
          </div>
        )}
      </div>

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        task={currentTask}
        onSave={saveTask}
        onCancel={() => {
          setIsDialogOpen(false)
          setCurrentTask(null)
        }}
      />
    </div>
  )
}
