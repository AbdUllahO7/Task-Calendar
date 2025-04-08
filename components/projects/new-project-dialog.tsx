"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Users } from "lucide-react"
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
import { format } from "date-fns"

interface NewProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewProjectDialog({ open, onOpenChange }: NewProjectDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [color, setColor] = useState("sky")
  const [dueDate, setDueDate] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle project creation logic here
    console.log({ name, description, color, dueDate })
    onOpenChange(false)

    // Reset form
    setName("")
    setDescription("")
    setColor("sky")
    setDueDate(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>Add the details for your new project.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project name</Label>
              <Input
                id="name"
                placeholder="Enter project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="color">Color</Label>
                <Select value={color} onValueChange={setColor}>
                  <SelectTrigger id="color">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sky">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-sky-500 mr-2"></div>
                        Blue
                      </div>
                    </SelectItem>
                    <SelectItem value="rose">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-rose-500 mr-2"></div>
                        Red
                      </div>
                    </SelectItem>
                    <SelectItem value="emerald">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-emerald-500 mr-2"></div>
                        Green
                      </div>
                    </SelectItem>
                    <SelectItem value="amber">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                        Yellow
                      </div>
                    </SelectItem>
                    <SelectItem value="purple">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                        Purple
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            </div>
            <div className="grid gap-2">
              <Label>Team members</Label>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Add team members
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
