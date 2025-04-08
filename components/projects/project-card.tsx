import Link from "next/link"
import { CalendarClock, MoreHorizontal } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    description: string
    progress: number
    dueDate: string
    members: Array<{
      id: string
      name: string
      image?: string
    }>
    color: string
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center">
              <span className={`h-3 w-3 rounded-full mr-2 ${project.color}`}></span>
              {project.name}
            </CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit project</DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarClock className="mr-1 h-4 w-4" />
              <span>Due {project.dueDate}</span>
            </div>
            <div className="flex items-center gap-1">
              {project.members.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {project.members.length > 3 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                  +{project.members.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/projects/${project.id}`}>View Project</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
