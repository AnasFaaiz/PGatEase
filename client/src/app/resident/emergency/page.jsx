"use client"

import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, AlertTriangle, Flame, Heart, Shield } from "lucide-react"
import { format } from "date-fns"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// Sample emergency alerts data
const emergencyAlerts = [
  {
    id: 1,
    type: "Medical",
    description: "Feeling dizzy and having difficulty breathing",
    timestamp: "2024-04-15T08:30:00",
    status: "Responded",
    responseTime: "2024-04-15T08:35:00",
    responder: "Medical Team",
    notes: "Resident was attended to and given first aid. Advised to rest and monitor symptoms.",
  },
  {
    id: 2,
    type: "Security",
    description: "Suspicious person loitering near my room",
    timestamp: "2024-04-10T22:45:00",
    status: "Responded",
    responseTime: "2024-04-10T22:50:00",
    responder: "Security Team",
    notes: "Security personnel checked the area. No suspicious person found. Increased patrolling for the night.",
  },
  {
    id: 3,
    type: "Maintenance",
    description: "Water leakage from ceiling, risk of electrical short circuit",
    timestamp: "2024-04-05T16:15:00",
    status: "Responded",
    responseTime: "2024-04-05T16:25:00",
    responder: "Maintenance Team",
    notes: "Temporary fix applied. Scheduled for complete repair tomorrow.",
  },
]

// Emergency types
const emergencyTypes = [
  { id: "medical", name: "Medical", icon: <Heart className="h-5 w-5 text-red-500" /> },
  { id: "security", name: "Security", icon: <Shield className="h-5 w-5 text-blue-500" /> },
  { id: "fire", name: "Fire", icon: <Flame className="h-5 w-5 text-orange-500" /> },
  { id: "maintenance", name: "Maintenance", icon: <AlertTriangle className="h-5 w-5 text-amber-500" /> },
]

