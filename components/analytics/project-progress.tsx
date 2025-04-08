"use client"

import { Progress } from "@/components/ui/progress"

// Mock data for project progress
const projects = [
  {
    id: "1",
    name: "Website Redesign",
    progress: 75,
    color: "bg-sky-500",
  },
  {
    id: "2",
    name: "Mobile App Development",
    progress: 45,
    color: "bg-rose-500",
  },
  {
    id: "3",
    name: "Marketing Campaign",
    progress: 30,
    color: "bg-emerald-500",
  },
  {
    id: "4",
    name: "Product Launch",
    progress: 60,
    color: "bg-amber-500",
  },
  {
    id: "5",
    name: "Research Project",
    progress: 15,
    color: "bg-purple-500",
  },
]

export function ProjectProgress() {
  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div key={project.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-2 ${project.color}`}></div>
              <span className="font-medium text-sm">{project.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
      ))}
    </div>
  )
}
