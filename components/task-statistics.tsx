"use client"

import { useMemo } from "react"
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts"
import type { Task } from "@/components/calendar-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TaskStatisticsProps {
  tasksByDate: Map<string, Task[]>
}

// Category colors mapping
const categoryColors: Record<string, string> = {
  work: "#3b82f6", // blue-500
  personal: "#22c55e", // green-500
  shopping: "#f59e0b", // amber-500
  health: "#f43f5e", // rose-500
  other: "#a855f7", // purple-500
  default: "#64748b", // slate-500
}

export default function TaskStatistics({ tasksByDate }: TaskStatisticsProps) {
  // Calculate total tasks
  const totalTasks = useMemo(() => {
    let count = 0
    tasksByDate.forEach((tasks) => {
      count += tasks.length
    })
    return count
  }, [tasksByDate])

  // Calculate completed tasks
  const completedTasks = useMemo(() => {
    let count = 0
    tasksByDate.forEach((tasks) => {
      count += tasks.filter((task) => task.completed).length
    })
    return count
  }, [tasksByDate])

  // Calculate completion rate
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Calculate tasks by category
  const tasksByCategory = useMemo(() => {
    const categories: Record<string, { total: number; completed: number }> = {}

    tasksByDate.forEach((tasks) => {
      tasks.forEach((task) => {
        const category = task.category || "default"
        if (!categories[category]) {
          categories[category] = { total: 0, completed: 0 }
        }
        categories[category].total++
        if (task.completed) {
          categories[category].completed++
        }
      })
    })

    return Object.entries(categories).map(([name, data]) => ({
      name,
      value: data.total,
      completed: data.completed,
      color: categoryColors[name] || categoryColors.default,
    }))
  }, [tasksByDate])

  // Calculate tasks by day of week
  const tasksByDayOfWeek = useMemo(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dayStats = days.map((day) => ({ name: day, tasks: 0 }))

    tasksByDate.forEach((tasks, dateKey) => {
      const date = new Date(dateKey)
      const dayIndex = date.getDay()
      dayStats[dayIndex].tasks += tasks.length
    })

    return dayStats
  }, [tasksByDate])

  // Calculate this week's tasks
  const thisWeekTasks = useMemo(() => {
    const today = new Date()
    const start = startOfWeek(today)
    const end = endOfWeek(today)
    const daysThisWeek = eachDayOfInterval({ start, end })

    return daysThisWeek.map((day) => {
      const dateKey = format(day, "yyyy-MM-dd")
      const tasks = tasksByDate.get(dateKey) || []
      return {
        name: format(day, "EEE"),
        date: format(day, "MMM d"),
        total: tasks.length,
        completed: tasks.filter((t) => t.completed).length,
      }
    })
  }, [tasksByDate])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{totalTasks}</div>
                    <div className="text-sm text-muted-foreground">Total Tasks</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{completedTasks}</div>
                    <div className="text-sm text-muted-foreground">Completed Tasks</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{completionRate}%</div>
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tasksByDayOfWeek}>
                  <XAxis dataKey="name" tickFormatter={(value) => value.substring(0, 3)} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tasksByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {tasksByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="weekly">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={thisWeekTasks}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip labelFormatter={(value) => thisWeekTasks.find((d) => d.name === value)?.date || ""} />
                  <Bar dataKey="total" name="Total" fill="#3b82f6" />
                  <Bar dataKey="completed" name="Completed" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
