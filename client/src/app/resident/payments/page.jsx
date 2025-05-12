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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Check,
  CreditCard,
  Download,
  FileText,
  IndianRupee,
  Search,
} from "lucide-react"
import { format } from "date-fns"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "@/components/ui/chart"

// Sample payment data
const paymentHistory = [
  {
    id: 1,
    month: "April 2024",
    dueDate: "2024-04-05",
    amount: 12500,
    status: "Paid",
    paidDate: "2024-04-03",
    paymentMethod: "UPI",
    transactionId: "UPI123456789",
    receiptUrl: "#",
  },
  {
    id: 2,
    month: "March 2024",
    dueDate: "2024-03-05",
    amount: 12500,
    status: "Paid",
    paidDate: "2024-03-04",
    paymentMethod: "Credit Card",
    transactionId: "CC987654321",
    receiptUrl: "#",
  },
  {
    id: 3,
    month: "February 2024",
    dueDate: "2024-02-05",
    amount: 12500,
    status: "Paid",
    paidDate: "2024-02-02",
    paymentMethod: "Bank Transfer",
    transactionId: "BT567891234",
    receiptUrl: "#",
  },
  {
    id: 4,
    month: "January 2024",
    dueDate: "2024-01-05",
    amount: 12500,
    status: "Paid",
    paidDate: "2024-01-05",
    paymentMethod: "UPI",
    transactionId: "UPI234567891",
    receiptUrl: "#",
  },
  {
    id: 5,
    month: "December 2023",
    dueDate: "2023-12-05",
    amount: 12500,
    status: "Paid",
    paidDate: "2023-12-03",
    paymentMethod: "Credit Card",
    transactionId: "CC345678912",
    receiptUrl: "#",
  },
  {
    id: 6,
    month: "November 2023",
    dueDate: "2023-11-05",
    amount: 12500,
    status: "Paid",
    paidDate: "2023-11-04",
    paymentMethod: "UPI",
    transactionId: "UPI456789123",
    receiptUrl: "#",
  },
]

// Current month's payment
const currentMonthPayment = {
  id: 7,
  month: "May 2024",
  dueDate: "2024-05-05",
  amount: 12500,
  status: "Due",
  breakdown: [
    { item: "Room Rent", amount: 10000 },
    { item: "Electricity", amount: 1500 },
    { item: "Water", amount: 500 },
    { item: "Internet", amount: 500 },
  ],
}

// Payment methods
const paymentMethods = [
  { id: "upi", name: "UPI", icon: <IndianRupee className="h-4 w-4" /> },
  { id: "card", name: "Credit/Debit Card", icon: <CreditCard className="h-4 w-4" /> },
  { id: "netbanking", name: "Net Banking", icon: <ArrowRight className="h-4 w-4" /> },
]

