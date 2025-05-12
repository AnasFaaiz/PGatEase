"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect, useMemo, useCallback } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowUpRight, Building2, CreditCard, Users } from "lucide-react"
import { useRouter } from "next/navigation"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

// Historical data for trend calculations
const HISTORICAL_DATA = {
  lastMonth: {
    residents: 95,
    occupancyRate: 82,
    revenue: 485000,
    complaints: 15
  }
}

const INITIAL_PROPERTIES = [
  { 
    name: "Sunshine PG",
    address: "123 Main Street, Bangalore",
    occupied: 42,
    vacant: 8,
    totalCapacity: 50,
    facilities: ["WiFi", "AC", "Laundry", "Gym"],
    rules: "No smoking, No loud music after 10 PM",
    createdAt: "2024-01-01T00:00:00.000Z",
    monthlyRent: 8000
  },
  {
    name: "Green Valley PG",
    address: "456 Park Road, Bangalore",
    occupied: 28,
    vacant: 12,
    totalCapacity: 40,
    facilities: ["WiFi", "Power Backup", "Security"],
    rules: "No pets, Visitors allowed till 8 PM",
    createdAt: "2024-02-15T00:00:00.000Z",
    monthlyRent: 7500
  },
  {
    name: "City Heights PG",
    address: "789 Lake View, Bangalore",
    occupied: 35,
    vacant: 5,
    totalCapacity: 40,
    facilities: ["WiFi", "AC", "Food", "Garden"],
    rules: "No outside food, Daily curfew at 10 PM",
    createdAt: "2024-03-01T00:00:00.000Z",
    monthlyRent: 8500
  }
]

const ALERTS_DATA = [
  {
    title: "Water Leakage",
    severity: "High",
    location: "Room 302, Sunshine PG",
    time: "2 hours ago"
  },
  {
    title: "Electrical Issue",
    severity: "Medium",
    location: "Room 105, Green Valley PG",
    time: "5 hours ago"
  },
  {
    title: "AC Malfunction",
    severity: "Medium",
    location: "Room 201, City Heights PG",
    time: "Yesterday"
  }
]

export default function OwnerDashboard() {
  const router = useRouter()
  const [properties, setProperties] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load properties from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("properties")
    const initialProperties = saved ? JSON.parse(saved) : INITIAL_PROPERTIES
    setProperties(initialProperties)
    setIsLoaded(true)
  }, [])

  // Save to localStorage when properties change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("properties", JSON.stringify(properties))
    }
  }, [properties, isLoaded])

  // Calculate statistics
  const stats = useMemo(() => {
    if (!properties.length) return {
      residents: 0,
      totalRooms: 0,
      revenue: 0,
      occupancyRate: 0,
      complaints: 0
    }
    
    const calculated = properties.reduce((acc, property) => {
      acc.residents += property.occupied
      acc.totalRooms += (property.occupied + property.vacant)
      acc.revenue += property.occupied * (property.monthlyRent || 8000)
      return acc
    }, { residents: 0, totalRooms: 0, revenue: 0 })

    calculated.occupancyRate = (calculated.residents / calculated.totalRooms * 100).toFixed(1)
    calculated.complaints = Math.floor(Math.random() * 20)

    return calculated
  }, [properties])

  // Calculate trends
  const trends = useMemo(() => {
    const residentChange = ((stats.residents - HISTORICAL_DATA.lastMonth.residents) / 
      HISTORICAL_DATA.lastMonth.residents * 100).toFixed(1)
    
    const occupancyChange = (parseFloat(stats.occupancyRate) - HISTORICAL_DATA.lastMonth.occupancyRate).toFixed(1)
    
    const revenueChange = ((stats.revenue - HISTORICAL_DATA.lastMonth.revenue) / 
      HISTORICAL_DATA.lastMonth.revenue * 100).toFixed(1)

    const complaintChange = ((stats.complaints - HISTORICAL_DATA.lastMonth.complaints) / 
      HISTORICAL_DATA.lastMonth.complaints * 100).toFixed(1)

    return {
      residents: { value: stats.residents, change: residentChange, increasing: residentChange > 0 },
      occupancy: { value: stats.occupancyRate, change: occupancyChange, increasing: occupancyChange > 0 },
      revenue: { value: stats.revenue, change: revenueChange, increasing: revenueChange > 0 },
      complaints: { value: stats.complaints, change: complaintChange, increasing: complaintChange < 0 }
    }
  }, [stats])

  // Generate payment data
  const paymentData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const baseRevenue = stats.revenue
    return months.map((month, index) => ({
      name: month,
      amount: Math.floor(baseRevenue * (0.95 + (index * 0.01))),
      occupied: stats.residents - Math.floor(Math.random() * 10)
    }))
  }, [stats.revenue, stats.residents])

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const renderStatCard = (title, value, icon, trend) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend.increasing ? '+' : ''}{trend.change}% from last month
          <ArrowUpRight className={`ml-1 h-3 w-3 ${
            trend.increasing === (title === "Active Complaints" ? false : true) 
              ? 'text-green-500' 
              : 'text-red-500 transform rotate-90'
          }`} />
        </div>
      </CardContent>
    </Card>
  )

  const renderAlert = (title, severity, location, time) => (
    <div className="flex items-start gap-4 rounded-lg border p-3">
      <AlertCircle className={`mt-0.5 h-5 w-5 ${
        severity === 'High' ? 'text-red-500' : 'text-amber-500'
      }`} />
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-semibold">{title}</h4>
          <Badge variant={severity === 'High' ? "destructive" : "outline"}>{severity}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{location}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )

  if (!isLoaded) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          <p className="text-muted-foreground">Overview of your PG properties</p>
        </div>
        <Button onClick={() => router.push("/owner/dashboard/add-property")}>
          <Building2 className="mr-2 h-4 w-4" /> Add New Property
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {renderStatCard(
          "Total Residents",
          trends.residents.value.toString(),
          <Users className="h-4 w-4 text-muted-foreground" />,
          trends.residents
        )}
        {renderStatCard(
          "Occupancy Rate",
          `${trends.occupancy.value}%`,
          <Building2 className="h-4 w-4 text-muted-foreground" />,
          trends.occupancy
        )}
        {renderStatCard(
          "Monthly Revenue",
          formatCurrency(trends.revenue.value),
          <CreditCard className="h-4 w-4 text-muted-foreground" />,
          trends.revenue
        )}
        {renderStatCard(
          "Active Complaints",
          trends.complaints.value.toString(),
          <AlertCircle className="h-4 w-4 text-muted-foreground" />,
          trends.complaints
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Occupancy Overview</CardTitle>
            <CardDescription>
              Current occupancy across all properties ({trends.occupancy.value}% overall)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={properties}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  `${value} rooms`,
                  name === "occupied" ? "Occupied" : "Vacant"
                ]} />
                <Legend />
                <Bar dataKey="occupied" fill="#0088FE" name="Occupied" stackId="stack" />
                <Bar dataKey="vacant" fill="#FF8042" name="Vacant" stackId="stack" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={paymentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="amount" fill="#00C49F" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Complaint Categories</CardTitle>
            <CardDescription>Distribution of complaints by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Maintenance", value: 45, count: 15 },
                      { name: "Food Quality", value: 30, count: 10 },
                      { name: "Cleanliness", value: 15, count: 5 },
                      { name: "Others", value: 10, count: 3 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {({ data }) => data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest emergency alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ALERTS_DATA.map((alert, index) => (
                renderAlert(
                  alert.title,
                  alert.severity,
                  alert.location,
                  alert.time
                )
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}