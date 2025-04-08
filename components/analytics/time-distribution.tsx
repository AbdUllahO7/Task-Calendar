"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

// Mock data for time distribution
const data = [
  { name: "Website Redesign", value: 35, color: "#3b82f6" },
  { name: "Mobile App Development", value: 25, color: "#ef4444" },
  { name: "Marketing Campaign", value: 15, color: "#22c55e" },
  { name: "Product Launch", value: 15, color: "#f59e0b" },
  { name: "Research Project", value: 10, color: "#a855f7" },
]

export function TimeDistribution() {
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
