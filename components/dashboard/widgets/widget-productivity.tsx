"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for productivity chart
const data = [
  { date: "Jan", score: 6.5 },
  { date: "Feb", score: 7.2 },
  { date: "Mar", score: 6.8 },
  { date: "Apr", score: 7.5 },
  { date: "May", score: 7.8 },
  { date: "Jun", score: 8.0 },
  { date: "Jul", score: 7.7 },
  { date: "Aug", score: 8.2 },
  { date: "Sep", score: 8.5 },
  { date: "Oct", score: 8.3 },
  { date: "Nov", score: 8.6 },
  { date: "Dec", score: 8.7 },
]

export function WidgetProductivity() {
  return (
    <div className="space-y-4 h-full">
      <h3 className="font-semibold text-sm">Productivity Trends</h3>
      <div className="h-[calc(100%-2rem)]">
        <ResponsiveContainer width="100%" height="100%">
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
      </div>
    </div>
  )
}
