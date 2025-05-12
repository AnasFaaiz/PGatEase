"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Calendar,
  Check,
  CreditCard,
  Home,
  MessageSquare,
  Shirt,
  Utensils,
} from "lucide-react"
import Link from "next/link"

export default function ResidentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data
  const upcomingMeals = [
    { id: 1, type: "Breakfast", time: "7:30 AM - 9:00 AM", selected: true, preference: "Vegetarian" },
    { id: 2, type: "Lunch", time: "12:30 PM - 2:00 PM", selected: true, preference: "Non-Vegetarian" },
    { id: 3, type: "Dinner", time: "7:30 PM - 9:00 PM", selected: false, preference: "Not selected" },
  ]

  const paymentStatus = {
    currentMonth: "April 2024",
    dueDate: "April 25, 2024",
    amount: 12000,
    status: "Due",
    daysLeft: 5,
  }

  const laundryStatus = {
    status: "Ready for pickup",
    lastUpdated: "Today, 2:30 PM",
    itemsCount: 8,
    nextAvailable: "Tomorrow, 9:00 AM",
  }

  const recentComplaints = [
    {
      id: 1,
      title: "Water leakage in bathroom",
      status: "In Progress",
      date: "April 15, 2024",
      category: "Maintenance",
    },
    {
      id: 2,
      title: "Wi-Fi connectivity issues",
      status: "Resolved",
      date: "April 10, 2024",
      category: "Internet",
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "Rent Payment Due",
      message: "Your monthly rent payment is due in 5 days",
      time: "2 hours ago",
      type: "Payment",
    },
    {
      id: 2,
      title: "Laundry Ready",
      message: "Your laundry is ready for pickup",
      time: "Today, 2:30 PM",
      type: "Laundry",
    },
    {
      id: 3,
      title: "Meal Preference",
      message: "Please select your meal preference for tomorrow",
      time: "Today, 10:00 AM",
      type: "Meal",
    },
  ]

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Due":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            Due
          </Badge>
        )
      case "Paid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Paid
          </Badge>
        )
      case "Overdue":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Overdue
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            In Progress
          </Badge>
        )
      case "Resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case "Payment":
        return <CreditCard className="h-5 w-5 text-purple-500" />
      case "Meal":
        return <Utensils className="h-5 w-5 text-green-500" />
      case "Laundry":
        return <Shirt className="h-5 w-5 text-blue-500" />
      case "Complaint":
        return <MessageSquare className="h-5 w-5 text-amber-500" />
      case "Emergency":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome to PGatEase</h1>
        <p className="text-muted-foreground">Your one-stop dashboard for all PG services</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Meals Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Today's Meals</CardTitle>
                  <Utensils className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {upcomingMeals.map((meal) => (
                    <div key={meal.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{meal.type}</p>
                        <p className="text-xs text-muted-foreground">{meal.time}</p>
                      </div>
                      <div className="flex items-center">
                        {meal.selected ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {meal.preference}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-50 text-red-700">
                            Not Selected
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button asChild variant="ghost" className="w-full justify-between">
                  <Link href="/resident/meals">
                    View Meal Schedule
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Payment Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Payment Status</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{paymentStatus.currentMonth}</p>
                    {getStatusBadge(paymentStatus.status)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Due Date: {paymentStatus.dueDate}</span>
                      <span>{paymentStatus.daysLeft} days left</span>
                    </div>
                    <Progress value={100 - (paymentStatus.daysLeft / 30) * 100} className="h-2" />
                  </div>
                  <div className="rounded-md bg-muted p-2 text-center">
                    <span className="text-sm font-medium">₹{paymentStatus.amount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button asChild variant="ghost" className="w-full justify-between">
                  <Link href="/resident/payments">
                    Make Payment
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Laundry Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Laundry Status</CardTitle>
                  <Shirt className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{laundryStatus.status}</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Ready
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Last updated: {laundryStatus.lastUpdated}</p>
                  <div className="rounded-md bg-muted p-2 text-center">
                    <span className="text-sm font-medium">{laundryStatus.itemsCount} items</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Next available pickup: {laundryStatus.nextAvailable}</p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button asChild variant="ghost" className="w-full justify-between">
                  <Link href="/resident/laundry">
                    Manage Laundry
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Complaints Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Recent Complaints</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Track the status of your complaints</CardDescription>
              </CardHeader>
              <CardContent>
                {recentComplaints.length > 0 ? (
                  <div className="space-y-4">
                    {recentComplaints.map((complaint) => (
                      <div key={complaint.id} className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{complaint.title}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">{complaint.date}</p>
                            <Badge variant="outline" className="text-xs">
                              {complaint.category}
                            </Badge>
                          </div>
                        </div>
                        {getStatusBadge(complaint.status)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <Check className="mb-2 h-8 w-8 text-green-500" />
                    <p className="font-medium">No active complaints</p>
                    <p className="text-sm text-muted-foreground">All your issues have been resolved</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button asChild variant="ghost" className="w-full justify-between">
                  <Link href="/resident/complaints">
                    Lodge a Complaint
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Notifications Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Recent Notifications</CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Your latest updates and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex gap-3">
                      <div className="mt-0.5 flex-shrink-0">{getNotificationIcon(notification.type)}</div>
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button asChild variant="ghost" className="w-full justify-between">
                  <Link href="/resident/notifications">
                    View All Notifications
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Emergency Alert Card */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-red-700">Emergency Alert</CardTitle>
                <AlertCircle className="h-5 w-5 text-red-700" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center text-red-700">
                Need immediate assistance? Use the emergency alert system to contact staff.
              </p>
            </CardContent>
            <CardFooter className="border-t border-red-200 pt-4">
              <Button asChild variant="destructive" className="w-full justify-between">
                <Link href="/resident/emergency">
                  Send Emergency Alert
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="quick-actions" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2 text-center">
                <Utensils className="mx-auto h-6 w-6 text-green-500" />
                <CardTitle className="text-base">Meals</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">View menu and set meal preferences</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/resident/meals">Manage Meals</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2 text-center">
                <Shirt className="mx-auto h-6 w-6 text-blue-500" />
                <CardTitle className="text-base">Laundry</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Schedule pickups and track status</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/resident/laundry">Manage Laundry</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2 text-center">
                <CreditCard className="mx-auto h-6 w-6 text-purple-500" />
                <CardTitle className="text-base">Payments</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Pay rent and view payment history</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/resident/payments">Make Payment</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2 text-center">
                <MessageSquare className="mx-auto h-6 w-6 text-amber-500" />
                <CardTitle className="text-base">Complaints</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Report issues and track resolution</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/resident/complaints">Lodge Complaint</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2 text-center">
                <AlertCircle className="mx-auto h-6 w-6 text-red-500" />
                <CardTitle className="text-base">Emergency</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Send alerts for urgent assistance</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/resident/emergency">Emergency Alert</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2 text-center">
                <Bell className="mx-auto h-6 w-6 text-indigo-500" />
                <CardTitle className="text-base">Notifications</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">View all updates and alerts</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/resident/notifications">View Notifications</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Events</CardTitle>
              <CardDescription>PG activities and important dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Monthly Community Dinner</p>
                    <p className="text-sm text-muted-foreground">April 25, 2024 • 7:00 PM • Common Area</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Quarterly Maintenance Check</p>
                    <p className="text-sm text-muted-foreground">April 28, 2024 • 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
