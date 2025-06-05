"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { BarChart3, Users, MessageSquare, Settings, Menu, LogOut, Bell, Search } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { cn } from "../../lib/utils"
import { ChatbotButton } from "../features/ai/chatbot-button"
import type { User } from "../../types"
import { currentUser } from "../../data/mock-data"

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface RouteItem {
  label: string
  icon: React.ElementType
  href: string
  active: boolean
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()
  const pathname = location.pathname
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [user] = useState<User>(currentUser)

  const routes: RouteItem[] = [
    {
      label: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Patient List",
      icon: Users,
      href: "/patients",
      active: pathname === "/patients" || pathname.startsWith("/patients/"),
    },
    {
      label: "AI Assistant",
      icon: MessageSquare,
      href: "/ai-assistant",
      active: pathname === "/ai-assistant",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:max-w-xs">
            <nav className="flex flex-col gap-6">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => setIsSidebarOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                  <path d="M16 8h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-6" />
                  <path d="M16 17.1v.9h.9" />
                  <path d="m14 17.1-1.3-1.3" />
                  <path d="M5 11h5" />
                  <path d="M8 8v6" />
                </svg>
                MedVisor
              </Link>
              <div className="flex flex-col gap-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    to={route.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground",
                      route.active && "bg-secondary text-foreground",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link to="/dashboard" className="flex items-center gap-2 text-lg font-semibold md:text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <path d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
            <path d="M16 8h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-6" />
            <path d="M16 17.1v.9h.9" />
            <path d="m14 17.1-1.3-1.3" />
            <path d="M5 11h5" />
            <path d="M8 8v6" />
          </svg>
          <span className="hidden md:inline-block">MedVisor</span>
        </Link>
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="w-full rounded-lg bg-background pl-8 md:w-2/3 lg:w-1/3"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  {/* <AvatarImage src="https://via.placeholder.com/36" alt={user.name} /> */}
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="flex w-full items-center">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="flex w-full items-center">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/" className="flex w-full items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="grid gap-1 px-2 text-sm font-medium">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  to={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground",
                    route.active && "bg-secondary text-foreground",
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container relative py-6">{children}</div>
        </main>
      </div>
      <ChatbotButton />
    </div>
  )
}
