"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

// Mock time entry data
const timeEntries = [
  {
    id: "1",
    description: "Website design implementation",
    projectId: "1",
    projectName: "Website Redesign",
    duration: 7200, // 2 hours in seconds
    date: "2025-04-07",
  },
  {
    id: "2",
    description: "Client meeting",
    projectId: "1",
    projectName: "Website Redesign",
    duration: 3600, // 1 hour in seconds
    date: "2025-04-07",
  },
  {
    id: "3",
    description: "API integration",
    projectId: "2",
    projectName: "Mobile App Development",
    duration: 5400, // 1.5 hours in seconds
    date: "2025-04-06",
  },
  {
    id: "4",
    description: "Content creation",
    projectId: "3",
    projectName: "Marketing Campaign",
    duration: 10800, // 3 hours in seconds
    date: "2025-04-05",
  },
]

// Format seconds to HH:MM:SS
const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours === 0) {
    return `${minutes}m`
  }

  return `${hours}h ${minutes}m`
}

export function TimeEntries() {
  const [entries, setEntries] = useState(timeEntries)
  const { toast } = useToast()

  // Group entries by date
  const entriesByDate = entries.reduce(
    (acc, entry) => {
      if (!acc[entry.date]) {
        acc[entry.date] = []
      }
      acc[entry.date].push(entry)
      return acc
    },
    {} as Record<string, typeof timeEntries>,
  )

  // Calculate total duration for a day
  const getTotalDuration = (entries: typeof timeEntries) => {
    return entries.reduce((total, entry) => total + entry.duration, 0)
  }

  // Delete an entry
  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id))

    toast({
      title: "Time entry deleted",
      description: "The time entry has been deleted successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Time Entries</CardTitle>
        <CardDescription>Your tracked time for the past days</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(entriesByDate).map(([date, dayEntries]) => (
          <div key={date} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                {date === format(new Date(), "yyyy-MM-dd")
                  ? "Today"
                  : date === format(new Date(Date.now() - 86400000), "yyyy-MM-dd")
                    ? "Yesterday"
                    : format(new Date(date), "EEEE, MMMM d")}
              </h3>
              <div className="text-sm font-medium">Total: {formatTime(getTotalDuration(dayEntries))}</div>
            </div>
            <div className="space-y-2">
              {dayEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="space-y-1">
                    <div className="font-medium">{entry.description}</div>
                    <div className="text-sm text-muted-foreground">{entry.projectName}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">{formatTime(entry.duration)}</div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit entry</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteEntry(entry.id)}>Delete entry</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
