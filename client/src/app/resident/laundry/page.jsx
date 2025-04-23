"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertCircle,
  Check,
  Clock,
  Download,
  Loader2,
  Package,
  Search,
  ShoppingBasket,
  Star,
  WashingMachineIcon as Washing,
} from "lucide-react"
import { format, addDays } from "date-fns"
import { toast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample laundry data
const laundryRequests = [
  {
    id: 1,
    requestDate: "2024-04-20T10:30:00",
    pickupDate: "2024-04-20T16:45:00",
    deliveryDate: "2024-04-22T14:30:00",
    status: "Delivered",
    items: [
      { type: "Shirts", count: 3 },
      { type: "Pants", count: 2 },
      { type: "Bedsheets", count: 1 },
    ],
    totalItems: 6,
    notes: "Please handle with care",
    rating: 4,
  },
  {
    id: 2,
    requestDate: "2024-04-25T09:15:00",
    pickupDate: "2024-04-25T17:30:00",
    deliveryDate: null,
    status: "In Process",
    items: [
      { type: "Shirts", count: 4 },
      { type: "Pants", count: 3 },
      { type: "Towels", count: 2 },
    ],
    totalItems: 9,
    notes: "",
    rating: null,
  },
  {
    id: 3,
    requestDate: "2024-04-28T11:45:00",
    pickupDate: null,
    deliveryDate: null,
    status: "Requested",
    items: [
      { type: "Shirts", count: 5 },
      { type: "Pants", count: 3 },
      { type: "Bedsheets", count: 2 },
      { type: "Towels", count: 1 },
    ],
    totalItems: 11,
    notes: "Some items have stains",
    rating: null,
  },
]

// Laundry limits
const laundryLimits = {
  weeklyLimit: 15,
  usedThisWeek: 11,
  remainingThisWeek: 4,
  specialItems: ["Blankets", "Curtains", "Suits"],
}

// Available pickup time slots
const availableTimeSlots = [
  { date: format(new Date(), "yyyy-MM-dd"), slots: ["16:00", "17:00", "18:00"] },
  { date: format(addDays(new Date(), 1), "yyyy-MM-dd"), slots: ["09:00", "10:00", "16:00", "17:00", "18:00"] },
  { date: format(addDays(new Date(), 2), "yyyy-MM-dd"), slots: ["09:00", "10:00", "11:00", "16:00", "17:00", "18:00"] },
]

export default function LaundryPage() {
  const [activeTab, setActiveTab] = useState("current")
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [isNewRequestDialogOpen, setIsNewRequestDialogOpen] = useState(false)
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false)
  const [newRequest, setNewRequest] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    time: "",
    items: [
      { type: "Shirts", count: 0 },
      { type: "Pants", count: 0 },
      { type: "Bedsheets", count: 0 },
      { type: "Towels", count: 0 },
    ],
    notes: "",
  })
  const [rating, setRating] = useState(0)
  const [ratingComment, setRatingComment] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Calculate total items in new request
  const totalItemsInNewRequest = newRequest.items.reduce((total, item) => total + item.count, 0)

  // Filter requests based on status
  const filteredRequests =
    statusFilter === "all"
      ? laundryRequests
      : laundryRequests.filter((request) => request.status.toLowerCase() === statusFilter.toLowerCase())

  // Handle new request submission
  const handleNewRequestSubmit = () => {
    // Validate request
    if (newRequest.time === "") {
      toast({
        title: "Missing information",
        description: "Please select a pickup time.",
        variant: "destructive",
      })
      return
    }

    if (totalItemsInNewRequest === 0) {
      toast({
        title: "Missing information",
        description: "Please add at least one item to your laundry request.",
        variant: "destructive",
      })
      return
    }

    if (totalItemsInNewRequest > laundryLimits.remainingThisWeek) {
      toast({
        title: "Limit exceeded",
        description: `You can only request ${laundryLimits.remainingThisWeek} more items this week.`,
        variant: "destructive",
      })
      return
    }

    // In a real app, this would send the request to the server
    toast({
      title: "Laundry request submitted",
      description: `Your laundry will be picked up on ${format(
        new Date(newRequest.date),
        "MMM d",
      )} at ${newRequest.time}.`,
    })

    setIsNewRequestDialogOpen(false)
    // Reset form
    setNewRequest({
      date: format(new Date(), "yyyy-MM-dd"),
      time: "",
      items: [
        { type: "Shirts", count: 0 },
        { type: "Pants", count: 0 },
        { type: "Bedsheets", count: 0 },
        { type: "Towels", count: 0 },
      ],
      notes: "",
    })
  }

  // Handle rating submission
  const handleRatingSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Missing rating",
        description: "Please select a rating.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would send the rating to the server
    toast({
      title: "Rating submitted",
      description: "Thank you for your feedback!",
    })

    setIsRatingDialogOpen(false)
    setRating(0)
    setRatingComment("")
  }

  // Handle item count change
  const handleItemCountChange = (index, count) => {
    const updatedItems = [...newRequest.items]
    updatedItems[index].count = Number.parseInt(count)
    setNewRequest({
      ...newRequest,
      items: updatedItems,
    })
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Delivered
          </Badge>
        )
      case "In Process":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            In Process
          </Badge>
        )
      case "Picked":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            Picked
          </Badge>
        )
      case "Requested":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            Requested
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return format(new Date(dateString), "MMM d, yyyy h:mm a")
  }

  // Get status progress
  const getStatusProgress = (status) => {
    switch (status) {
      case "Delivered":
        return 100
      case "In Process":
        return 66
      case "Picked":
        return 33
      case "Requested":
        return 10
      default:
        return 0
    }
  }

  // Render star rating
  const renderStarRating = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Laundry</h1>
            <p className="text-muted-foreground">Request and track your laundry services</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isNewRequestDialogOpen} onOpenChange={setIsNewRequestDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <ShoppingBasket className="mr-2 h-4 w-4" />
                  New Laundry Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>New Laundry Request</DialogTitle>
                  <DialogDescription>Schedule a pickup for your laundry.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="pickup-date">Pickup Date</Label>
                      <Select
                        value={newRequest.date}
                        onValueChange={(value) => setNewRequest({ ...newRequest, date: value })}
                      >
                        <SelectTrigger id="pickup-date">
                          <SelectValue placeholder="Select date" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimeSlots.map((slot) => (
                            <SelectItem key={slot.date} value={slot.date}>
                              {format(new Date(slot.date), "EEEE, MMM d")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="pickup-time">Pickup Time</Label>
                      <Select
                        value={newRequest.time}
                        onValueChange={(value) => setNewRequest({ ...newRequest, time: value })}
                      >
                        <SelectTrigger id="pickup-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimeSlots
                            .find((slot) => slot.date === newRequest.date)
                            ?.slots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="mb-2 block">Items</Label>
                    <div className="space-y-3">
                      {newRequest.items.map((item, index) => (
                        <div key={item.type} className="flex items-center justify-between">
                          <span>{item.type}</span>
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleItemCountChange(index, Math.max(0, item.count - 1))}
                            >
                              <span>-</span>
                            </Button>
                            <Input
                              type="number"
                              min="0"
                              value={item.count}
                              onChange={(e) => handleItemCountChange(index, e.target.value)}
                              className="mx-2 h-8 w-16 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleItemCountChange(index, item.count + 1)}
                            >
                              <span>+</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                    <span className="font-medium">Total Items</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{totalItemsInNewRequest}</span>
                      <span className="text-sm text-muted-foreground">
                        / {laundryLimits.remainingThisWeek} remaining
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notes">Special Instructions (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any special instructions or notes..."
                      value={newRequest.notes}
                      onChange={(e) => setNewRequest({ ...newRequest, notes: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewRequestDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleNewRequestSubmit}>Submit Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Laundry Requests</CardTitle>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-8 w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="requested">Requested</SelectItem>
                    <SelectItem value="picked">Picked</SelectItem>
                    <SelectItem value="in process">In Process</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="h-8 pl-8 w-full" />
                </div>
              </div>
            </div>
            <CardDescription>View and track your laundry requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="all">All Requests</TabsTrigger>
              </TabsList>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="font-medium">{format(new Date(request.requestDate), "MMM d, yyyy")}</div>
                            <div className="text-sm text-muted-foreground">
                              {format(new Date(request.requestDate), "h:mm a")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{request.totalItems} items</div>
                            <div className="text-sm text-muted-foreground">
                              {request.items.map((item) => `${item.count} ${item.type}`).join(", ")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              {getStatusBadge(request.status)}
                              <Progress value={getStatusProgress(request.status)} className="h-1.5 w-24" />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedRequest(request)
                                  setIsTrackingDialogOpen(true)
                                }}
                              >
                                Track
                              </Button>
                              {request.status === "Delivered" && !request.rating && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedRequest(request)
                                    setIsRatingDialogOpen(true)
                                  }}
                                >
                                  Rate
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No laundry requests found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredRequests.length} of {laundryRequests.length} requests
            </div>
            <Button variant="outline" size="sm" disabled>
              <Download className="mr-2 h-4 w-4" />
              Export History
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Laundry Limits</CardTitle>
              <CardDescription>Your current laundry allowance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Weekly Limit</span>
                    <span className="font-medium">{laundryLimits.weeklyLimit} items</span>
                  </div>
                  <Progress value={(laundryLimits.usedThisWeek / laundryLimits.weeklyLimit) * 100} className="h-2" />
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>Used: {laundryLimits.usedThisWeek}</span>
                    <span>Remaining: {laundryLimits.remainingThisWeek}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-2 text-sm font-medium">Special Items</h4>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      The following items count as 2 regular items against your weekly limit:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {laundryLimits.specialItems.map((item) => (
                        <Badge key={item} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Weekly Reset</p>
                    <p>Your laundry limit resets every Monday at 12:00 AM.</p>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Laundry Guidelines</CardTitle>
              <CardDescription>Important information about the laundry service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <Clock className="mt-0.5 h-5 w-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium">Processing Time</h4>
                    <p className="text-sm text-muted-foreground">
                      Standard laundry takes 24-48 hours to process and deliver.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <Package className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div>
                    <h4 className="font-medium">Packaging</h4>
                    <p className="text-sm text-muted-foreground">
                      Please ensure all items are properly bagged before pickup.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <Washing className="mt-0.5 h-5 w-5 text-red-500" />
                  <div>
                    <h4 className="font-medium">Delicate Items</h4>
                    <p className="text-sm text-muted-foreground">
                      Mark any delicate items clearly and mention in special instructions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tracking Dialog */}
      <Dialog open={isTrackingDialogOpen} onOpenChange={setIsTrackingDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Track Laundry Request</DialogTitle>
            <DialogDescription>
              {selectedRequest
                ? `Request from ${format(new Date(selectedRequest.requestDate), "MMM d, yyyy")}`
                : "Track your laundry request"}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="py-4">
              <div className="mb-6 space-y-4">
                <div className="flex justify-between">
                  <div className="text-sm font-medium">Status</div>
                  <div>{getStatusBadge(selectedRequest.status)}</div>
                </div>

                <div className="space-y-8">
                  <div className="relative">
                    <div
                      className={`absolute left-2.5 top-0 h-full w-0.5 ${
                        ["Requested", "Picked", "In Process", "Delivered"].includes(selectedRequest.status)
                          ? "bg-blue-500"
                          : "bg-gray-200"
                      }`}
                    ></div>

                    <div className="relative flex items-start gap-4 pb-8">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${
                          ["Requested", "Picked", "In Process", "Delivered"].includes(selectedRequest.status)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        <Check className="h-3 w-3" />
                      </div>
                      <div>
                        <div className="font-medium">Requested</div>
                        <div className="text-sm text-muted-foreground">{formatDate(selectedRequest.requestDate)}</div>
                        <div className="mt-1 text-sm">
                          {selectedRequest.totalItems} items:{" "}
                          {selectedRequest.items.map((item) => `${item.count} ${item.type}`).join(", ")}
                        </div>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-4 pb-8">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${
                          ["Picked", "In Process", "Delivered"].includes(selectedRequest.status)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {selectedRequest.pickupDate ? <Check className="h-3 w-3" /> : <span className="h-3 w-3"></span>}
                      </div>
                      <div>
                        <div className="font-medium">Picked Up</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedRequest.pickupDate ? formatDate(selectedRequest.pickupDate) : "Pending"}
                        </div>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-4 pb-8">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${
                          ["In Process", "Delivered"].includes(selectedRequest.status)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {["In Process", "Delivered"].includes(selectedRequest.status) ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <span className="h-3 w-3"></span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">In Process</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedRequest.status === "In Process"
                            ? "Your laundry is being processed"
                            : selectedRequest.status === "Delivered"
                              ? "Completed"
                              : "Pending"}
                        </div>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-4">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${
                          selectedRequest.status === "Delivered" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                      >
                        {selectedRequest.status === "Delivered" ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <span className="h-3 w-3"></span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">Delivered</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedRequest.deliveryDate ? formatDate(selectedRequest.deliveryDate) : "Pending"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedRequest.notes && (
                  <div className="rounded-lg bg-muted p-3">
                    <div className="font-medium">Notes</div>
                    <div className="text-sm">{selectedRequest.notes}</div>
                  </div>
                )}

                {selectedRequest.status === "Requested" && (
                  <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Pickup Pending</p>
                        <p>Your laundry is scheduled for pickup. Please keep your items ready.</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedRequest.status === "In Process" && (
                  <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                    <div className="flex items-start gap-2">
                      <Loader2 className="mt-0.5 h-4 w-4 flex-shrink-0 animate-spin" />
                      <div>
                        <p className="font-medium">Processing</p>
                        <p>Your laundry is being processed and will be delivered soon.</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedRequest.status === "Delivered" && !selectedRequest.rating && (
                  <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Delivered</p>
                        <p>Your laundry has been delivered. Please rate the service.</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedRequest.rating && (
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Your Rating</div>
                    <div className="mt-1">{renderStarRating(selectedRequest.rating)}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsTrackingDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rate Laundry Service</DialogTitle>
            <DialogDescription>
              {selectedRequest
                ? `Rate your laundry service from ${format(new Date(selectedRequest.requestDate), "MMM d, yyyy")}`
                : "Rate your laundry service"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>How would you rate the service?</Label>
              <div className="flex justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="outline"
                    size="icon"
                    className={`h-10 w-10 ${rating >= star ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100" : ""}`}
                    onClick={() => setRating(star)}
                  >
                    <Star className={`h-5 w-5 ${rating >= star ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comment">Additional Comments (Optional)</Label>
              <Textarea
                id="comment"
                placeholder="Share your experience with the laundry service..."
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRatingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRatingSubmit}>Submit Rating</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
