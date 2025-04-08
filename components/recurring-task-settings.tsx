"use client"

import { useState } from "react"
import { RotateCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface RecurringTaskSettingsProps {
  onSettingsChange: (settings: RecurringSettings) => void
}

export interface RecurringSettings {
  isRecurring: boolean
  frequency: "daily" | "weekly" | "monthly" | "yearly"
  endDate?: Date
  occurrences?: number
}

export default function RecurringTaskSettings({ onSettingsChange }: RecurringTaskSettingsProps) {
  const [isRecurring, setIsRecurring] = useState(false)
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly" | "yearly">("weekly")

  const handleRecurringChange = (checked: boolean) => {
    setIsRecurring(checked)
    onSettingsChange({
      isRecurring: checked,
      frequency,
    })
  }

  const handleFrequencyChange = (value: "daily" | "weekly" | "monthly" | "yearly") => {
    setFrequency(value)
    if (isRecurring) {
      onSettingsChange({
        isRecurring,
        frequency: value,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="recurring-task" checked={isRecurring} onCheckedChange={handleRecurringChange} />
        <Label htmlFor="recurring-task" className="flex items-center">
          <RotateCw className="h-4 w-4 mr-2" />
          Recurring Task
        </Label>
      </div>

      {isRecurring && (
        <div className="pl-6 border-l-2 border-slate-200 dark:border-slate-700">
          <div className="space-y-2">
            <Label htmlFor="frequency">Repeat frequency</Label>
            <Select value={frequency} onValueChange={handleFrequencyChange}>
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}
