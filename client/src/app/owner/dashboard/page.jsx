"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "recharts" // Changed from local import to recharts package
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowUpRight, Building2, CreditCard, Users } from "lucide-react"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function OwnerDashboard() {
  // Sample data for charts - In a real app, this would come from an API
  const occupancyData = [
    { name: "Sunshine PG", occupied: 42, vacant: 8 },
    { name: "Green Valley PG", occupied: 28, vacant: 12 },
    { name: "City Heights PG", occupied: 35, vacant: 5 },
  ]

  const paymentData = [
    { name: "Jan", amount: 120000 },
    { name: "Feb", amount: 150000 },
    { name: "Mar", amount: 145000 },
    { name: "Apr", amount: 160000 },
    { name: "May", amount: 175000 },
    { name: "Jun", amount: 190000 },
  ]

  const complaintData = [
    { name: "Maintenance", value: 45 },
    { name: "Food", value: 30 },
    { name: "Cleanliness", value: 15 },
    { name: "Others", value: 10 },
  ]

  const renderStatCard = (title, value, icon, subtext) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </CardContent>
    </Card>
  )

  const renderAlert = (title, severity, location, time) => (
    <div className="flex items-start gap-4 rounded-lg border p-3">
      <AlertCircle className={`mt-0.5 h-5 w-5 ${severity === 'High' ? 'text-red-500' : 'text-amber-500'}`} />
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

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          <p className="text-muted-foreground">Overview of your PG properties</p>
        </div>
        <Button>
          <Building2 className="mr-2 h-4 w-4" /> Add New Property
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {renderStatCard(
          "Total Residents",
          "105",
          <Users className="h-4 w-4 text-muted-foreground" />,
          <>+12% from last month <ArrowUpRight className="ml-1 inline h-3 w-3" /></>
        )}
        {renderStatCard(
          "Occupancy Rate",
          "87.5%",
          <Building2 className="h-4 w-4 text-muted-foreground" />,
          <>+5% from last month <ArrowUpRight className="ml-1 inline h-3 w-3" /></>
        )}
        {renderStatCard(
          "Monthly Revenue",
          "₹5,25,000",
          <CreditCard className="h-4 w-4 text-muted-foreground" />,
          <>+8% from last month <ArrowUpRight className="ml-1 inline h-3 w-3" /></>
        )}
        {renderStatCard(
          "Active Complaints",
          "12",
          <AlertCircle className="h-4 w-4 text-muted-foreground" />,
          "3 high priority"
        )}
      </div>

      {/* Charts section */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Occupancy Overview</CardTitle>
            <CardDescription>Current occupancy across all properties</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="occupied" fill="#0088FE" name="Occupied" />
                <Bar dataKey="vacant" fill="#FF8042" name="Vacant" />
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
                <Tooltip />
                <Bar dataKey="amount" fill="#00C49F" name="Revenue (₹)" />
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
                    data={complaintData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {complaintData.map((entry, index) => (
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
              {renderAlert(
                "Water Leakage",
                "High",
                "Room 302, Sunshine PG",
                "2 hours ago"
              )}
              {renderAlert(
                "Electrical Issue",
                "Medium",
                "Room 105, Green Valley PG",
                "5 hours ago"
              )}
              {renderAlert(
                "AC Malfunction",
                "Medium",
                "Room 201, City Heights PG",
                "Yesterday"
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}