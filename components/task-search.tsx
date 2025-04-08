"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { Search } from "lucide-react"
import type { Task } from "@/components/calendar-view"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface TaskSearchProps {
  tasksByDate: Map<string, Task[]>
  onSelectDate: (date: Date) => void
}

export default function TaskSearch({ tasksByDate, onSelectDate }: TaskSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Array<{ date: Date; task: Task }>>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results: Array<{ date: Date; task: Task }> = []

    tasksByDate.forEach((tasks, dateKey) => {
      const date = new Date(dateKey)
      tasks.forEach((task) => {
        if (task.text.toLowerCase().includes(query)) {
          results.push({ date, task })
        }
      })
    })

    setSearchResults(results)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {searchResults.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Search Results</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {searchResults.map(({ date, task }) => (
                <li
                  key={task.id}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer"
                  onClick={() => onSelectDate(date)}
                >
                  <div className="text-sm font-medium">{task.text}</div>
                  <div className="text-xs text-slate-500">{format(date, "MMMM d, yyyy")}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
