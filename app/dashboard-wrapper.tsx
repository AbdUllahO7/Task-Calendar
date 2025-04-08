import { Suspense } from "react"
import { SimpleDashboard } from "@/components/dashboard/widgets/simple-dashboard"

export default function DashboardWrapper() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading dashboard...</div>}>
      <SimpleDashboard />
    </Suspense>
  )
}
