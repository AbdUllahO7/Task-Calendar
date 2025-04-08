import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ProfileStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Stats</CardTitle>
        <CardDescription>Your task and productivity metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Task Completion Rate</div>
            <div className="text-sm text-muted-foreground">78%</div>
          </div>
          <Progress value={78} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">On-time Delivery</div>
            <div className="text-sm text-muted-foreground">92%</div>
          </div>
          <Progress value={92} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Productivity Score</div>
            <div className="text-sm text-muted-foreground">8.7/10</div>
          </div>
          <Progress value={87} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="rounded-lg border p-3">
            <div className="text-xs text-muted-foreground">Tasks Completed</div>
            <div className="text-2xl font-bold">127</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-xs text-muted-foreground">Hours Tracked</div>
            <div className="text-2xl font-bold">142.5</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-xs text-muted-foreground">Projects</div>
            <div className="text-2xl font-bold">12</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-xs text-muted-foreground">Avg. Response Time</div>
            <div className="text-2xl font-bold">1.2h</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
