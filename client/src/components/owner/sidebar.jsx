"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  AlertCircle,
  BarChart3,
  Building2,
  ChevronDown,
  CreditCard,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  Utensils,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

// Mock data for PG properties
const pgProperties = [
  { id: 1, name: "Sunshine PG", location: "Madhapur" },
  { id: 2, name: "Green Valley PG", location: "Gachibowli" },
  { id: 3, name: "City Heights PG", location: "Hitech City" },
]

export function OwnerSidebar({ children }) {
  const pathname = usePathname()
  const [selectedPg, setSelectedPg] = useState(pgProperties[0])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar variant="inset" className="border-r">
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-2 py-3">
              <div className="rounded-lg bg-blue-600 p-1 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-lg font-bold">PGatEase</span>
              <Badge variant="outline" className="ml-auto">
                Owner
              </Badge>
            </div>
            <Collapsible className="px-2 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="flex w-full justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{selectedPg.name}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-1">
                {pgProperties.map((pg) => (
                  <Button
                    key={pg.id}
                    variant={pg.id === selectedPg.id ? "secondary" : "ghost"}
                    className="w-full justify-start pl-6 text-left"
                    onClick={() => setSelectedPg(pg)}
                  >
                    {pg.name}
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/owner/dashboard"}>
                      <Link href="/owner/dashboard">
                        <Home className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/owner/residents"}>
                      <Link href="/owner/residents">
                        <Users className="h-4 w-4" />
                        <span>Residents</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/owner/complaints"}>
                      <Link href="/owner/complaints">
                        <MessageSquare className="h-4 w-4" />
                        <span>Complaints</span>
                        <Badge className="ml-auto">3</Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/owner/alerts"}>
                      <Link href="/owner/alerts">
                        <AlertCircle className="h-4 w-4" />
                        <span>Emergency Alerts</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/owner/payments"}>
                      <Link href="/owner/payments">
                        <CreditCard className="h-4 w-4" />
                        <span>Payments</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/owner/food"}>
                      <Link href="/owner/food">
                        <Utensils className="h-4 w-4" />
                        <span>Food Selection</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/owner/analytics"}>
                      <Link href="/owner/analytics">
                        <BarChart3 className="h-4 w-4" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/owner/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <div className="flex items-center gap-3 px-4 py-3">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Rahul Kumar</span>
                <span className="text-xs text-muted-foreground">rahul@pgease.com</span>
              </div>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <div className="flex-1">{children}</div>
      </div>
    </SidebarProvider>
  )
}