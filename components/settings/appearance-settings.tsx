"use client"

import type React from "react"

import { useState } from "react"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "next-themes"
import { useToast } from "@/components/ui/use-toast"

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState(theme || "system")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Apply theme
    setTheme(selectedTheme)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Appearance settings updated",
        description: "Your appearance preferences have been saved.",
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize the appearance of the application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Theme</h3>
          <RadioGroup value={selectedTheme} onValueChange={setSelectedTheme} className="grid grid-cols-3 gap-4">
            <div>
              <RadioGroupItem value="light" id="light" className="sr-only" />
              <Label
                htmlFor="light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-2 h-24 w-full rounded-md bg-[#f8fafc] border"></div>
                <span className="text-center">Light</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="dark" id="dark" className="sr-only" />
              <Label
                htmlFor="dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-2 h-24 w-full rounded-md bg-[#0f172a] border"></div>
                <span className="text-center">Dark</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="system" id="system" className="sr-only" />
              <Label
                htmlFor="system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-2 h-24 w-full rounded-md bg-gradient-to-r from-[#f8fafc] to-[#0f172a] border"></div>
                <span className="text-center">System</span>
              </Label>
            </div>
          </RadioGroup>
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
