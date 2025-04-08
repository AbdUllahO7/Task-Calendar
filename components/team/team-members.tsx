"use client"

import { useState } from "react"
import { Mail, MoreHorizontal, Search, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { InviteTeamMemberDialog } from "@/components/team/invite-team-member-dialog"

// Mock team members data
const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    image: "/placeholder.svg?height=32&width=32",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Member",
    image: "/placeholder.svg?height=32&width=32",
    status: "active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Member",
    image: "/placeholder.svg?height=32&width=32",
    status: "active",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "Member",
    image: "/placeholder.svg?height=32&width=32",
    status: "active",
  },
  {
    id: "5",
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    role: "Member",
    image: "/placeholder.svg?height=32&width=32",
    status: "inactive",
  },
]

export function TeamMembers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)

  // Filter team members based on search query
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage your team members and their roles</CardDescription>
          </div>
          <Button onClick={() => setIsInviteDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${
                      member.status === "active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {member.role}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View profile</DropdownMenuItem>
                      <DropdownMenuItem>Change role</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Remove from team</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {filteredMembers.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                <p className="text-muted-foreground">No team members found</p>
                <Button variant="link" onClick={() => setIsInviteDialogOpen(true)}>
                  Invite team members
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <InviteTeamMemberDialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen} />
    </Card>
  )
}
