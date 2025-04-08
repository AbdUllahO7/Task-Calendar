"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Settings } from "lucide-react"
import { WidgetSelector } from "@/components/dashboard/widgets/widget-selector"
import { WidgetTaskSummary } from "@/components/dashboard/widgets/widget-task-summary"
import { WidgetUpcomingTasks } from "@/components/dashboard/widgets/widget-upcoming-tasks"
import { WidgetTimeTracking } from "@/components/dashboard/widgets/widget-time-tracking"
import { WidgetCalendar } from "@/components/dashboard/widgets/widget-calendar"
import { WidgetProductivity } from "@/components/dashboard/widgets/widget-productivity"
import { WidgetProjectProgress } from "@/components/dashboard/widgets/widget-project-progress"
import { WidgetRecentActivity } from "@/components/dashboard/widgets/widget-recent-activity"
import { WidgetStats } from "@/components/dashboard/widgets/widget-stats"
import { useToast } from "@/components/ui/use-toast"

// Define available widgets
const widgetComponents = {
  stats: WidgetStats,
  taskSummary: WidgetTaskSummary,
  upcomingTasks: WidgetUpcomingTasks,
  timeTracking: WidgetTimeTracking,
  calendar: WidgetCalendar,
  productivity: WidgetProductivity,
  projectProgress: WidgetProjectProgress,
  recentActivity: WidgetRecentActivity,
}

// Default widgets configuration
const defaultWidgets = [
  { id: "stats", size: "full" },
  { id: "productivity", size: "large" },
  { id: "taskSummary", size: "small" },
  { id: "upcomingTasks", size: "medium" },
  { id: "recentActivity", size: "medium" },
]

export function SimpleDashboard() {
  const [activeWidgets, setActiveWidgets] = useState<Array<{ id: string; size: string }>>([])
  const [isEditing, setIsEditing] = useState(false)
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const { toast } = useToast()

  // Load saved widgets from localStorage on component mount
  useEffect(() => {
    if (typeof window === "undefined") return

    const savedWidgets = localStorage.getItem("dashboard-widgets")
    if (savedWidgets) {
      try {
        setActiveWidgets(JSON.parse(savedWidgets))
      } catch (e) {
        console.error("Error parsing saved widgets:", e)
        setActiveWidgets(defaultWidgets)
      }
    } else {
      setActiveWidgets(defaultWidgets)
    }
  }, [])

  // Save widgets to localStorage
  const saveWidgets = () => {
    localStorage.setItem("dashboard-widgets", JSON.stringify(activeWidgets))
    setIsEditing(false)
    toast({
      title: "Dashboard saved",
      description: "Your dashboard layout has been saved.",
    })
  }

  // Reset to default widgets
  const resetWidgets = () => {
    setActiveWidgets(defaultWidgets)
    localStorage.removeItem("dashboard-widgets")
    setIsEditing(false)
    toast({
      title: "Dashboard reset",
      description: "Your dashboard has been reset to default layout.",
    })
  }

  // Add a new widget
  const addWidget = (widgetType: string) => {
    if (activeWidgets.some((widget) => widget.id === widgetType)) {
      toast({
        title: "Widget already exists",
        description: "This widget is already on your dashboard.",
        variant: "destructive",
      })
      return
    }

    // Determine size based on widget type
    let size = "medium"
    if (widgetType === "stats") size = "full"
    if (widgetType === "productivity") size = "large"
    if (widgetType === "taskSummary") size = "small"

    setActiveWidgets([...activeWidgets, { id: widgetType, size }])
    setIsSelectorOpen(false)
  }

  // Remove a widget
  const removeWidget = (widgetId: string) => {
    setActiveWidgets(activeWidgets.filter((widget) => widget.id !== widgetId))
  }

  // Change widget size
  const changeWidgetSize = (widgetId: string) => {
    setActiveWidgets(
      activeWidgets.map((widget) => {
        if (widget.id === widgetId) {
          // Cycle through sizes: small -> medium -> large -> small
          const newSize = widget.size === "small" ? "medium" : widget.size === "medium" ? "large" : "small"
          return { ...widget, size: newSize }
        }
        return widget
      }),
    )
  }

  return (
    <div className="space-y-4">
      {/* Dashboard controls */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsSelectorOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Widget
              </Button>
              <Button variant="outline" size="sm" onClick={resetWidgets}>
                Reset
              </Button>
              <Button size="sm" onClick={saveWidgets}>
                Save Layout
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Customize Dashboard
            </Button>
          )}
        </div>
      </div>

      {/* Widget selector dialog */}
      <WidgetSelector open={isSelectorOpen} onOpenChange={setIsSelectorOpen} onSelect={addWidget} />

      {/* Dashboard grid */}
      <div
        className={`transition-all duration-300 ${isEditing ? "bg-muted/50 rounded-lg border border-dashed p-4" : ""}`}
      >
        {isEditing && (
          <div className="mb-4 p-2 bg-muted rounded-md text-sm text-muted-foreground">
            <p>Click the resize button to change widget size. Click the remove button to remove a widget.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeWidgets.map((widget) => {
            const WidgetComponent = widgetComponents[widget.id as keyof typeof widgetComponents]

            // Determine column span based on size
            let colSpan = "col-span-1"
            if (widget.size === "medium") colSpan = "col-span-1 md:col-span-1 lg:col-span-2"
            if (widget.size === "large") colSpan = "col-span-1 md:col-span-2 lg:col-span-3"
            if (widget.size === "full") colSpan = "col-span-1 md:col-span-2 lg:col-span-4"

            // Determine height based on size
            let height = "h-64"
            if (widget.id === "stats") height = "h-32"
            if (widget.size === "large") height = "h-80"

            return (
              <div key={widget.id} className={`${colSpan} ${height} bg-card rounded-lg shadow-sm border relative`}>
                {isEditing && (
                  <div className="absolute top-2 right-2 z-10 flex gap-1">
                    <button
                      className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center"
                      onClick={() => changeWidgetSize(widget.id)}
                      title="Resize widget"
                    >
                      ↔
                    </button>
                    <button
                      className="bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center"
                      onClick={() => removeWidget(widget.id)}
                      title="Remove widget"
                    >
                      ×
                    </button>
                  </div>
                )}
                <div className="p-4 h-full overflow-auto">
                  <WidgetComponent />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
