"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for the chart
const data = [
  {
    name: "Jan",
    total: 45,
    completed: 32,
  },
  {
    name: "Feb",
    total: 63,
    completed: 48,
  },
  {
    name: "Mar",
    total: 58,
    completed: 40,
  },
  {
    name: "Apr",
    total: 75,
    completed: 52,
  },
  {
    name: "May",
    total: 90,
    completed: 70,
  },
  {
    name: "Jun",
    total: 83,
    completed: 65,
  },
  {
    name: "Jul",
    total: 71,
    completed: 50,
  },
  {
    name: "Aug",
    total: 65,
    completed: 45,
  },
  {
    name: "Sep",
    total: 80,
    completed: 60,
  },
  {
    name: "Oct",
    total: 95,
    completed: 75,
  },
  {
    name: "Nov",
    total: 110,
    completed: 83,
  },
  {
    name: "Dec",
    total: 127,
    completed: 93,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
          }}
          cursor={false}
        />
        <Bar dataKey="total" fill="var(--primary)" radius={[4, 4, 0, 0]} name="Total Tasks" />
        <Bar dataKey="completed" fill="var(--primary-foreground)" radius={[4, 4, 0, 0]} name="Completed" />
      </BarChart>
    </ResponsiveContainer>
  )
}
