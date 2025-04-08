"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

// Mock data for task status
const statusData = [
  { name: "Completed", value: 83, color: "#22c55e" },
  { name: "In Progress", value: 32, color: "#3b82f6" },
  { name: "Not Started", value: 12, color: "#f59e0b" },
]

// Mock data for task priority
const priorityData = [
  { name: "High", value: 25, color: "#ef4444" },
  { name: "Medium", value: 45, color: "#f59e0b" },
  { name: "Low", value: 57, color: "#22c55e" },
]

export function WidgetTaskSummary() {
  return (
    <div className="space-y-4 h-full">
      <h3 className="font-semibold text-sm">Task Summary</h3>
      <div className="flex flex-col h-[calc(100%-2rem)] justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
