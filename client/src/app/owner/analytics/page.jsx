"use client"

import { TableCell as MuiTableCell } from "@/components/ui/table"

import { TableHead } from "@/components/ui/table"

import { TableHeader } from "@/components/ui/table"

import { Table, TableBody as UitableBody, TableRow } from "@/components/ui/table"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  LineChart,
  Line,
  AreaChart,
  Area,
} from "@/components/ui/chart"
import { ArrowUpRight, Building2, CreditCard, Download, Heart, MessageSquare, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Sample analytics data
const occupancyData = [
  { month: "Jan", Sunshine: 92, "Green Valley": 85, "City Heights": 78 },
  { month: "Feb", Sunshine: 94, "Green Valley": 87, "City Heights": 80 },
  { month: "Mar", Sunshine: 95, "Green Valley": 88, "City Heights": 82 },
  { month: "Apr", Sunshine: 93, "Green Valley": 90, "City Heights": 85 },
  { month: "May", Sunshine: 90, "Green Valley": 92, "City Heights": 88 },
  { month: "Jun", Sunshine: 88, "Green Valley": 94, "City Heights": 90 },
]

const revenueData = [
  { month: "Jan", Sunshine: 525000, "Green Valley": 480000, "City Heights": 420000 },
  { month: "Feb", Sunshine: 530000, "Green Valley": 485000, "City Heights": 425000 },
  { month: "Mar", Sunshine: 535000, "Green Valley": 490000, "City Heights": 430000 },
  { month: "Apr", Sunshine: 540000, "Green Valley": 495000, "City Heights": 435000 },
  { month: "May", Sunshine: 545000, "Green Valley": 500000, "City Heights": 440000 },
  { month: "Jun", Sunshine: 550000, "Green Valley": 505000, "City Heights": 445000 },
]

const complaintData = [
  { month: "Jan", Maintenance: 12, Food: 8, Cleanliness: 5, Others: 3 },
  { month: "Feb", Maintenance: 10, Food: 7, Cleanliness: 4, Others: 2 },
  { month: "Mar", Maintenance: 8, Food: 9, Cleanliness: 6, Others: 4 },
  { month: "Apr", Maintenance: 15, Food: 6, Cleanliness: 7, Others: 5 },
  { month: "May", Maintenance: 11, Food: 10, Cleanliness: 8, Others: 3 },
  { month: "Jun", Maintenance: 9, Food: 12, Cleanliness: 6, Others: 4 },
]

const emergencyData = [
  { month: "Jan", Medical: 3, Security: 2, Maintenance: 4, Fire: 0 },
  { month: "Feb", Medical: 2, Security: 1, Maintenance: 3, Fire: 0 },
  { month: "Mar", Medical: 4, Security: 2, Maintenance: 1, Fire: 1 },
  { month: "Apr", Medical: 3, Security: 3, Maintenance: 2, Fire: 0 },
  { month: "May", Medical: 2, Security: 1, Maintenance: 5, Fire: 0 },
  { month: "Jun", Medical: 5, Security: 2, Maintenance: 3, Fire: 1 },
]

const mealPreferenceData = [
  { month: "Jan", Vegetarian: 65, "Non-Vegetarian": 35 },
  { month: "Feb", Vegetarian: 63, "Non-Vegetarian": 37 },
  { month: "Mar", Vegetarian: 60, "Non-Vegetarian": 40 },
  { month: "Apr", Vegetarian: 62, "Non-Vegetarian": 38 },
  { month: "May", Vegetarian: 64, "Non-Vegetarian": 36 },
  { month: "Jun", Vegetarian: 66, "Non-Vegetarian": 34 },
]

const complaintTypeData = [
  { name: "Maintenance", value: 45 },
  { name: "Food", value: 30 },
  { name: "Cleanliness", value: 15 },
  { name: "Others", value: 10 },
]

const paymentStatusData = [
  { name: "Paid", value: 75 },
  { name: "Pending", value: 15 },
  { name: "Overdue", value: 10 },
]

const pgPerformanceData = [
  {
    name: "Sunshine PG",
    occupancy: 92,
    revenue: 550000,
    complaints: 28,
    satisfaction: 4.5,
  },
  {
    name: "Green Valley PG",
    occupancy: 88,
    revenue: 505000,
    complaints: 32,
    satisfaction: 4.2,
  },
  {
    name: "City Heights PG",
    occupancy: 85,
    revenue: 445000,
    complaints: 35,
    satisfaction: 4.0,
  },
]

export default function AnalyticsPage() {
  const [selectedPg, setSelectedPg] = useState("All Properties")
  const [dateRange, setDateRange] = useState("Last 6 Months")
  const [activeTab, setActiveTab] = useState("overview")

  // Filter data based on selected PG
  const filterDataByPg = (data, pgName) => {
    if (pgName === "All Properties") {
      return data
    }

    // For data with PG-specific columns
    if (data[0] && data[0][pgName] !== undefined) {
      return data.map((item) => ({
        month: item.month,
        [pgName]: item[pgName],
      }))
    }

    // For other data types, we'd need more complex filtering
    return data
  }

  // Get filtered data
  const filteredOccupancyData = filterDataByPg(occupancyData, selectedPg)
  const filteredRevenueData = filterDataByPg(revenueData, selectedPg)

  // Calculate KPIs
  const calculateKpis = () => {
    if (selectedPg === "All Properties") {
      // Calculate averages across all properties
      const totalOccupancy = pgPerformanceData.reduce((sum, pg) => sum + pg.occupancy, 0) / pgPerformanceData.length
      const totalRevenue = pgPerformanceData.reduce((sum, pg) => sum + pg.revenue, 0)
      const totalComplaints = pgPerformanceData.reduce((sum, pg) => sum + pg.complaints, 0)
      const avgSatisfaction = pgPerformanceData.reduce((sum, pg) => sum + pg.satisfaction, 0) / pgPerformanceData.length

      return {
        occupancy: totalOccupancy,
        revenue: totalRevenue,
        complaints: totalComplaints,
        satisfaction: avgSatisfaction,
      }
    } else {
      // Return KPIs for the selected PG
      const pgData = pgPerformanceData.find((pg) => pg.name === selectedPg)
      return pgData || { occupancy: 0, revenue: 0, complaints: 0, satisfaction: 0 }
    }
  }

  const kpis = calculateKpis()

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  // Format currency
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">
                Performance metrics for <span className="font-medium text-foreground">{selectedPg}</span>
              </p>
              <Select value={selectedPg} onValueChange={setSelectedPg}>
                <SelectTrigger className="h-7 w-[180px]">
                  <SelectValue placeholder="Select PG" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Properties</SelectLabel>
                    <SelectItem value="All Properties">All Properties</SelectItem>
                    <SelectItem value="Sunshine PG">Sunshine PG</SelectItem>
                    <SelectItem value="Green Valley PG">Green Valley PG</SelectItem>
                    <SelectItem value="City Heights PG">City Heights PG</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="h-9 w-[180px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
                <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
                <SelectItem value="Last Year">Last Year</SelectItem>
                <SelectItem value="All Time">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.occupancy}%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last month
              <ArrowUpRight className="ml-1 inline h-3 w-3" />
            </p>
            <div className="mt-2">
              <Progress value={kpis.occupancy} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpis.revenue)}</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
              <ArrowUpRight className="ml-1 inline h-3 w-3" />
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Complaints</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.complaints}</div>
            <p className="text-xs text-muted-foreground">
              -3 from last month
              <ArrowUpRight className="ml-1 inline h-3 w-3 text-green-500" />
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resident Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.satisfaction.toFixed(1)}/5.0</div>
            <p className="text-xs text-muted-foreground">Based on resident feedback</p>
            <div className="mt-2">
              <Progress value={kpis.satisfaction * 20} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="food">Food Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Occupancy Trend</CardTitle>
                  <CardDescription>Occupancy rate over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={filteredOccupancyData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {selectedPg === "All Properties" ? (
                          <>
                            <Line type="monotone" dataKey="Sunshine" stroke="#0088FE" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="Green Valley" stroke="#00C49F" />
                            <Line type="monotone" dataKey="City Heights" stroke="#FFBB28" />
                          </>
                        ) : (
                          <Line type="monotone" dataKey={selectedPg} stroke="#0088FE" activeDot={{ r: 8 }} />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={filteredRevenueData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {selectedPg === "All Properties" ? (
                          <>
                            <Area type="monotone" dataKey="Sunshine" stackId="1" stroke="#0088FE" fill="#0088FE" />
                            <Area type="monotone" dataKey="Green Valley" stackId="1" stroke="#00C49F" fill="#00C49F" />
                            <Area type="monotone" dataKey="City Heights" stackId="1" stroke="#FFBB28" fill="#FFBB28" />
                          </>
                        ) : (
                          <Area type="monotone" dataKey={selectedPg} stroke="#0088FE" fill="#0088FE" />
                        )}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Complaint Distribution</CardTitle>
                  <CardDescription>Breakdown of complaints by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={complaintTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {complaintTypeData.map((entry, index) => (
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
                  <CardTitle>Payment Status</CardTitle>
                  <CardDescription>Current payment status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={paymentStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {paymentStatusData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.name === "Paid" ? "#00C49F" : entry.name === "Pending" ? "#FFBB28" : "#FF8042"
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="occupancy">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Analysis</CardTitle>
                <CardDescription>Detailed occupancy metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={occupancyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Sunshine" stroke="#0088FE" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="Green Valley" stroke="#00C49F" />
                      <Line type="monotone" dataKey="City Heights" stroke="#FFBB28" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Occupancy Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Detailed revenue metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={revenueData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="Sunshine" stackId="1" stroke="#0088FE" fill="#0088FE" />
                      <Area type="monotone" dataKey="Green Valley" stackId="1" stroke="#00C49F" fill="#00C49F" />
                      <Area type="monotone" dataKey="City Heights" stackId="1" stroke="#FFBB28" fill="#FFBB28" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Revenue Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="complaints">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Complaint Trends</CardTitle>
                  <CardDescription>Complaint volume over time by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={complaintData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Maintenance" stackId="a" fill="#0088FE" />
                        <Bar dataKey="Food" stackId="a" fill="#00C49F" />
                        <Bar dataKey="Cleanliness" stackId="a" fill="#FFBB28" />
                        <Bar dataKey="Others" stackId="a" fill="#FF8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Incidents</CardTitle>
                  <CardDescription>Emergency incidents by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={emergencyData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Medical" fill="#0088FE" />
                        <Bar dataKey="Security" fill="#00C49F" />
                        <Bar dataKey="Maintenance" fill="#FFBB28" />
                        <Bar dataKey="Fire" fill="#FF8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Resolution Time Analysis</CardTitle>
                  <CardDescription>Average time to resolve complaints by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Maintenance</span>
                        <span className="text-sm">48 hours</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Food</span>
                        <span className="text-sm">12 hours</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Cleanliness</span>
                        <span className="text-sm">24 hours</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Others</span>
                        <span className="text-sm">36 hours</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="food">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Meal Preference Trends</CardTitle>
                  <CardDescription>Vegetarian vs Non-Vegetarian preferences over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={mealPreferenceData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="Vegetarian" stackId="1" stroke="#00C49F" fill="#00C49F" />
                        <Area type="monotone" dataKey="Non-Vegetarian" stackId="1" stroke="#FF8042" fill="#FF8042" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Dishes</CardTitle>
                  <CardDescription>Most requested dishes in the last month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Biryani</span>
                        <Badge>40 requests</Badge>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Paneer Butter Masala</span>
                        <Badge>35 requests</Badge>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Chicken Curry</span>
                        <Badge>28 requests</Badge>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Aloo Paratha</span>
                        <Badge>22 requests</Badge>
                      </div>
                      <Progress value={55} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Chole Bhature</span>
                        <Badge>18 requests</Badge>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Special Dietary Requirements</CardTitle>
                  <CardDescription>Analysis of special dietary needs and allergies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <Heart className="h-5 w-5 text-red-500" />
                          <div>
                            <h4 className="font-medium">Lactose Intolerance</h4>
                            <p className="text-sm text-muted-foreground">3 residents</p>
                          </div>
                        </div>
                        <Badge variant="outline">5%</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <Heart className="h-5 w-5 text-red-500" />
                          <div>
                            <h4 className="font-medium">Gluten Allergy</h4>
                            <p className="text-sm text-muted-foreground">2 residents</p>
                          </div>
                        </div>
                        <Badge variant="outline">3%</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <Heart className="h-5 w-5 text-red-500" />
                          <div>
                            <h4 className="font-medium">Peanut Allergy</h4>
                            <p className="text-sm text-muted-foreground">4 residents</p>
                          </div>
                        </div>
                        <Badge variant="outline">7%</Badge>
                      </div>
                    </div>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "No Allergies", value: 85 },
                              { name: "With Allergies", value: 15 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            <Cell fill="#00C49F" />
                            <Cell fill="#FF8042" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>PG Performance Comparison</CardTitle>
            <CardDescription>Side-by-side comparison of all PG properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property Name</TableHead>
                    <TableHead>Occupancy Rate</TableHead>
                    <TableHead>Monthly Revenue</TableHead>
                    <TableHead>Active Complaints</TableHead>
                    <TableHead>Resident Satisfaction</TableHead>
                  </TableRow>
                </TableHeader>
                <UitableBody>
                  {pgPerformanceData.map((pg) => (
                    <TableRow key={pg.name}>
                      <MuiTableCell className="font-medium">{pg.name}</MuiTableCell>
                      <MuiTableCell>
                        <div className="flex items-center gap-2">
                          <span>{pg.occupancy}%</span>
                          <Progress value={pg.occupancy} className="h-2 w-20" />
                        </div>
                      </MuiTableCell>
                      <MuiTableCell>{formatCurrency(pg.revenue)}</MuiTableCell>
                      <MuiTableCell>{pg.complaints}</MuiTableCell>
                      <MuiTableCell>
                        <div className="flex items-center gap-2">
                          <span>{pg.satisfaction}/5.0</span>
                          <Progress value={pg.satisfaction * 20} className="h-2 w-20" />
                        </div>
                      </MuiTableCell>
                    </TableRow>
                  ))}
                </UitableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Comparison Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
