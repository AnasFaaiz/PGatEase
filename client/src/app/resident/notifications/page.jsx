"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { format, isToday, isYesterday } from "date-fns"
import {
  AlertCircle,
  Bell,
  Check,
  CreditCard,
  Filter,
  MoreVertical,
  Settings,
  Utensils,
  Shirt,
  MessageSquare,
  BellRing,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Sample notifications data
const initialNotifications = [
  {
    id: 1,
    type: "Emergency",
    title: "Emergency Alert Resolved",
    message: "Your medical emergency alert has been resolved. Medical team has attended to the issue.",
    timestamp: "2024-04-15T09:30:00",
    isRead: false,
  },
  {
    id: 2,
    type: "Payment",
    title: "Rent Payment Due",
    message: "Your monthly rent payment of ₹12,000 is due in 3 days. Please make the payment to avoid late fees.",
    timestamp: "2024-04-15T08:00:00",
    isRead: false,
  },
  {
    id: 3,
    type: "Meal",
    title: "Meal Preference Updated",
    message: "Your meal preference for tomorrow has been updated to Vegetarian.",
    timestamp: "2024-04-14T18:45:00",
    isRead: true,
  },
  {
    id: 4,
    type: "Laundry",
    title: "Laundry Ready for Pickup",
    message: "Your laundry is ready for pickup. Please collect it from the laundry room.",
    timestamp: "2024-04-14T16:30:00",
    isRead: true,
  },
  {
    id: 5,
    type: "Complaint",
    title: "Complaint Status Updated",
    message: "Your maintenance complaint #1234 has been marked as 'In Progress'. A technician will visit tomorrow.",
    timestamp: "2024-04-13T14:20:00",
    isRead: true,
  },
  {
    id: 6,
    type: "Announcement",
    title: "Water Supply Interruption",
    message: "There will be a water supply interruption tomorrow from 10:00 AM to 2:00 PM due to maintenance work.",
    timestamp: "2024-04-12T11:00:00",
    isRead: true,
  },
  {
    id: 7,
    type: "Payment",
    title: "Payment Successful",
    message: "Your payment of ₹12,000 for April rent has been received. Thank you!",
    timestamp: "2024-04-01T09:15:00",
    isRead: true,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeFilter, setActiveFilter] = useState("all")
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    mealUpdates: true,
    paymentReminders: true,
    emergencyAlerts: true,
    laundryUpdates: true,
    complaintUpdates: true,
    announcements: true,
  })

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "all") return true
    if (activeFilter === "unread") return !notification.isRead
    return notification.type.toLowerCase() === activeFilter.toLowerCase()
  })

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = new Date(notification.timestamp)
    let dateGroup

    if (isToday(date)) {
      dateGroup = "Today"
    } else if (isYesterday(date)) {
      dateGroup = "Yesterday"
    } else {
      dateGroup = format(date, "MMMM d, yyyy")
    }

    if (!groups[dateGroup]) {
      groups[dateGroup] = []
    }

    groups[dateGroup].push(notification)
    return groups
  }, {})

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))
    toast({
      title: "All notifications marked as read",
    })
  }

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
    toast({
      title: "Notification deleted",
    })
  }

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case "Emergency":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "Payment":
        return <CreditCard className="h-5 w-5 text-purple-500" />
      case "Meal":
        return <Utensils className="h-5 w-5 text-green-500" />
      case "Laundry":
        return <Shirt className="h-5 w-5 text-blue-500" />
      case "Complaint":
        return <MessageSquare className="h-5 w-5 text-amber-500" />
      case "Announcement":
        return <BellRing className="h-5 w-5 text-indigo-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  // Format time
  const formatTime = (dateString) => {
    return format(new Date(dateString), "h:mm a")
  }

  // Toggle notification setting
  const toggleNotificationSetting = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    })
    toast({
      title: `${notificationSettings[setting] ? "Disabled" : "Enabled"} ${setting
        .replace(/([A-Z])/g, " $1")
        .toLowerCase()}`,
    })
  }

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with important alerts and information</p>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveFilter("all")}>All Notifications</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("unread")}>Unread</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveFilter("emergency")}>Emergency</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("payment")}>Payments</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("meal")}>Meals</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("laundry")}>Laundry</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("complaint")}>Complaints</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("announcement")}>Announcements</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="gap-2" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <Check className="h-4 w-4" />
              Mark all as read
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger value="notifications">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="notifications">
          {Object.keys(groupedNotifications).length > 0 ? (
            Object.entries(groupedNotifications).map(([date, notifications]) => (
              <div key={date} className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">{date}</h3>
                <div className="grid gap-2">
                  {notifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`overflow-hidden transition-colors ${
                        !notification.isRead ? "border-l-4 border-l-primary" : ""
                      }`}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getNotificationIcon(notification.type)}
                            <CardTitle className="text-base">{notification.title}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{formatTime(notification.timestamp)}</span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!notification.isRead && (
                                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                    Mark as read
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm">{notification.message}</p>
                      </CardContent>
                      <CardFooter className="border-t bg-muted/20 px-4 py-2">
                        <div className="flex w-full items-center justify-between">
                          <Badge variant="outline">{notification.type}</Badge>
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3" /> Mark as read
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No notifications</CardTitle>
                <CardDescription>You don't have any notifications matching the current filter.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="mb-4 rounded-full bg-muted p-4">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium">All caught up!</h3>
                  <p className="text-center text-muted-foreground">
                    {activeFilter === "all"
                      ? "You don't have any notifications at the moment."
                      : `You don't have any ${activeFilter === "unread" ? "unread" : activeFilter} notifications.`}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Customize how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Delivery Methods</h3>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <span className="text-sm text-muted-foreground">Receive notifications on your device</span>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={() => toggleNotificationSetting("pushNotifications")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <span className="text-sm text-muted-foreground">Receive important notifications via email</span>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => toggleNotificationSetting("emailNotifications")}
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium">Notification Types</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
                  </div>
                  <Switch
                    id="emergency-alerts"
                    checked={notificationSettings.emergencyAlerts}
                    onCheckedChange={() => toggleNotificationSetting("emergencyAlerts")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-purple-500" />
                    <Label htmlFor="payment-reminders">Payment Reminders</Label>
                  </div>
                  <Switch
                    id="payment-reminders"
                    checked={notificationSettings.paymentReminders}
                    onCheckedChange={() => toggleNotificationSetting("paymentReminders")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-green-500" />
                    <Label htmlFor="meal-updates">Meal Updates</Label>
                  </div>
                  <Switch
                    id="meal-updates"
                    checked={notificationSettings.mealUpdates}
                    onCheckedChange={() => toggleNotificationSetting("mealUpdates")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shirt className="h-5 w-5 text-blue-500" />
                    <Label htmlFor="laundry-updates">Laundry Updates</Label>
                  </div>
                  <Switch
                    id="laundry-updates"
                    checked={notificationSettings.laundryUpdates}
                    onCheckedChange={() => toggleNotificationSetting("laundryUpdates")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-amber-500" />
                    <Label htmlFor="complaint-updates">Complaint Updates</Label>
                  </div>
                  <Switch
                    id="complaint-updates"
                    checked={notificationSettings.complaintUpdates}
                    onCheckedChange={() => toggleNotificationSetting("complaintUpdates")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellRing className="h-5 w-5 text-indigo-500" />
                    <Label htmlFor="announcements">Announcements</Label>
                  </div>
                  <Switch
                    id="announcements"
                    checked={notificationSettings.announcements}
                    onCheckedChange={() => toggleNotificationSetting("announcements")}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t px-6 py-4">
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Advanced Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
