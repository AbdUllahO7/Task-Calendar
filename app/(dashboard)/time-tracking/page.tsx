import { TimeTracker } from "@/components/time-tracking/time-tracker"
import { TimeEntries } from "@/components/time-tracking/time-entries"

export default function TimeTrackingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Time Tracking</h1>
        <p className="text-muted-foreground">Track time spent on tasks and projects</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TimeTracker />
        <TimeEntries />
      </div>
    </div>
  )
}
