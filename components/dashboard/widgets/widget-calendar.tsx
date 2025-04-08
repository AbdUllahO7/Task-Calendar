"use client"

import { useState } from "react"
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
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function WidgetCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

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

  // Mock data for days with tasks
  const daysWithTasks = [
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 12),
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
  ]

  // Check if a date has tasks
  const hasTasksForDate = (date: Date): boolean => {
    return daysWithTasks.some((taskDate) => isSameDay(taskDate, date))
  }

  return (
    <div className="space-y-4 h-full">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Calendar</h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">{format(currentDate, "MMMM yyyy")}</div>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {/* Day names */}
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground h-7 flex items-center justify-center"
          >
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
            <div
              key={day.toString()}
              className={cn(
                "h-7 rounded-md flex flex-col items-center justify-center relative text-xs",
                isCurrentMonth ? "text-foreground" : "text-muted-foreground",
                isToday && "bg-accent text-accent-foreground",
                "hover:bg-accent hover:text-accent-foreground transition-colors",
              )}
            >
              <span>{formattedDate}</span>
              {hasTasks && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"></div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
