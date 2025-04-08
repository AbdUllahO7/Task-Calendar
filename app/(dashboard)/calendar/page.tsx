import CalendarView from "@/components/calendar-view"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">Manage your schedule and view upcoming tasks</p>
      </div>

      <CalendarView />
    </div>
  )
}
