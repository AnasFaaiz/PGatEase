"use client"

import React from 'react' // Added React import
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  AlertTriangle,
  ArrowDownUp,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Flame,
  Heart,
  LifeBuoy,
  RefreshCw,
  Shield,
  UserRoundCog,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useIsMobile } from "@/hooks/use-mobile"

// Sample emergency alerts data
const emergencyAlerts = [
  {
    id: 1,
    residentName: "Aditya Patel",
    roomNumber: "203",
    emergencyType: "Medical",
    description: "Feeling dizzy and having difficulty breathing",
    timestamp: "2024-04-21T08:30:00",
    status: "Active",
    severity: "High",
    pgName: "Sunshine PG",
  },
  {
    id: 2,
    residentName: "Priya Sharma",
    roomNumber: "105",
    emergencyType: "Security",
    description: "Suspicious person loitering near the building",
    timestamp: "2024-04-21T07:45:00",
    status: "Active",
    severity: "Medium",
    pgName: "Sunshine PG",
  },
  {
    id: 3,
    residentName: "Rahul Verma",
    roomNumber: "302",
    emergencyType: "Maintenance",
    description: "Water leakage from ceiling, risk of electrical short circuit",
    timestamp: "2024-04-21T06:15:00",
    status: "Assigned",
    severity: "Medium",
    assignedTo: "Maintenance Team",
    pgName: "Sunshine PG",
  },
  {
    id: 4,
    residentName: "Neha Gupta",
    roomNumber: "201",
    emergencyType: "Fire",
    description: "Smoke coming from kitchen area",
    timestamp: "2024-04-20T22:10:00",
    status: "Resolved",
    severity: "High",
    resolvedAt: "2024-04-20T22:30:00",
    resolution: "False alarm - burnt toast",
    pgName: "Sunshine PG",
  },
  {
    id: 5,
    residentName: "Vikram Singh",
    roomNumber: "104",
    emergencyType: "Medical",
    description: "Severe stomach pain",
    timestamp: "2024-04-20T18:45:00",
    status: "Resolved",
    severity: "High",
    resolvedAt: "2024-04-20T19:30:00",
    resolution: "Ambulance called, resident taken to hospital",
    pgName: "Green Valley PG",
  },
  {
    id: 6,
    residentName: "Ananya Reddy",
    roomNumber: "305",
    emergencyType: "Security",
    description: "Lost room key, unable to enter room",
    timestamp: "2024-04-20T16:20:00",
    status: "Resolved",
    severity: "Low",
    resolvedAt: "2024-04-20T16:45:00",
    resolution: "Provided spare key",
    pgName: "Sunshine PG",
  },
  {
    id: 7,
    residentName: "Karan Malhotra",
    roomNumber: "102",
    emergencyType: "Maintenance",
    description: "Power outage in room",
    timestamp: "2024-04-20T14:10:00",
    status: "Resolved",
    severity: "Medium",
    resolvedAt: "2024-04-20T15:00:00",
    resolution: "Reset circuit breaker",
    pgName: "City Heights PG",
  },
  {
    id: 8,
    residentName: "Divya Patel",
    roomNumber: "204",
    emergencyType: "Medical",
    description: "Sprained ankle, needs assistance",
    timestamp: "2024-04-19T20:30:00",
    status: "Resolved",
    severity: "Medium",
    resolvedAt: "2024-04-19T21:00:00",
    resolution: "First aid provided, ice pack given",
    pgName: "Sunshine PG",
  },
]

// Sample response teams
const responseTeams = [
  { id: 1, name: "Medical Team", type: "Medical" },
  { id: 2, name: "Security Team", type: "Security" },
  { id: 3, name: "Maintenance Team", type: "Maintenance" },
  { id: 4, name: "Fire Response Team", type: "Fire" },
  { id: 5, name: "Management Team", type: "General" },
]

