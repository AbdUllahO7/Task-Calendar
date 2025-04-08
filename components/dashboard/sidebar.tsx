"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  CheckSquare,
  Clock,
  FileText,
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  FolderKanban,
  ChevronLeft,
  Plus,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
import { createContext, useContext, useEffect, useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"

// Sidebar context
type SidebarContextType = {
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [expanded, setExpanded] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useIsMobile()

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-expanded")
    if (savedState !== null) {
      setExpanded(savedState === "true")
    }
  }, [])

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", expanded.toString())
  }, [expanded])

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen)
    } else {
      setExpanded(!expanded)
    }
  }

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded, toggleSidebar, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { expanded, toggleSidebar, mobileOpen, setMobileOpen } = useSidebar()
  const isMobile = useIsMobile()

  // Navigation items
  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/calendar", icon: Calendar, label: "Calendar" },
    { href: "/tasks", icon: CheckSquare, label: "Tasks" },
    { href: "/projects", icon: FolderKanban, label: "Projects" },
    { href: "/time-tracking", icon: Clock, label: "Time Tracking" },
    { href: "/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/team", icon: Users, label: "Team" },
  ]

  // Projects data
  const projects = [
    { id: "1", name: "Website Redesign", color: "bg-sky-500" },
    { id: "2", name: "Mobile App Development", color: "bg-rose-500" },
    { id: "3", name: "Marketing Campaign", color: "bg-emerald-500" },
    { id: "4", name: "Product Launch", color: "bg-amber-500" },
    { id: "5", name: "Research Project", color: "bg-purple-500" },
  ]

  // Mobile sidebar
  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <div className="h-full flex flex-col bg-background border-r">
            <div className="p-4 border-b">
              <div className="flex items-center gap-2 font-semibold">
                <span className="h-6 w-6 rounded-full bg-primary"></span>
                <h2 className="text-xl font-bold">TaskMaster</h2>
              </div>
              <div className="mt-3">
                <Button className="w-full justify-start" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="px-3 py-2">
                <nav className="grid gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="px-3 py-2">
                <div className="flex items-center justify-between px-4">
                  <h3 className="text-xs font-semibold text-muted-foreground">Projects</h3>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Add project</span>
                  </Button>
                </div>
                <div className="mt-2 space-y-1">
                  {projects.map((project) => (
                    <Button key={project.id} variant="ghost" className="w-full justify-start font-normal" size="sm">
                      <span className={`h-2 w-2 rounded-full ${project.color} mr-2`}></span>
                      {project.name}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
            <div className="p-3 border-t">
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "group/sidebar relative hidden h-screen flex-col border-r bg-background transition-all duration-300 ease-in-out md:flex",
          expanded ? "w-64" : "w-16",
          className,
        )}
      >
        {/* Toggle button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background shadow-md"
          onClick={toggleSidebar}
        >
          {expanded ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        </Button>

        {/* Header */}
        <div className={cn("flex h-14 items-center border-b px-4", expanded ? "justify-between" : "justify-center")}>
          {expanded ? (
            <div className="flex items-center gap-2 font-semibold">
              <span className="h-6 w-6 rounded-full bg-primary"></span>
              <h2 className="text-xl font-bold">TaskMaster</h2>
            </div>
          ) : (
            <span className="h-6 w-6 rounded-full bg-primary"></span>
          )}
        </div>

        {/* New Task Button */}
        <div className={cn("p-2", expanded ? "px-4" : "px-2")}>
          {expanded ? (
            <Button className="w-full justify-start" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              New Task
            </Button>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" className="w-full h-9">
                  <FileText className="h-4 w-4" />
                  <span className="sr-only">New Task</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">New Task</TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-2">
          <nav className={cn("grid gap-1", expanded ? "px-2" : "px-1")}>
            {navItems.map((item) => {
              if (expanded) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              }

              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              )
            })}
          </nav>

          {/* Projects section */}
          {expanded ? (
            <div className="mt-4 px-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-muted-foreground">Projects</h3>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Add project</span>
                </Button>
              </div>
              <div className="mt-2 space-y-1">
                {projects.map((project) => (
                  <Button key={project.id} variant="ghost" className="w-full justify-start font-normal" size="sm">
                    <span className={`h-2 w-2 rounded-full ${project.color} mr-2`}></span>
                    {project.name}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-4 px-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-full h-8 justify-center">
                    <FolderKanban className="h-4 w-4" />
                    <span className="sr-only">Projects</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Projects</TooltipContent>
              </Tooltip>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className={cn("border-t p-2", expanded ? "px-4" : "px-1")}>
          {expanded ? (
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="w-full h-9" asChild>
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Settings</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