// Payment summary data for pie chart
const paymentSummaryData = [
  { name: "Paid", value: 6 },
  { name: "Due", value: 1 },
  { name: "Overdue", value: 0 },
]

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("current")
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter payments based on status and search query
  const filteredPayments = [...paymentHistory, currentMonthPayment]
    .filter((payment) => {
      // Filter by status
      if (statusFilter !== "all" && payment.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false
      }

      // Filter by search query
      if (searchQuery && !payment.month.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      return true
    })
    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))

  // Handle payment submission
  const handlePaymentSubmit = () => {
    if (!paymentMethod) {
      toast({
        title: "Missing information",
        description: "Please select a payment method.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would redirect to a payment gateway
    toast({
      title: "Redirecting to payment gateway",
      description: "You will be redirected to complete your payment.",
    })

    // Simulate payment success after 2 seconds
    setTimeout(() => {
      toast({
        title: "Payment successful",
        description: `Your payment of ₹${currentMonthPayment.amount} has been processed successfully.`,
      })
      setIsPaymentDialogOpen(false)
      setPaymentMethod("")
    }, 2000)
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return format(new Date(dateString), "MMM d, yyyy")
  }

  // Format currency
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Paid
          </Badge>
        )
      case "Due":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Due
          </Badge>
        )
      case "Overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Calculate days until due
  const getDaysUntilDue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Colors for pie chart
  const COLORS = ["#4ade80", "#3b82f6", "#ef4444"]

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Payments</h1>
            <p className="text-muted-foreground">Manage your rent and service payments</p>
          </div>
          <div className="flex gap-2">
            {currentMonthPayment.status === "Due" && (
              <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <IndianRupee className="mr-2 h-4 w-4" />
                    Pay Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Make Payment</DialogTitle>
                    <DialogDescription>Pay your rent for {currentMonthPayment.month}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="rounded-lg bg-muted p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium">Total Amount</span>
                        <span className="text-xl font-bold">{formatCurrency(currentMonthPayment.amount)}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Due on {formatDate(currentMonthPayment.dueDate)}
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-2">
                      <Label>Payment Breakdown</Label>
                      <div className="space-y-2">
                        {currentMonthPayment.breakdown.map((item) => (
                          <div key={item.item} className="flex items-center justify-between text-sm">
                            <span>{item.item}</span>
                            <span>{formatCurrency(item.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-2">
                      <Label>Select Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        {paymentMethods.map((method) => (
                          <div key={method.id} className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value={method.id} id={method.id} />
                              <div className="flex items-center gap-2">
                                {method.icon}
                                <Label htmlFor={method.id}>{method.name}</Label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handlePaymentSubmit}>Proceed to Pay</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Payment History</CardTitle>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="due">Due</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="h-8 pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <CardDescription>View and manage your payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="all">All Payments</TabsTrigger>
              </TabsList>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
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
                            <div className="font-medium">{payment.month}</div>
                          </TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>
                            <div>{formatDate(payment.dueDate)}</div>
                            {payment.status === "Due" && (
                              <div className="text-sm text-muted-foreground">
                                {getDaysUntilDue(payment.dueDate) > 0
                                  ? `${getDaysUntilDue(payment.dueDate)} days left`
                                  : "Due today"}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(payment.status)}
                              {payment.status === "Paid" && (
                                <div className="text-sm text-muted-foreground">{formatDate(payment.paidDate)}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {payment.status === "Due" && (
                                <Button size="sm" onClick={() => setIsPaymentDialogOpen(true)}>
                                  Pay Now
                                </Button>
                              )}
                              {payment.status === "Paid" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedPayment(payment)
                                    setIsReceiptDialogOpen(true)
                                  }}
                                >
                                  Receipt
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No payments found.
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
              Showing {filteredPayments.length} of {paymentHistory.length + 1} payments
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export History
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Payment</CardTitle>
              <CardDescription>Details for {currentMonthPayment.month}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  {getStatusBadge(currentMonthPayment.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Amount</span>
                  <span className="font-bold">{formatCurrency(currentMonthPayment.amount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Due Date</span>
                  <span>{formatDate(currentMonthPayment.dueDate)}</span>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-2 text-sm font-medium">Payment Breakdown</h4>
                  <div className="space-y-2">
                    {currentMonthPayment.breakdown.map((item) => (
                      <div key={item.item} className="flex items-center justify-between text-sm">
                        <span>{item.item}</span>
                        <span>{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {currentMonthPayment.status === "Due" ? (
                <Button className="w-full" onClick={() => setIsPaymentDialogOpen(true)}>
                  <IndianRupee className="mr-2 h-4 w-4" />
                  Pay Now
                </Button>
              ) : (
                <div className="w-full rounded-lg bg-green-50 p-3 text-sm text-green-800">
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Payment Complete</p>
                      <p>Your payment for this month has been processed.</p>
                    </div>
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
              <CardDescription>Overview of your payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentSummaryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentSummaryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#4ade80]" />
                    <span className="text-sm">Paid</span>
                  </div>
                  <span className="font-medium">{paymentSummaryData[0].value} months</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#3b82f6]" />
                    <span className="text-sm">Due</span>
                  </div>
                  <span className="font-medium">{paymentSummaryData[1].value} month</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#ef4444]" />
                    <span className="text-sm">Overdue</span>
                  </div>
                  <span className="font-medium">{paymentSummaryData[2].value} months</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Important information about payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium">Due Date</h4>
                    <p className="text-sm text-muted-foreground">Payments are due on the 5th of every month.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div>
                    <h4 className="font-medium">Late Fees</h4>
                    <p className="text-sm text-muted-foreground">
                      A late fee of ₹500 will be applied after the 10th of the month.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <FileText className="mt-0.5 h-5 w-5 text-green-500" />
                  <div>
                    <h4 className="font-medium">Receipts</h4>
                    <p className="text-sm text-muted-foreground">
                      Digital receipts are available immediately after payment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Receipt Dialog */}
      <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
            <DialogDescription>
              {selectedPayment ? `Receipt for ${selectedPayment.month}` : "Payment receipt"}
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="py-4">
              <div className="mb-6 space-y-4">
                <div className="flex justify-between">
                  <div className="text-sm font-medium">Receipt No.</div>
                  <div>#{selectedPayment.id.toString().padStart(6, "0")}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-medium">Payment Date</div>
                  <div>{formatDate(selectedPayment.paidDate)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-medium">Amount</div>
                  <div className="font-bold">{formatCurrency(selectedPayment.amount)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-medium">Payment Method</div>
                  <div>{selectedPayment.paymentMethod}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-medium">Transaction ID</div>
                  <div>{selectedPayment.transactionId}</div>
                </div>

                <Separator />

                <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Payment Successful</p>
                      <p>Your payment has been processed successfully.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReceiptDialogOpen(false)}>
              Close
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
