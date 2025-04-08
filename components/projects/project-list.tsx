"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProjectCard } from "@/components/projects/project-card"
import { NewProjectDialog } from "@/components/projects/new-project-dialog"

// Mock project data
const projects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Redesign the company website with modern UI/UX",
    progress: 75,
    dueDate: "in 2 weeks",
    members: [
      { id: "1", name: "John Doe", image: "/placeholder.svg?height=32&width=32" },
      { id: "2", name: "Jane Smith", image: "/placeholder.svg?height=32&width=32" },
      { id: "3", name: "Bob Johnson", image: "/placeholder.svg?height=32&width=32" },
      { id: "4", name: "Alice Brown", image: "/placeholder.svg?height=32&width=32" },
    ],
    color: "bg-sky-500",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Develop a cross-platform mobile application",
    progress: 45,
    dueDate: "in 1 month",
    members: [
      { id: "1", name: "John Doe", image: "/placeholder.svg?height=32&width=32" },
      { id: "3", name: "Bob Johnson", image: "/placeholder.svg?height=32&width=32" },
    ],
    color: "bg-rose-500",
  },
  {
    id: "3",
    name: "Marketing Campaign",
    description: "Plan and execute Q3 marketing campaign",
    progress: 30,
    dueDate: "in 3 weeks",
    members: [
      { id: "2", name: "Jane Smith", image: "/placeholder.svg?height=32&width=32" },
      { id: "4", name: "Alice Brown", image: "/placeholder.svg?height=32&width=32" },
      { id: "5", name: "Charlie Davis", image: "/placeholder.svg?height=32&width=32" },
    ],
    color: "bg-emerald-500",
  },
  {
    id: "4",
    name: "Product Launch",
    description: "Prepare for the new product launch event",
    progress: 60,
    dueDate: "in 2 months",
    members: [
      { id: "1", name: "John Doe", image: "/placeholder.svg?height=32&width=32" },
      { id: "2", name: "Jane Smith", image: "/placeholder.svg?height=32&width=32" },
      { id: "3", name: "Bob Johnson", image: "/placeholder.svg?height=32&width=32" },
    ],
    color: "bg-amber-500",
  },
  {
    id: "5",
    name: "Research Project",
    description: "Conduct market research for new opportunities",
    progress: 15,
    dueDate: "in 6 weeks",
    members: [
      { id: "4", name: "Alice Brown", image: "/placeholder.svg?height=32&width=32" },
      { id: "5", name: "Charlie Davis", image: "/placeholder.svg?height=32&width=32" },
    ],
    color: "bg-purple-500",
  },
]

export function ProjectList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false)

  // Filter projects based on search query and status filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (statusFilter === "all") return matchesSearch
    if (statusFilter === "in-progress") return matchesSearch && project.progress > 0 && project.progress < 100
    if (statusFilter === "completed") return matchesSearch && project.progress === 100

    return matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsNewProjectDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">No projects found</p>
            <Button variant="link" className="mt-2" onClick={() => setIsNewProjectDialogOpen(true)}>
              Create a new project
            </Button>
          </div>
        )}
      </div>

      <NewProjectDialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen} />
    </div>
  )
}
