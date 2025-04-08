"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Play, Pause, StopCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function TimeTracker() {
  const [isTracking, setIsTracking] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [taskDescription, setTaskDescription] = useState("")
  const [projectId, setProjectId] = useState("")
  const { toast } = useToast()

  // Format seconds to HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":")
  }

  // Update timer every second when tracking
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isTracking && startTime) {
      interval = setInterval(() => {
        const now = Date.now()
        const diff = Math.floor((now - startTime) / 1000)
        setElapsedTime(diff)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isTracking, startTime])

  // Start tracking time
  const startTracking = () => {
    if (!taskDescription) {
      toast({
        title: "Task description required",
        description: "Please enter a task description before starting the timer.",
        variant: "destructive",
      })
      return
    }

    setIsTracking(true)
    setStartTime(Date.now() - elapsedTime * 1000)

    toast({
      title: "Time tracking started",
      description: `Now tracking: ${taskDescription}`,
    })
  }

  // Pause tracking
  const pauseTracking = () => {
    setIsTracking(false)

    toast({
      title: "Time tracking paused",
      description: `Current time: ${formatTime(elapsedTime)}`,
    })
  }

  // Stop tracking and save
  const stopTracking = () => {
    if (elapsedTime < 60) {
      toast({
        title: "Time too short",
        description: "Time entries should be at least 1 minute long.",
        variant: "destructive",
      })
      return
    }

    setIsTracking(false)

    // Mock saving the time entry
    const timeEntry = {
      id: Date.now().toString(),
      description: taskDescription,
      projectId,
      duration: elapsedTime,
      date: format(new Date(), "yyyy-MM-dd"),
    }

    console.log("Saved time entry:", timeEntry)

    toast({
      title: "Time entry saved",
      description: `Recorded ${formatTime(elapsedTime)} for "${taskDescription}"`,
    })

    // Reset the form
    setElapsedTime(0)
    setStartTime(null)
    setTaskDescription("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Tracker</CardTitle>
        <CardDescription>Track time spent on tasks and projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-mono font-bold">{formatTime(elapsedTime)}</div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="What are you working on?"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              disabled={isTracking}
            />
          </div>
          <div className="space-y-2">
            <Select value={projectId} onValueChange={setProjectId} disabled={isTracking}>
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Website Redesign</SelectItem>
                <SelectItem value="2">Mobile App Development</SelectItem>
                <SelectItem value="3">Marketing Campaign</SelectItem>
                <SelectItem value="4">Product Launch</SelectItem>
                <SelectItem value="5">Research Project</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isTracking ? (
          <Button onClick={startTracking} className="w-full">
            <Play className="mr-2 h-4 w-4" />
            Start
          </Button>
        ) : (
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={pauseTracking} className="flex-1">
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </Button>
            <Button variant="destructive" onClick={stopTracking} className="flex-1">
              <StopCircle className="mr-2 h-4 w-4" />
              Stop
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
