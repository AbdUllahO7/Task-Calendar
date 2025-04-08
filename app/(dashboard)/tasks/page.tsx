import { TaskList } from "@/components/tasks/task-list"
import { TaskFilters } from "@/components/tasks/task-filters"

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground">Manage and organize all your tasks</p>
      </div>

      <div className="flex flex-col gap-6">
        <TaskFilters />
        <TaskList />
      </div>
    </div>
  )
}
