import type React from "react"
import { Sidebar, SidebarProvider } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 bg-muted/40 pb-12 pt-8 px-4 sm:px-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
        <MobileNav />
      </div>
    </SidebarProvider>
  )
}
