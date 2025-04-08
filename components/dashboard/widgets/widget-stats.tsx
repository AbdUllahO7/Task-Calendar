"use client"

import { Card, CardContent } from "@/components/ui/card"

export function WidgetStats() {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm">Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">127</div>
              <div className="text-xs text-muted-foreground">Total Tasks</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">83</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">142.5</div>
              <div className="text-xs text-muted-foreground">Hours</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
