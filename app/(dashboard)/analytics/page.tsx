import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductivityChart } from "@/components/analytics/productivity-chart"
import { TaskCompletionRate } from "@/components/analytics/task-completion-rate"
import { ProjectProgress } from "@/components/analytics/project-progress"
import { TimeDistribution } from "@/components/analytics/time-distribution"
import { CategoryBreakdown } from "@/components/analytics/category-breakdown"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track your productivity and task completion metrics</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="time">Time Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Task Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Time per Task</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4 hours</div>
                <p className="text-xs text-muted-foreground">-0.3 hours from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Productivity Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.7/10</div>
                <p className="text-xs text-muted-foreground">+0.5 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks Created</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+12 from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Productivity Trends</CardTitle>
                <CardDescription>Your productivity score over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ProductivityChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Task Completion Rate</CardTitle>
                <CardDescription>Percentage of tasks completed on time</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskCompletionRate />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>Current status of active projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectProgress />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Time Distribution</CardTitle>
                <CardDescription>How your time is distributed across projects</CardDescription>
              </CardHeader>
              <CardContent>
                <TimeDistribution />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Task Category Breakdown</CardTitle>
              <CardDescription>Distribution of tasks by category</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryBreakdown />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
