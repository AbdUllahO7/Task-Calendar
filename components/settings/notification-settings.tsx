"use client"

import type React from "react"

import { useState } from "react"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [taskReminders, setTaskReminders] = useState(true)
  const [taskAssignments, setTaskAssignments] = useState(true)
  const [projectUpdates, setProjectUpdates] = useState(true)
  const [teamActivity, setTeamActivity] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive email notifications for important updates
              </span>
            </Label>
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="task-reminders" className="flex flex-col space-y-1">
              <span>Task Reminders</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive reminders for upcoming task deadlines
              </span>
            </Label>
            <Switch id="task-reminders" checked={taskReminders} onCheckedChange={setTaskReminders} />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="task-assignments" className="flex flex-col space-y-1">
              <span>Task Assignments</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive notifications when tasks are assigned to you
              </span>
            </Label>
            <Switch id="task-assignments" checked={taskAssignments} onCheckedChange={setTaskAssignments} />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="project-updates" className="flex flex-col space-y-1">
              <span>Project Updates</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive notifications about project status changes
              </span>
            </Label>
            <Switch id="project-updates" checked={projectUpdates} onCheckedChange={setProjectUpdates} />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="team-activity" className="flex flex-col space-y-1">
              <span>Team Activity</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive notifications about team member activities
              </span>
            </Label>
            <Switch id="team-activity" checked={teamActivity} onCheckedChange={setTeamActivity} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save changes"}
        </Button>
      </CardFooter>
    </form>
  )
}
