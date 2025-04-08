"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for productivity chart
const data = [
  { date: "Jan 1", score: 6.5 },
  { date: "Jan 8", score: 7.2 },
  { date: "Jan 15", score: 6.8 },
  { date: "Jan 22", score: 7.5 },
  { date: "Jan 29", score: 7.8 },
  { date: "Feb 5", score: 8.0 },
  { date: "Feb 12", score: 7.7 },
  { date: "Feb 19", score: 8.2 },
  { date: "Feb 26", score: 8.5 },
  { date: "Mar 5", score: 8.3 },
  { date: "Mar 12", score: 8.6 },
  { date: "Mar 19", score: 8.4 },
  { date: "Mar 26", score: 8.7 },
  { date: "Apr 2", score: 8.9 },
]

export function ProductivityChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={[5, 10]}
          ticks={[5, 6, 7, 8, 9, 10]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
          }}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="var(--primary)"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
