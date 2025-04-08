"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for category breakdown
const data = [
  { name: "Work", tasks: 45 },
  { name: "Meeting", tasks: 23 },
  { name: "Planning", tasks: 18 },
  { name: "Research", tasks: 15 },
  { name: "Personal", tasks: 26 },
]

export function CategoryBreakdown() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              borderRadius: "var(--radius)",
            }}
          />
          <Bar dataKey="tasks" fill="var(--primary)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
