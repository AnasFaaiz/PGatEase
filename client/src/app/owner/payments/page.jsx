"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowDownUp,
  ArrowUpRight,
  Bell,
  Calendar,
  Check,
  CreditCard,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Users,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Sample payment data
const paymentData = [
  {
    id: 1,
    residentName: "Aditya Patel",
    roomNumber: "203",
    bedId: "B",
    amount: 12500,
    dueDate: "2024-05-05",
    status: "Pending",
    pgName: "Sunshine PG",
    paymentHistory: [
      {
        id: 101,
        date: "2024-04-05",
        amount: 12500,
        method: "UPI",
        status: "Paid",
      },
      {
        id: 102,
        date: "2024-03-05",
        amount: 12500,
        method: "Bank Transfer",
        status: "Paid",
      },
    ],
  },
  {
    id: 2,
    residentName: "Priya Sharma",
    roomNumber: "105",
    bedId: "A",
    amount: 12500,
    dueDate: "2024-05-05",
    status: "Overdue",
    pgName: "Sunshine PG",
    paymentHistory: [
      {
        id: 201,
        date: "2024-03-08",
        amount: 12500,
        method: "Cash",
        status: "Paid",
        note: "Paid 3 days late",
      },
      {
        id: 202,
        date: "2024-02-05",
        amount: 12500,
        method: "UPI",
        status: "Paid",
      },
    ],
  },
  {
    id: 3,
    residentName: "Rahul Verma",
    roomNumber: "302",
    bedId: "C",
    amount: 12500,
    dueDate: "2024-05-05",
    status: "Paid",
    paidDate: "2024-04-03",
    pgName: "Sunshine PG",
    paymentHistory: [
      {
        id: 301,
        date: "2024-04-03",
        amount: 12500,
        method: "Credit Card",
        status: "Paid",
      },
      {
        id: 302,
        date: "2024-03-04",
        amount: 12500,
        method: "Credit Card",
        status: "Paid",
      },
    ],
  },
  {
    id: 4,
    residentName: "Neha Gupta",
    roomNumber: "201",
    bedId: "A",
    amount: 12500,
    dueDate: "2024-05-05",
    status: "Paid",
    paidDate: "2024-04-01",
    pgName: "Sunshine PG",
    paymentHistory: [
      {
        id: 401,
        date: "2024-04-01",
        amount: 12500,
        method: "UPI",
        status: "Paid",
      },
      {
        id: 402,
        date: "2024-03-02",
        amount: 12500,
        method: "UPI",
        status: "Paid",
      },
    ],
  },
  {
    id: 5,
    residentName: "Vikram Singh",
    roomNumber: "104",
    bedId: "B",
    amount: 12500,
    dueDate: "2024-05-05",
    status: "Pending",
    pgName: "Sunshine PG",
    paymentHistory: [
      {
        id: 501,
        date: "2024-04-05",
        amount: 12500,
        method: "Bank Transfer",
        status: "Paid",
      },
      {
        id: 502,
        date: "2024-03-04",
        amount: 12500,
        method: "Bank Transfer",
        status: "Paid",
      },
    ],
  },
  {
    id: 6,
    residentName: "Ananya Reddy",
    roomNumber: "305",
    bedId: "A",
    amount: 12500,
    dueDate: "2024-05-05",
    status: "Overdue",
    pgName: "Sunshine PG",
    paymentHistory: [
      {
        id: 601,
        date: "2024-03-10",
        amount: 12500,
        method: "UPI",
        status: "Paid",
        note: "Paid 5 days late",
      },
      {
        id: 602,
        date: "2024-02-07",
        amount: 12500,
        method: "UPI",
        status: "Paid",
        note: "Paid 2 days late",
      },
    ],
  },
  {
    id: 7,
    residentName: "Karan Malhotra",
    roomNumber: "102",
    bedId: "A",
    amount: 13500,
    dueDate: "2024-05-10",
    status: "Pending",
    pgName: "Green Valley PG",
    paymentHistory: [
      {
        id: 701,
        date: "2024-04-09",
        amount: 13500,
        method: "UPI",
        status: "Paid",
      },
      {
        id: 702,
        date: "2024-03-10",
        amount: 13500,
        method: "UPI",
        status: "Paid",
      },
    ],
  },
  {
    id: 8,
    residentName: "Divya Patel",
    roomNumber: "204",
    bedId: "B",
    amount: 11000,
    dueDate: "2024-05-15",
    status: "Paid",
    paidDate: "2024-04-12",
    pgName: "City Heights PG",
    paymentHistory: [
      {
        id: 801,
        date: "2024-04-12",
        amount: 11000,
        method: "Credit Card",
        status: "Paid",
      },
      {
        id: 802,
        date: "2024-03-14",
        amount: 11000,
        method: "Credit Card",
        status: "Paid",
      },
    ],
  },
]