export default function EmergencyPage() {
  const [activeTab, setActiveTab] = useState("current")
  const [isEmergencyDialogOpen, setIsEmergencyDialogOpen] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [emergencyType, setEmergencyType] = useState("")
  const [emergencyDescription, setEmergencyDescription] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [canCancel, setCanCancel] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const countdownRef = useRef(null)

  // Handle emergency submission
  const handleEmergencySubmit = () => {
    if (!emergencyType) {
      toast({
        title: "Missing information",
        description: "Please select an emergency type.",
        variant: "destructive",
      })
      return
    }

    setIsEmergencyDialogOpen(false)
    setIsConfirmationDialogOpen(true)
    setIsSending(true)
    setCanCancel(true)
    setCountdown(5)

    // Start countdown for cancel window
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current)
          setCanCancel(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Simulate sending alert after countdown
    setTimeout(() => {
      if (isSending) {
        setIsSending(false)
        toast({
          title: "Emergency alert sent",
          description: "Help is on the way. Stay calm and wait for assistance.",
        })
        setIsConfirmationDialogOpen(false)
        // Reset form
        setEmergencyType("")
        setEmergencyDescription("")
      }
    }, 5000)
  }

  // Handle emergency cancellation
  const handleEmergencyCancel = () => {
    clearInterval(countdownRef.current)
    setIsSending(false)
    setIsConfirmationDialogOpen(false)
    toast({
      title: "Emergency alert cancelled",
      description: "Your emergency alert has been cancelled.",
    })
  }

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current)
      }
    }
  }, [])

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return format(new Date(dateString), "MMM d, yyyy h:mm a")
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Responded":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Responded
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get emergency icon
  const getEmergencyIcon = (type) => {
    const emergencyType = emergencyTypes.find((t) => t.name === type)
    return emergencyType ? emergencyType.icon : <AlertCircle className="h-5 w-5 text-gray-500" />
  }

  // Calculate response time in minutes
  const calculateResponseTime = (alertTime, responseTime) => {
    if (!responseTime) return "Pending"
    const alertDate = new Date(alertTime)
    const responseDate = new Date(responseTime)
    const diffMs = responseDate - alertDate
    const diffMins = Math.round(diffMs / 60000)
    return `${diffMins} minutes`
  }

  // View alert details
  const viewAlertDetails = (alert) => {
    setSelectedAlert(alert)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Emergency Alerts</h1>
            <p className="text-muted-foreground">Send emergency alerts and view past alerts</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isEmergencyDialogOpen} onOpenChange={setIsEmergencyDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="lg" className="gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Emergency Alert
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Send Emergency Alert</DialogTitle>
                  <DialogDescription>
                    Select the type of emergency and provide additional details if possible.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Emergency Type</Label>
                    <RadioGroup value={emergencyType} onValueChange={setEmergencyType}>
                      {emergencyTypes.map((type) => (
                        <div
                          key={type.id}
                          className={cn(
                            "flex items-center justify-between rounded-lg border p-3",
                            emergencyType === type.name && "border-red-500 bg-red-50",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value={type.name} id={type.id} />
                            <div className="flex items-center gap-2">
                              {type.icon}
                              <Label htmlFor={type.id}>{type.name}</Label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Additional Details (Optional)</Label>
                    <textarea
                      id="description"
                      placeholder="Briefly describe your emergency..."
                      rows={3}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={emergencyDescription}
                      onChange={(e) => setEmergencyDescription(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEmergencyDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleEmergencySubmit}>
                    Send Alert
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Emergency Confirmation Dialog */}
      <Dialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sending Emergency Alert</DialogTitle>
            <DialogDescription>Your alert is being sent to the response team.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Emergency Alert: {emergencyType}</p>
                  <p className="mt-1 text-sm">{emergencyDescription || "No additional details provided."}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              {isSending ? (
                <div className="flex flex-col items-center">
                  <div className="mb-2 h-12 w-12 animate-pulse rounded-full bg-red-100 p-3">
                    <div className="h-full w-full animate-ping rounded-full bg-red-400"></div>
                  </div>
                  <p className="text-center font-medium">Sending alert...</p>
                  {canCancel && (
                    <p className="mt-1 text-center text-sm text-muted-foreground">
                      You can cancel this alert for {countdown} more seconds
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <AlertCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-center font-medium">Alert sent successfully</p>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            {canCancel && (
              <Button variant="outline" onClick={handleEmergencyCancel}>
                Cancel Alert
              </Button>
            )}
            {!isSending && <Button onClick={() => setIsConfirmationDialogOpen(false)}>Close</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedAlert && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  {getEmergencyIcon(selectedAlert.type)}
                  <DialogTitle>{selectedAlert.type} Emergency</DialogTitle>
                </div>
                <DialogDescription>Reported on {formatDate(selectedAlert.timestamp)}</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>Status: {getStatusBadge(selectedAlert.status)}</div>
                  <div className="text-sm text-muted-foreground">
                    Response time: {calculateResponseTime(selectedAlert.timestamp, selectedAlert.responseTime)}
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Description</h4>
                  <p className="text-sm">{selectedAlert.description}</p>
                </div>
                <div className="mt-4 rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Response Details</h4>
                  <div className="mb-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Responder:</div>
                    <div>{selectedAlert.responder || "Not assigned yet"}</div>
                    <div className="text-muted-foreground">Response Time:</div>
                    <div>{formatDate(selectedAlert.responseTime) || "Pending"}</div>
                  </div>
                  <Separator className="my-2" />
                  <h4 className="mb-2 font-medium">Notes</h4>
                  <p className="text-sm">{selectedAlert.notes || "No notes available"}</p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsDetailDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Main content */}
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger value="current">Current Alert</TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
        </TabsList>
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Current Emergency Status</CardTitle>
              <CardDescription>
                No active emergency alerts. Use the Emergency Alert button to report an emergency.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="mb-4 rounded-full bg-green-50 p-4">
                  <Shield className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="mb-1 text-lg font-medium">All Clear</h3>
                <p className="text-center text-muted-foreground">There are no active emergency alerts for your PG.</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <h4 className="mb-2 font-medium">Emergency Guidelines</h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Use the Emergency Alert button only for genuine emergencies</li>
                <li>Select the appropriate emergency type for faster response</li>
                <li>Provide clear details about your emergency when possible</li>
                <li>Stay in your room unless instructed otherwise or unsafe to do so</li>
                <li>Follow instructions from emergency responders</li>
              </ul>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <div className="grid gap-4">
            {emergencyAlerts.map((alert) => (
              <Card key={alert.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getEmergencyIcon(alert.type)}
                      <CardTitle className="text-base">{alert.type} Emergency</CardTitle>
                    </div>
                    {getStatusBadge(alert.status)}
                  </div>
                  <CardDescription>{formatDate(alert.timestamp)}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm">{alert.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t bg-muted/20 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Response time: {calculateResponseTime(alert.timestamp, alert.responseTime)}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => viewAlertDetails(alert)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