export default function EmergencyAlertsPage() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState("all")
  const [selectedPg, setSelectedPg] = useState("Sunshine PG")
  const [filters, setFilters] = useState({
    type: [],
    severity: [],
    dateRange: "all",
  })

  // Filter alerts based on selected PG and other filters
  const filteredAlerts = emergencyAlerts
    .filter((alert) => alert.pgName === selectedPg)
    .filter((alert) => {
      // Filter by status based on active tab
      if (activeTab === "active" && alert.status === "Resolved") return false
      if (activeTab === "resolved" && alert.status !== "Resolved") return false

      // Filter by emergency type
      if (filters.type.length > 0 && !filters.type.includes(alert.emergencyType)) return false

      // Filter by severity
      if (filters.severity.length > 0 && !filters.severity.includes(alert.severity)) return false

      // Filter by date range
      if (filters.dateRange !== "all") {
        const alertDate = new Date(alert.timestamp)
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const lastWeek = new Date(today)
        lastWeek.setDate(lastWeek.getDate() - 7)

        if (
          (filters.dateRange === "today" && alertDate.toDateString() !== today.toDateString()) ||
          (filters.dateRange === "yesterday" && alertDate.toDateString() !== yesterday.toDateString()) ||
          (filters.dateRange === "week" && alertDate < lastWeek)
        ) {
          return false
        }
      }

      return true
    })

  // Count alerts by status
  const activeAlertsCount = emergencyAlerts.filter(
    (alert) => alert.pgName === selectedPg && alert.status !== "Resolved",
  ).length
  const resolvedAlertsCount = emergencyAlerts.filter(
    (alert) => alert.pgName === selectedPg && alert.status === "Resolved",
  ).length

  // Count alerts by type
  const alertsByType = {
    Medical: emergencyAlerts.filter((alert) => alert.pgName === selectedPg && alert.emergencyType === "Medical").length,
    Security: emergencyAlerts.filter((alert) => alert.pgName === selectedPg && alert.emergencyType === "Security")
      .length,
    Maintenance: emergencyAlerts.filter((alert) => alert.pgName === selectedPg && alert.emergencyType === "Maintenance")
      .length,
    Fire: emergencyAlerts.filter((alert) => alert.pgName === selectedPg && alert.emergencyType === "Fire").length,
  }

  // Function to get icon based on emergency type
  const getEmergencyIcon = (type) => {
    switch (type) {
      case "Medical":
        return <Heart className="h-5 w-5 text-red-500" />
      case "Security":
        return <Shield className="h-5 w-5 text-blue-500" />
      case "Maintenance":
        return <UserRoundCog className="h-5 w-5 text-amber-500" />
      case "Fire":
        return <Flame className="h-5 w-5 text-orange-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  // Function to get badge color based on severity
  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "High":
        return <Badge variant="destructive">High</Badge>
      case "Medium":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            Medium
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge variant="destructive">Active</Badge>
      case "Assigned":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Assigned
          </Badge>
        )
      case "Resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  // Function to calculate time elapsed
  const getTimeElapsed = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
    } else {
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`
    }
  }

  // Toggle filter selection
  const toggleFilter = (filterType, value) => {
    setFilters((prev) => {
      const currentFilters = [...prev[filterType]]
      const index = currentFilters.indexOf(value)

      if (index === -1) {
        currentFilters.push(value)
      } else {
        currentFilters.splice(index, 1)
      }

      return {
        ...prev,
        [filterType]: currentFilters,
      }
    })
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      type: [],
      severity: [],
      dateRange: "all",
    })
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Emergency Alerts</h1>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">
                Manage emergency alerts for <span className="font-medium text-foreground">{selectedPg}</span>
              </p>
              <Select value={selectedPg} onValueChange={setSelectedPg}>
                <SelectTrigger className="h-7 w-[180px]">
                  <SelectValue placeholder="Select PG" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Properties</SelectLabel>
                    <SelectItem value="Sunshine PG">Sunshine PG</SelectItem>
                    <SelectItem value="Green Valley PG">Green Valley PG</SelectItem>
                    <SelectItem value="City Heights PG">City Heights PG</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => console.log("Refreshing alerts...")}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Test Alert System
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlertsCount}</div>
            <p className="text-xs text-muted-foreground">
              {activeAlertsCount > 0
                ? `${activeAlertsCount} alert${activeAlertsCount > 1 ? "s" : ""} requiring attention`
                : "No active alerts"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedAlertsCount}</div>
            <p className="text-xs text-muted-foreground">
              {resolvedAlertsCount} alert{resolvedAlertsCount !== 1 ? "s" : ""} resolved
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Medical Emergencies</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alertsByType.Medical}</div>
            <p className="text-xs text-muted-foreground">
              {alertsByType.Medical > 0
                ? `${
                    emergencyAlerts.filter(
                      (alert) =>
                        alert.pgName === selectedPg && alert.emergencyType === "Medical" && alert.status !== "Resolved",
                    ).length
                  } active`
                : "No medical emergencies"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 min</div>
            <p className="text-xs text-muted-foreground">Average response time</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Emergency Alert Feed</CardTitle>
              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                      {(filters.type.length > 0 || filters.severity.length > 0 || filters.dateRange !== "all") && (
                        <Badge variant="secondary" className="ml-2 rounded-sm px-1">
                          {filters.type.length + filters.severity.length + (filters.dateRange !== "all" ? 1 : 0)}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter Alerts</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      Emergency Type
                    </DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={filters.type.includes("Medical")}
                      onCheckedChange={() => toggleFilter("type", "Medical")}
                    >
                      Medical
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.type.includes("Security")}
                      onCheckedChange={() => toggleFilter("type", "Security")}
                    >
                      Security
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.type.includes("Maintenance")}
                      onCheckedChange={() => toggleFilter("type", "Maintenance")}
                    >
                      Maintenance
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.type.includes("Fire")}
                      onCheckedChange={() => toggleFilter("type", "Fire")}
                    >
                      Fire
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      Severity
                    </DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={filters.severity.includes("High")}
                      onCheckedChange={() => toggleFilter("severity", "High")}
                    >
                      High
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.severity.includes("Medium")}
                      onCheckedChange={() => toggleFilter("severity", "Medium")}
                    >
                      Medium
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.severity.includes("Low")}
                      onCheckedChange={() => toggleFilter("severity", "Low")}
                    >
                      Low
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      Date Range
                    </DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={filters.dateRange === "all"}
                      onCheckedChange={() => setFilters({ ...filters, dateRange: "all" })}
                    >
                      All Time
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.dateRange === "today"}
                      onCheckedChange={() => setFilters({ ...filters, dateRange: "today" })}
                    >
                      Today
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.dateRange === "yesterday"}
                      onCheckedChange={() => setFilters({ ...filters, dateRange: "yesterday" })}
                    >
                      Yesterday
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.dateRange === "week"}
                      onCheckedChange={() => setFilters({ ...filters, dateRange: "week" })}
                    >
                      Last 7 Days
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative w-full sm:w-64">
                  <Input type="search" placeholder="Search alerts..." className="w-full" />
                </div>
                <Button variant="outline" size="sm">
                  <ArrowDownUp className="mr-2 h-4 w-4" />
                  Sort
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  All Alerts
                  <Badge variant="secondary" className="ml-2">
                    {emergencyAlerts.filter((alert) => alert.pgName === selectedPg).length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active
                  <Badge variant="secondary" className="ml-2">
                    {activeAlertsCount}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="resolved">
                  Resolved
                  <Badge variant="secondary" className="ml-2">
                    {resolvedAlertsCount}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => (
                    <Card key={alert.id} className="overflow-hidden">
                      <div
                        className={`h-1 w-full ${
                          alert.severity === "High"
                            ? "bg-red-500"
                            : alert.severity === "Medium"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              {getEmergencyIcon(alert.emergencyType)}
                              <span className="font-medium">{alert.emergencyType} Emergency</span>
                              {getSeverityBadge(alert.severity)}
                              {getStatusBadge(alert.status)}
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={`/placeholder.svg?height=30&width=30`} />
                                <AvatarFallback>
                                  {alert.residentName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>
                                <span className="font-medium">{alert.residentName}</span> - Room {alert.roomNumber}
                              </span>
                            </div>
                            <p className="text-sm">{alert.description}</p>
                            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(alert.timestamp)}
                              </span>
                              <span>{getTimeElapsed(alert.timestamp)}</span>
                            </div>
                            {alert.status === "Assigned" && (
                              <div className="mt-2 text-xs">
                                <span className="text-muted-foreground">Assigned to: </span>
                                <span className="font-medium">{alert.assignedTo}</span>
                              </div>
                            )}
                            {alert.status === "Resolved" && (
                              <div className="mt-2 text-xs">
                                <span className="text-muted-foreground">Resolution: </span>
                                <span>{alert.resolution}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-row gap-2 md:flex-col">
                            {alert.status !== "Resolved" && (
                              <>
                                <Select>
                                  <SelectTrigger className="h-8 w-full md:w-[180px]">
                                    <SelectValue placeholder="Assign to team" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Response Teams</SelectLabel>
                                      {responseTeams.map((team) => (
                                        <SelectItem key={team.id} value={team.name}>
                                          {team.name}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={() => console.log(`Marking alert ${alert.id} as resolved`)}
                                >
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Mark Resolved
                                </Button>
                              </>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full"
                              onClick={() => console.log(`Viewing details for alert ${alert.id}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <AlertTriangle className="mb-2 h-10 w-10 text-muted-foreground" />
                    <h3 className="mb-1 text-lg font-medium">No alerts found</h3>
                    <p className="text-sm text-muted-foreground">
                      {filters.type.length > 0 || filters.severity.length > 0 || filters.dateRange !== "all"
                        ? "Try adjusting your filters to see more results."
                        : "There are no emergency alerts for this PG property."}
                    </p>
                    {(filters.type.length > 0 || filters.severity.length > 0 || filters.dateRange !== "all") && (
                      <Button variant="outline" className="mt-4" onClick={resetFilters}>
                        Reset Filters
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="active" className="space-y-4">
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => (
                    <Card key={alert.id} className="overflow-hidden">
                      <div
                        className={`h-1 w-full ${
                          alert.severity === "High"
                            ? "bg-red-500"
                            : alert.severity === "Medium"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              {getEmergencyIcon(alert.emergencyType)}
                              <span className="font-medium">{alert.emergencyType} Emergency</span>
                              {getSeverityBadge(alert.severity)}
                              {getStatusBadge(alert.status)}
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={`/placeholder.svg?height=30&width=30`} />
                                <AvatarFallback>
                                  {alert.residentName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>
                                <span className="font-medium">{alert.residentName}</span> - Room {alert.roomNumber}
                              </span>
                            </div>
                            <p className="text-sm">{alert.description}</p>
                            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(alert.timestamp)}
                              </span>
                              <span>{getTimeElapsed(alert.timestamp)}</span>
                            </div>
                            {alert.status === "Assigned" && (
                              <div className="mt-2 text-xs">
                                <span className="text-muted-foreground">Assigned to: </span>
                                <span className="font-medium">{alert.assignedTo}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-row gap-2 md:flex-col">
                            <Select>
                              <SelectTrigger className="h-8 w-full md:w-[180px]">
                                <SelectValue placeholder="Assign to team" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Response Teams</SelectLabel>
                                  {responseTeams.map((team) => (
                                    <SelectItem key={team.id} value={team.name}>
                                      {team.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() => console.log(`Marking alert ${alert.id} as resolved`)}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark Resolved
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full"
                              onClick={() => console.log(`Viewing details for alert ${alert.id}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <CheckCircle2 className="mb-2 h-10 w-10 text-green-500" />
                    <h3 className="mb-1 text-lg font-medium">No active alerts</h3>
                    <p className="text-sm text-muted-foreground">
                      There are no active emergency alerts for this PG property.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="resolved" className="space-y-4">
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => (
                    <Card key={alert.id} className="overflow-hidden">
                      <div className="h-1 w-full bg-green-500" />
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              {getEmergencyIcon(alert.emergencyType)}
                              <span className="font-medium">{alert.emergencyType} Emergency</span>
                              {getSeverityBadge(alert.severity)}
                              {getStatusBadge(alert.status)}
                            </div>
                            <div className="mb-2 flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={`/placeholder.svg?height=30&width=30`} />
                                <AvatarFallback>
                                  {alert.residentName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>
                                <span className="font-medium">{alert.residentName}</span> - Room {alert.roomNumber}
                              </span>
                            </div>
                            <p className="text-sm">{alert.description}</p>
                            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(alert.timestamp)}
                              </span>
                              <span>{getTimeElapsed(alert.timestamp)}</span>
                            </div>
                            <div className="mt-2 text-xs">
                              <span className="text-muted-foreground">Resolution: </span>
                              <span>{alert.resolution}</span>
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              Resolved at {formatDate(alert.resolvedAt)}
                            </div>
                          </div>
                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full"
                              onClick={() => console.log(`Viewing details for alert ${alert.id}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <LifeBuoy className="mb-2 h-10 w-10 text-muted-foreground" />
                    <h3 className="mb-1 text-lg font-medium">No resolved alerts</h3>
                    <p className="text-sm text-muted-foreground">
                      There are no resolved emergency alerts for this PG property.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredAlerts.length} of {emergencyAlerts.filter((alert) => alert.pgName === selectedPg).length}{" "}
              alerts
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
