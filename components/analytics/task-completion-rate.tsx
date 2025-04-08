"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

// Mock data for task completion rate
const data = [
  { name: "Completed On Time", value: 65, color: "#22c55e" },
  { name: "Completed Late", value: 13, color: "#f59e0b" },
  { name: "Not Completed", value: 22, color: "#ef4444" },
]

export function TaskCompletionRate() {
  return (
    <div className="h-[300px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
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
  )
}
