"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, CheckSquare, LayoutDashboard, BarChart3, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/dashboard/sidebar"

export function MobileNav() {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background lg:hidden">
      <div className="grid h-full grid-cols-5">
        <Button
          variant="ghost"
          className="flex flex-col items-center justify-center rounded-none"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="text-xs mt-1">Menu</span>
        </Button>
        <Link
          href="/dashboard"
          className={cn(
            "flex flex-col items-center justify-center",
            pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        <Link
          href="/calendar"
          className={cn(
            "flex flex-col items-center justify-center",
            pathname === "/calendar" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">Calendar</span>
        </Link>
        <Link
          href="/tasks"
          className={cn(
            "flex flex-col items-center justify-center",
            pathname === "/tasks" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <CheckSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Tasks</span>
        </Link>
        <Link
          href="/analytics"
          className={cn(
            "flex flex-col items-center justify-center",
            pathname === "/analytics" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <BarChart3 className="h-5 w-5" />
          <span className="text-xs mt-1">Analytics</span>
        </Link>
      </div>
    </div>
  )
}
