"use client"

import { useState } from "react"
import { Play, Pause, StopCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function WidgetTimeTracking() {
  const [isTracking, setIsTracking] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [taskDescription, setTaskDescription] = useState("")
  const [projectId, setProjectId] = useState("")

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

  return (
    <div className="space-y-4 h-full">
      <h3 className="font-semibold text-sm">Time Tracker</h3>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-mono font-bold">{formatTime(elapsedTime)}</div>
        </div>
        <div className="space-y-2">
          <Input
            placeholder="What are you working on?"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            disabled={isTracking}
            className="text-sm"
          />
        </div>
        <div className="space-y-2">
          <Select value={projectId} onValueChange={setProjectId} disabled={isTracking}>
            <SelectTrigger className="text-sm">
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
        {!isTracking ? (
          <Button onClick={() => setIsTracking(true)} className="w-full">
            <Play className="mr-2 h-4 w-4" />
            Start
          </Button>
        ) : (
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={() => setIsTracking(false)} className="flex-1">
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </Button>
            <Button variant="destructive" onClick={() => setIsTracking(false)} className="flex-1">
              <StopCircle className="mr-2 h-4 w-4" />
              Stop
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