// Monthly summary data
const monthlySummary = [
  {
    month: "January",
    totalDue: 100000,
    collected: 95000,
    pending: 5000,
    collectionRate: 95,
  },
  {
    month: "February",
    totalDue: 100000,
    collected: 97500,
    pending: 2500,
    collectionRate: 97.5,
  },
  {
    month: "March",
    totalDue: 100000,
    collected: 100000,
    pending: 0,
    collectionRate: 100,
  },
  {
    month: "April",
    totalDue: 100000,
    collected: 75000,
    pending: 25000,
    collectionRate: 75,
  },
]

export default function PaymentsPage() {
  const [selectedPg, setSelectedPg] = useState("Sunshine PG")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState("April")
  const [filters, setFilters] = useState({
    status: [],
    room: [],
  })
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false)

  // Filter payments based on selected PG and other filters
  const filteredPayments = paymentData
    .filter((payment) => payment.pgName === selectedPg)
    .filter((payment) => {
      // Filter by status based on active tab
      if (activeTab === "pending" && payment.status !== "Pending") return false
      if (activeTab === "paid" && payment.status !== "Paid") return false
      if (activeTab === "overdue" && payment.status !== "Overdue") return false

      // Filter by payment status
      if (filters.status.length > 0 && !filters.status.includes(payment.status)) return false

      // Filter by room
      if (filters.room.length > 0 && !filters.room.includes(payment.roomNumber)) return false

      return true
    })

  // Count payments by status
  const pendingPaymentsCount = paymentData.filter(
    (payment) => payment.pgName === selectedPg && payment.status === "Pending",
  ).length
  const paidPaymentsCount = paymentData.filter(
    (payment) => payment.pgName === selectedPg && payment.status === "Paid",
  ).length
  const overduePaymentsCount = paymentData.filter(
    (payment) => payment.pgName === selectedPg && payment.status === "Overdue",
  ).length

  // Calculate total amounts
  const totalDueAmount = paymentData
    .filter(
      (payment) => payment.pgName === selectedPg && (payment.status === "Pending" || payment.status === "Overdue"),
    )
    .reduce((total, payment) => total + payment.amount, 0)

  const totalCollectedAmount = paymentData
    .filter((payment) => payment.pgName === selectedPg && payment.status === "Paid")
    .reduce((total, payment) => total + payment.amount, 0)

  const totalOverdueAmount = paymentData
    .filter((payment) => payment.pgName === selectedPg && payment.status === "Overdue")
    .reduce((total, payment) => total + payment.amount, 0)

  // Get current month's summary
  const currentMonthSummary = monthlySummary.find((summary) => summary.month === selectedMonth)

  // Function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Paid
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Pending
          </Badge>
        )
      case "Overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Function to format currency
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`
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
      status: [],
      room: [],
    })
  }

  // Get unique room numbers for filter
  const uniqueRooms = [
    ...new Set(paymentData.filter((payment) => payment.pgName === selectedPg).map((payment) => payment.roomNumber)),
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Payments</h1>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">
                Manage payments for <span className="font-medium text-foreground">{selectedPg}</span>
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
            <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Record New Payment</DialogTitle>
                  <DialogDescription>Enter the payment details for a resident.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="resident">Resident</Label>
                    <Select>
                      <SelectTrigger id="resident">
                        <SelectValue placeholder="Select resident" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentData
                          .filter((payment) => payment.pgName === selectedPg)
                          .map((payment) => (
                            <SelectItem key={payment.id} value={payment.id.toString()}>
                              {payment.residentName} - Room {payment.roomNumber}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" placeholder="Enter amount" defaultValue="12500" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="payment-date">Payment Date</Label>
                    <Input id="payment-date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select>
                      <SelectTrigger id="payment-method">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Input id="notes" placeholder="Add any additional notes" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddPaymentDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddPaymentDialogOpen(false)}>Save Payment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Due</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalDueAmount)}</div>
            <p className="text-xs text-muted-foreground">
              From {pendingPaymentsCount + overduePaymentsCount} residents
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Collected This Month</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCollectedAmount)}</div>
            <p className="text-xs text-muted-foreground">From {paidPaymentsCount} residents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalOverdueAmount)}</div>
            <p className="text-xs text-muted-foreground">From {overduePaymentsCount} residents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentMonthSummary ? `${currentMonthSummary.collectionRate}%` : "0%"}
            </div>
            <div className="mt-2">
              <Progress value={currentMonthSummary ? currentMonthSummary.collectionRate : 0} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Resident Payments</CardTitle>
              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                      {(filters.status.length > 0 || filters.room.length > 0) && (
                        <Badge variant="secondary" className="ml-2 rounded-sm px-1">
                          {filters.status.length + filters.room.length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter Payments</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      Payment Status
                    </DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={filters.status.includes("Paid")}
                      onCheckedChange={() => toggleFilter("status", "Paid")}
                    >
                      Paid
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.status.includes("Pending")}
                      onCheckedChange={() => toggleFilter("status", "Pending")}
                    >
                      Pending
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.status.includes("Overdue")}
                      onCheckedChange={() => toggleFilter("status", "Overdue")}
                    >
                      Overdue
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      Room Number
                    </DropdownMenuLabel>
                    {uniqueRooms.map((room) => (
                      <DropdownMenuCheckboxItem
                        key={room}
                        checked={filters.room.includes(room)}
                        onCheckedChange={() => toggleFilter("room", room)}
                      >
                        Room {room}
                      </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuSeparator />
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search residents..." className="w-full pl-8" />
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
              <TabsList className="mb-4 grid w-full grid-cols-4">
                <TabsTrigger value="all">
                  All
                  <Badge variant="secondary" className="ml-2">
                    {paymentData.filter((payment) => payment.pgName === selectedPg).length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending
                  <Badge variant="secondary" className="ml-2">
                    {pendingPaymentsCount}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="paid">
                  Paid
                  <Badge variant="secondary" className="ml-2">
                    {paidPaymentsCount}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="overdue">
                  Overdue
                  <Badge variant="secondary" className="ml-2">
                    {overduePaymentsCount}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resident</TableHead>
                        <TableHead>Room/Bed</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.length > 0 ? (
                        filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                  <AvatarFallback>
                                    {payment.residentName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{payment.residentName}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              Room {payment.roomNumber}, Bed {payment.bedId}
                            </TableCell>
                            <TableCell>{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>{formatDate(payment.dueDate)}</TableCell>
                            <TableCell>{getStatusBadge(payment.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {payment.status !== "Paid" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => console.log(`Sending reminder to ${payment.residentName}`)}
                                  >
                                    <Send className="mr-2 h-3 w-3" />
                                    Remind
                                  </Button>
                                )}
                                <Dialog
                                  open={isHistoryDialogOpen && selectedPayment?.id === payment.id}
                                  onOpenChange={(open) => {
                                    setIsHistoryDialogOpen(open)
                                    if (!open) setSelectedPayment(null)
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedPayment(payment)
                                        setIsHistoryDialogOpen(true)
                                      }}
                                    >
                                      History
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                      <DialogTitle>Payment History</DialogTitle>
                                      <DialogDescription>
                                        Payment history for {payment.residentName} - Room {payment.roomNumber}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="max-h-[400px] overflow-auto">
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Method</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Notes</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {payment.paymentHistory.map((history) => (
                                            <TableRow key={history.id}>
                                              <TableCell>{formatDate(history.date)}</TableCell>
                                              <TableCell>{formatCurrency(history.amount)}</TableCell>
                                              <TableCell>{history.method}</TableCell>
                                              <TableCell>{getStatusBadge(history.status)}</TableCell>
                                              <TableCell>{history.note || "-"}</TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem
                                      onClick={() => console.log(`View details for ${payment.residentName}`)}
                                    >
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => console.log(`Edit payment for ${payment.residentName}`)}
                                    >
                                      Edit Payment
                                    </DropdownMenuItem>
                                    {payment.status !== "Paid" && (
                                      <DropdownMenuItem
                                        onClick={() => console.log(`Mark as paid for ${payment.residentName}`)}
                                      >
                                        Mark as Paid
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => console.log(`Delete payment for ${payment.residentName}`)}
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No payments found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resident</TableHead>
                        <TableHead>Room/Bed</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.length > 0 ? (
                        filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                  <AvatarFallback>
                                    {payment.residentName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{payment.residentName}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              Room {payment.roomNumber}, Bed {payment.bedId}
                            </TableCell>
                            <TableCell>{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>{formatDate(payment.dueDate)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => console.log(`Sending reminder to ${payment.residentName}`)}
                                >
                                  <Send className="mr-2 h-3 w-3" />
                                  Remind
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => console.log(`Mark as paid for ${payment.residentName}`)}
                                >
                                  <Check className="mr-2 h-3 w-3" />
                                  Mark Paid
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No pending payments found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="paid" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resident</TableHead>
                        <TableHead>Room/Bed</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Paid Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.length > 0 ? (
                        filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                  <AvatarFallback>
                                    {payment.residentName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{payment.residentName}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              Room {payment.roomNumber}, Bed {payment.bedId}
                            </TableCell>
                            <TableCell>{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>{formatDate(payment.paidDate)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedPayment(payment)
                                    setIsHistoryDialogOpen(true)
                                  }}
                                >
                                  History
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => console.log(`View receipt for ${payment.residentName}`)}
                                >
                                  Receipt
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No paid payments found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="overdue" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resident</TableHead>
                        <TableHead>Room/Bed</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Days Overdue</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.length > 0 ? (
                        filteredPayments.map((payment) => {
                          const dueDate = new Date(payment.dueDate)
                          const today = new Date()
                          const diffTime = Math.abs(today - dueDate)
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

                          return (
                            <TableRow key={payment.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                    <AvatarFallback>
                                      {payment.residentName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="font-medium">{payment.residentName}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                Room {payment.roomNumber}, Bed {payment.bedId}
                              </TableCell>
                              <TableCell>{formatCurrency(payment.amount)}</TableCell>
                              <TableCell>{formatDate(payment.dueDate)}</TableCell>
                              <TableCell className="text-red-500">{diffDays} days</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => console.log(`Sending reminder to ${payment.residentName}`)}
                                  >
                                    <Send className="mr-2 h-3 w-3" />
                                    Remind
                                  </Button>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => console.log(`Mark as paid for ${payment.residentName}`)}
                                  >
                                    <Check className="mr-2 h-3 w-3" />
                                    Mark Paid
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No overdue payments found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredPayments.length} of{" "}
              {paymentData.filter((payment) => payment.pgName === selectedPg).length} payments
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

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Monthly Summary</CardTitle>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {monthlySummary.map((summary) => (
                    <SelectItem key={summary.month} value={summary.month}>
                      {summary.month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CardDescription>Payment collection summary for {selectedMonth}</CardDescription>
          </CardHeader>
          <CardContent>
            {currentMonthSummary && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Due</span>
                  <span>{formatCurrency(currentMonthSummary.totalDue)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Collected</span>
                  <span className="text-green-600">{formatCurrency(currentMonthSummary.collected)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pending</span>
                  <span className="text-red-600">{formatCurrency(currentMonthSummary.pending)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Collection Rate</span>
                  <span className="font-medium">{currentMonthSummary.collectionRate}%</span>
                </div>
                <div>
                  <Progress value={currentMonthSummary.collectionRate} className="h-2" />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Reminders</CardTitle>
            <CardDescription>Send payment reminders to residents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">All Pending Payments</h4>
                    <p className="text-sm text-muted-foreground">
                      Send reminder to all residents with pending payments
                    </p>
                  </div>
                </div>
                <Button>Send Reminder</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <Bell className="h-5 w-5 text-red-500" />
                  <div>
                    <h4 className="font-medium">Overdue Payments</h4>
                    <p className="text-sm text-muted-foreground">
                      Send urgent reminder to residents with overdue payments
                    </p>
                  </div>
                </div>
                <Button variant="destructive">Send Urgent</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-amber-500" />
                  <div>
                    <h4 className="font-medium">Upcoming Due Dates</h4>
                    <p className="text-sm text-muted-foreground">Send reminder for payments due in the next 5 days</p>
                  </div>
                </div>
                <Button variant="outline">Send Reminder</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
