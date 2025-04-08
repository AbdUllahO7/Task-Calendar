"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Import the recurring task settings component
import RecurringTaskSettings, { type RecurringSettings } from "@/components/recurring-task-settings"

// Update the TaskFormProps interface
interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  onAddTask: (text: string, category: string, recurringSettings?: RecurringSettings) => void
  selectedDate: Date
}

// Category options with colors
const categories = [
  { id: "work", name: "Work", color: "bg-blue-500" },
  { id: "personal", name: "Personal", color: "bg-green-500" },
  { id: "shopping", name: "Shopping", color: "bg-amber-500" },
  { id: "health", name: "Health", color: "bg-rose-500" },
  { id: "other", name: "Other", color: "bg-purple-500" },
]

export default function TaskForm({ isOpen, onClose, onAddTask, selectedDate }: TaskFormProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate)
  const [taskText, setTaskText] = useState("")
  const [category, setCategory] = useState("personal")

  // Add state for recurring settings
  const [recurringSettings, setRecurringSettings] = useState<RecurringSettings | undefined>()

  // Update the handleSubmit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (taskText.trim()) {
      onAddTask(taskText, category, recurringSettings)
      setTaskText("")
      setCategory("personal")
      setRecurringSettings(undefined)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Enter your task..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${cat.color}`}></div>
                      {cat.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Add the RecurringTaskSettings component to the form */}
          <div className="space-y-2">
            <RecurringTaskSettings onSettingsChange={setRecurringSettings} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
