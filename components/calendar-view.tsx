"use client"

import { useState, useEffect } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import TaskForm from "@/components/task-form"
import TaskList from "@/components/task-list"
// Import the search component
import TaskSearch from "@/components/task-search"
// Import the statistics component
import TaskStatistics from "@/components/task-statistics"

// Define the Task type
export interface Task {
  id: string
  text: string
  completed: boolean
  category: string
}

// Define the Tasks by date type
export type TasksByDate = Map<string, Task[]>

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false)
  const [tasksByDate, setTasksByDate] = useState<TasksByDate>(new Map())

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasksByDate")
    if (savedTasks) {
      // Convert the JSON object back to a Map
      const tasksObject = JSON.parse(savedTasks)
      const tasksMap = new Map(Object.entries(tasksObject))
      setTasksByDate(tasksMap)
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasksByDate.size > 0) {
      // Convert Map to object for JSON serialization
      const tasksObject = Object.fromEntries(tasksByDate)
      localStorage.setItem("tasksByDate", JSON.stringify(tasksObject))
    }
  }, [tasksByDate])

  // Get days for the current month
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  // Add a new task
  const addTask = (date: Date, text: string, category = "default") => {
    const dateKey = format(date, "yyyy-MM-dd")
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      category,
    }

    setTasksByDate((prev) => {
      const newMap = new Map(prev)
      const existingTasks = newMap.get(dateKey) || []
      newMap.set(dateKey, [...existingTasks, newTask])
      return newMap
    })

    setIsAddingTask(false)
  }

  // Toggle task completion
  const toggleTaskCompletion = (date: Date, taskId: string) => {
    const dateKey = format(date, "yyyy-MM-dd")

    setTasksByDate((prev) => {
      const newMap = new Map(prev)
      const existingTasks = newMap.get(dateKey) || []
      const updatedTasks = existingTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      )
      newMap.set(dateKey, updatedTasks)
      return newMap
    })
  }

  // Delete a task
  const deleteTask = (date: Date, taskId: string) => {
    const dateKey = format(date, "yyyy-MM-dd")

    setTasksByDate((prev) => {
      const newMap = new Map(prev)
      const existingTasks = newMap.get(dateKey) || []
      const updatedTasks = existingTasks.filter((task) => task.id !== taskId)

      if (updatedTasks.length === 0) {
        newMap.delete(dateKey)
      } else {
        newMap.set(dateKey, updatedTasks)
      }

      return newMap
    })
  }

  // Get tasks for a specific date
  const getTasksForDate = (date: Date): Task[] => {
    const dateKey = format(date, "yyyy-MM-dd")
    return tasksByDate.get(dateKey) || []
  }

  // Check if a date has tasks
  const hasTasksForDate = (date: Date): boolean => {
    const tasks = getTasksForDate(date)
    return tasks.length > 0
  }

  // Add this function to the component
  const handleSearchDateSelect = (date: Date) => {
    setSelectedDate(date)
    setCurrentDate(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Manage your tasks and schedule</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => {
              setSelectedDate(new Date())
              setIsAddingTask(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Add this before the calendar grid */}
      <div className="mb-6">
        <TaskSearch tasksByDate={tasksByDate} onSelectDate={handleSearchDateSelect} />
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-1">
            {/* Day names */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium py-2 text-slate-500 dark:text-slate-400">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {daysInMonth.map((day) => {
              const formattedDate = format(day, "d")
              const isCurrentMonth = isSameMonth(day, currentDate)
              const isToday = isSameDay(day, new Date())
              const hasTasks = hasTasksForDate(day)

              return (
                <HoverCard key={day.toString()} openDelay={200}>
                  <HoverCardTrigger asChild>
                    <button
                      className={cn(
                        "h-14 rounded-md flex flex-col items-center justify-center relative",
                        isCurrentMonth ? "text-slate-900 dark:text-slate-100" : "text-slate-400 dark:text-slate-600",
                        isToday && "bg-slate-100 dark:bg-slate-800",
                        "hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
                      )}
                      onClick={() => {
                        setSelectedDate(day)
                        setIsAddingTask(true)
                      }}
                    >
                      <span>{formattedDate}</span>
                      {hasTasks && <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>}
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-0" align="start">
                    <div className="p-4">
                      <h3 className="font-medium mb-2">{format(day, "EEEE, MMMM d, yyyy")}</h3>
                      <TaskList
                        tasks={getTasksForDate(day)}
                        date={day}
                        onToggleComplete={toggleTaskCompletion}
                        onDeleteTask={deleteTask}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          setSelectedDate(day)
                          setIsAddingTask(true)
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add task
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Task list for selected date */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-medium mb-4">Tasks for {format(selectedDate, "EEEE, MMMM d, yyyy")}</h3>
          <TaskList
            tasks={getTasksForDate(selectedDate)}
            date={selectedDate}
            onToggleComplete={toggleTaskCompletion}
            onDeleteTask={deleteTask}
          />
          <Button variant="outline" className="mt-4" onClick={() => setIsAddingTask(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add task
          </Button>
        </CardContent>
      </Card>

      {/* Add this after the task list card */}
      <TaskStatistics tasksByDate={tasksByDate} />

      {/* Task form dialog */}
      <TaskForm
        isOpen={isAddingTask}
        onClose={() => setIsAddingTask(false)}
        onAddTask={(text) => addTask(selectedDate, text)}
        selectedDate={selectedDate}
      />
    </div>
  )
}
