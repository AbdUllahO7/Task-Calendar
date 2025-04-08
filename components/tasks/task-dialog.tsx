"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { CalendarIcon, User } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: any | null
  onSave: (task: any) => void
  onCancel: () => void
}

export function TaskDialog({ open, onOpenChange, task, onSave, onCancel }: TaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date())
  const [priority, setPriority] = useState("medium")
  const [project, setProject] = useState("")
  const [category, setCategory] = useState("work")

  // Reset form when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || "")
      setDueDate(task.dueDate)
      setPriority(task.priority)
      setProject(task.project)
      setCategory(task.category)
    } else {
      setTitle("")
      setDescription("")
      setDueDate(new Date())
      setPriority("medium")
      setProject("")
      setCategory("work")
    }
  }, [task, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Get project color based on project selection
    let projectColor = "bg-sky-500"
    switch (project) {
      case "Website Redesign":
        projectColor = "bg-sky-500"
        break
      case "Mobile App Development":
        projectColor = "bg-rose-500"
        break
      case "Marketing Campaign":
        projectColor = "bg-emerald-500"
        break
      case "Product Launch":
        projectColor = "bg-amber-500"
        break
      case "Research Project":
        projectColor = "bg-purple-500"
        break
    }

    const updatedTask = {
      id: task?.id,
      title,
      description,
      dueDate,
      priority,
      project,
      projectColor,
      category,
      completed: task?.completed || false,
      assignedTo: task?.assignedTo || {
        id: "1",
        name: "John Doe",
        image: "/placeholder.svg?height=32&width=32",
      },
    }

    onSave(updatedTask)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Create New Task"}</DialogTitle>
          <DialogDescription>
            {task ? "Update the details of your task." : "Add the details for your new task."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Task title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="due-date">Due date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="due-date"
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="project">Project</Label>
                <Select value={project} onValueChange={setProject}>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website Redesign">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-sky-500 mr-2"></div>
                        Website Redesign
                      </div>
                    </SelectItem>
                    <SelectItem value="Mobile App Development">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-rose-500 mr-2"></div>
                        Mobile App Development
                      </div>
                    </SelectItem>
                    <SelectItem value="Marketing Campaign">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                        Marketing Campaign
                      </div>
                    </SelectItem>
                    <SelectItem value="Product Launch">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                        Product Launch
                      </div>
                    </SelectItem>
                    <SelectItem value="Research Project">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                        Research Project
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Assigned to</Label>
              <Button type="button" variant="outline" className="justify-start">
                <User className="mr-2 h-4 w-4" />
                John Doe
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{task ? "Update Task" : "Create Task"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
