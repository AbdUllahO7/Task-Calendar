import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Define the Task type
export interface Task {
  id: string
  text: string
  completed: boolean
  category: string
}

// Define the Tasks by date type
export type TasksByDate = Map<string, Task[]>

// Define the Project type
export interface Project {
  id: string
  name: string
  description: string
  progress: number
  dueDate: string
  members: Array<{
    id: string
    name: string
    image?: string
  }>
  color: string
}

// Define the TimeEntry type
export interface TimeEntry {
  id: string
  description: string
  projectId: string
  projectName: string
  duration: number
  date: string
}

// Define the User type
export interface User {
  id: string
  name: string
  email: string
  image?: string
}

// Define the Notification type
export interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "task" | "reminder" | "update" | "comment"
}
