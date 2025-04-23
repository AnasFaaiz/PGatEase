"use client"

import React from 'react'
import { DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Clock, FileImage, MessageSquare, Plus, Search, Star, Upload, X } from "lucide-react"
import { format } from "date-fns"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

// Sample complaints data
const complaints = [
  {
    id: 1,
    title: "Bathroom Tap Leakage",
    category: "Maintenance",
    description: "The bathroom tap is leaking continuously and wasting water.",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2024-04-15T10:30:00",
    updatedAt: "2024-04-16T14:45:00",
    images: ["/placeholder.svg?height=200&width=300"],
    responses: [
      {
        id: 101,
        from: "Admin",
        message: "We have assigned a plumber to fix the issue. They will visit tomorrow between 10 AM and 12 PM.",
        timestamp: "2024-04-16T14:45:00",
      },
    ],
    resolution: null,
    rating: null,
  },
  {
    id: 2,
    title: "Wi-Fi Connectivity Issue",
    category: "Internet",
    description: "The Wi-Fi connection is very slow and keeps disconnecting frequently.",
    status: "Resolved",
    priority: "High",
    createdAt: "2024-04-10T09:15:00",
    updatedAt: "2024-04-12T16:30:00",
    images: [],
    responses: [
      {
        id: 201,
        from: "Admin",
        message: "We will check the router and connection. Our technician will visit today.",
        timestamp: "2024-04-10T11:30:00",
      },
      {
        id: 202,
        from: "Admin",
        message:
          "The router has been reset and the connection should be stable now. Please let us know if you face any further issues.",
        timestamp: "2024-04-12T16:30:00",
      },
    ],
    resolution: "Router was reset and connection is stable now.",
    rating: 4,
  },
  {
    id: 3,
    title: "Food Quality Concern",
    category: "Food",
    description: "The food served for dinner yesterday was cold and not fresh.",
    status: "Resolved",
    priority: "Medium",
    createdAt: "2024-04-05T20:45:00",
    updatedAt: "2024-04-07T10:15:00",
    images: ["/placeholder.svg?height=200&width=300"],
    responses: [
      {
        id: 301,
        from: "Admin",
        message:
          "We apologize for the inconvenience. We will look into this matter and ensure better quality in the future.",
        timestamp: "2024-04-06T09:30:00",
      },
      {
        id: 302,
        from: "Admin",
        message:
          "We have spoken with the kitchen staff and implemented stricter quality checks. Thank you for bringing this to our attention.",
        timestamp: "2024-04-07T10:15:00",
      },
    ],
    resolution: "Implemented stricter quality checks in the kitchen.",
    rating: 3,
  },
  {
    id: 4,
    title: "Noisy Neighbors",
    category: "Other",
    description: "The residents in Room 302 are playing loud music late at night, making it difficult to sleep.",
    status: "New",
    priority: "High",
    createdAt: "2024-04-20T23:10:00",
    updatedAt: "2024-04-20T23:10:00",
    images: [],
    responses: [],
    resolution: null,
    rating: null,
  },
]

// Complaint categories
const complaintCategories = [
  { id: "maintenance", name: "Maintenance" },
  { id: "food", name: "Food" },
  { id: "internet", name: "Internet" },
  { id: "cleanliness", name: "Cleanliness" },
  { id: "security", name: "Security" },
  { id: "other", name: "Other" },
]

export default function ComplaintsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [isNewComplaintDialogOpen, setIsNewComplaintDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    category: "",
    description: "",
    priority: "Medium",
    images: [],
  })
  const [replyText, setReplyText] = useState("")
  const [rating, setRating] = useState(0)
  const [ratingComment, setRatingComment] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter complaints based on status, category, and search query
  const filteredComplaints = complaints
    .filter((complaint) => {
      // Filter by status
      if (activeTab !== "all" && complaint.status.toLowerCase() !== activeTab.toLowerCase()) {
        return false
      }

      // Filter by status filter
      if (statusFilter !== "all" && complaint.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false
      }

      // Filter by category
      if (categoryFilter !== "all" && complaint.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false
      }

      // Filter by search query
      if (
        searchQuery &&
        !complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !complaint.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      return true
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // Handle new complaint submission
  const handleNewComplaintSubmit = () => {
    // Validate complaint
    if (!newComplaint.title.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a title for your complaint.",
        variant: "destructive",
      })
      return
    }

    if (!newComplaint.category) {
      toast({
        title: "Missing information",
        description: "Please select a category for your complaint.",
        variant: "destructive",
      })
      return
    }

    if (!newComplaint.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a description of your complaint.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would send the complaint to the server
    toast({
      title: "Complaint submitted",
      description: "Your complaint has been submitted successfully.",
    })

    setIsNewComplaintDialogOpen(false)
    // Reset form
    setNewComplaint({
      title: "",
      category: "",
      description: "",
      priority: "Medium",
      images: [],
    })
  }

  // Handle reply submission
  const handleReplySubmit = () => {
    if (!replyText.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a reply.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would send the reply to the server
    toast({
      title: "Reply submitted",
      description: "Your reply has been submitted successfully.",
    })

    setReplyText("")
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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return format(new Date(dateString), "MMM d, yyyy h:mm a")
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "New":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            New
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
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

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            High
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            Medium
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  // Get status progress
  const getStatusProgress = (status) => {
    switch (status) {
      case "Resolved":
        return 100
      case "In Progress":
        return 50
      case "New":
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

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    // In a real app, this would upload the files to a server
    // For now, we'll just create object URLs
    const fileUrls = files.map((file) => URL.createObjectURL(file))
    setNewComplaint({
      ...newComplaint,
      images: [...newComplaint.images, ...fileUrls],
    })
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Complaints</h1>
            <p className="text-muted-foreground">Lodge and track your complaints</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isNewComplaintDialogOpen} onOpenChange={setIsNewComplaintDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Complaint
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Lodge a New Complaint</DialogTitle>
                  <DialogDescription>Provide details about your complaint.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Brief title of your complaint"
                      value={newComplaint.title}
                      onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newComplaint.category}
                      onValueChange={(value) => setNewComplaint({ ...newComplaint, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {complaintCategories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of your complaint"
                      rows={4}
                      value={newComplaint.description}
                      onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <RadioGroup
                      id="priority"
                      value={newComplaint.priority}
                      onValueChange={(value) => setNewComplaint({ ...newComplaint, priority: value })}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Low" id="low" />
                        <Label htmlFor="low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="High" id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="images">Attach Images (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("file-upload").click()}
                        type="button"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                      <Input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <span className="text-sm text-muted-foreground">
                        {newComplaint.images.length > 0
                          ? `${newComplaint.images.length} image(s) selected`
                          : "No images selected"}
                      </span>
                    </div>
                    {newComplaint.images.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {newComplaint.images.map((image, index) => (
                          <div key={index} className="relative h-20 w-20 overflow-hidden rounded-md border">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Uploaded ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute right-1 top-1 h-5 w-5"
                              onClick={() =>
                                setNewComplaint({
                                  ...newComplaint,
                                  images: newComplaint.images.filter((_, i) => i !== index),
                                })
                              }
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewComplaintDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleNewComplaintSubmit}>Submit Complaint</Button>
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
              <CardTitle>My Complaints</CardTitle>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {complaintCategories.map((category) => (
                      <SelectItem key={category.id} value={category.name.toLowerCase()}>
                        {category.name}
                      </SelectItem>
                    ))}
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
            <CardDescription>View and track your complaints</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="in progress">In Progress</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              <div className="space-y-4">
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint) => (
                    <Card key={complaint.id} className="overflow-hidden">
                      <div
                        className={`h-1 w-full ${
                          complaint.priority === "High"
                            ? "bg-red-500"
                            : complaint.priority === "Medium"
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }`}
                      />
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{complaint.title}</h3>
                                {getStatusBadge(complaint.status)}
                              </div>
                              <div className="flex items-center gap-2">
                                {getPriorityBadge(complaint.priority)}
                                <Badge variant="outline">{complaint.category}</Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{complaint.description}</p>
                            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Created: {formatDate(complaint.createdAt)}</span>
                              {complaint.updatedAt !== complaint.createdAt && (
                                <span>Updated: {formatDate(complaint.updatedAt)}</span>
                              )}
                            </div>
                            <div className="mt-2">
                              <Progress value={getStatusProgress(complaint.status)} className="h-1.5" />
                            </div>
                          </div>
                          <div className="flex flex-row gap-2 md:flex-col">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedComplaint(complaint)
                                setIsDetailDialogOpen(true)
                              }}
                            >
                              View Details
                            </Button>
                            {complaint.status === "Resolved" && !complaint.rating && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedComplaint(complaint)
                                  setIsRatingDialogOpen(true)
                                }}
                              >
                                Rate Resolution
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <MessageSquare className="mb-2 h-10 w-10 text-muted-foreground" />
                    <h3 className="mb-1 text-lg font-medium">No complaints found</h3>
                    <p className="text-sm text-muted-foreground">
                      {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                        ? "Try adjusting your filters to see more results."
                        : "You haven't lodged any complaints yet."}
                    </p>
                    <Button className="mt-4" onClick={() => setIsNewComplaintDialogOpen(true)}>
                      Lodge a Complaint
                    </Button>
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredComplaints.length} of {complaints.length} complaints
            </div>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Complaint Summary</CardTitle>
              <CardDescription>Overview of your complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Complaints</span>
                  <Badge variant="outline">{complaints.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">New</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {complaints.filter((c) => c.status === "New").length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">In Progress</span>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">
                    {complaints.filter((c) => c.status === "In Progress").length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Resolved</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {complaints.filter((c) => c.status === "Resolved").length}
                  </Badge>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-2 text-sm font-medium">By Category</h4>
                  <div className="space-y-2">
                    {complaintCategories.map((category) => {
                      const count = complaints.filter((c) => c.category === category.name).length
                      if (count === 0) return null
                      return (
                        <div key={category.id} className="flex items-center justify-between text-sm">
                          <span>{category.name}</span>
                          <span>{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guidelines</CardTitle>
              <CardDescription>Tips for lodging effective complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium">Be Specific</h4>
                    <p className="text-sm text-muted-foreground">
                      Provide clear details about the issue, including location and time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <FileImage className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div>
                    <h4 className="font-medium">Add Images</h4>
                    <p className="text-sm text-muted-foreground">
                      Attach photos to help us better understand and resolve the issue.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-3">
                  <Clock className="mt-0.5 h-5 w-5 text-green-500" />
                  <div>
                    <h4 className="font-medium">Response Time</h4>
                    <p className="text-sm text-muted-foreground">
                      We aim to respond to all complaints within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Complaint Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogDescription>
              {selectedComplaint ? `#${selectedComplaint.id} - ${selectedComplaint.title}` : "Complaint details"}
            </DialogDescription>
          </DialogHeader>
          {selectedComplaint && (
            <div className="py-4">
              <div className="mb-6 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {getStatusBadge(selectedComplaint.status)}
                  {getPriorityBadge(selectedComplaint.priority)}
                  <Badge variant="outline">{selectedComplaint.category}</Badge>
                </div>

                <div>
                  <h3 className="font-medium">Description</h3>
                  <p className="mt-1 text-sm">{selectedComplaint.description}</p>
                </div>

                {selectedComplaint.images.length > 0 && (
                  <div>
                    <h3 className="font-medium">Images</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedComplaint.images.map((image, index) => (
                        <div key={index} className="h-24 w-24 overflow-hidden rounded-md border">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Image ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-lg bg-muted p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Status Timeline</h3>
                    <Progress value={getStatusProgress(selectedComplaint.status)} className="h-1.5 w-24" />
                  </div>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Created</span>
                      <span>{formatDate(selectedComplaint.createdAt)}</span>
                    </div>
                    {selectedComplaint.status !== "New" && (
                      <div className="flex items-center justify-between">
                        <span>In Progress</span>
                        <span>
                          {selectedComplaint.status === "In Progress" || selectedComplaint.status === "Resolved"
                            ? formatDate(selectedComplaint.updatedAt)
                            : "Pending"}
                        </span>
                      </div>
                    )}
                    {selectedComplaint.status === "Resolved" && (
                      <div className="flex items-center justify-between">
                        <span>Resolved</span>
                        <span>{formatDate(selectedComplaint.updatedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedComplaint.resolution && (
                  <div className="rounded-lg bg-green-50 p-3 text-green-800">
                    <h3 className="font-medium">Resolution</h3>
                    <p className="mt-1 text-sm">{selectedComplaint.resolution}</p>
                    {selectedComplaint.rating && (
                      <div className="mt-2">
                        <span className="text-sm font-medium">Your Rating: </span>
                        {renderStarRating(selectedComplaint.rating)}
                      </div>
                    )}
                  </div>
                )}

                <Separator />

                <div>
                  <h3 className="mb-2 font-medium">Conversation</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>AP</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 rounded-lg bg-muted p-3">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-medium">You</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(selectedComplaint.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm">{selectedComplaint.description}</p>
                      </div>
                    </div>

                    {selectedComplaint.responses.map((response) => (
                      <div key={response.id} className="flex gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 rounded-lg bg-blue-50 p-3">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="font-medium">{response.from}</span>
                            <span className="text-xs text-muted-foreground">{formatDate(response.timestamp)}</span>
                          </div>
                          <p className="text-sm">{response.message}</p>
                        </div>
                      </div>
                    ))}

                    {selectedComplaint.status !== "Resolved" && (
                      <div className="mt-4">
                        <Textarea
                          placeholder="Add a reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                        />
                        <div className="mt-2 flex justify-end">
                          <Button onClick={handleReplySubmit}>Send Reply</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rate Resolution</DialogTitle>
            <DialogDescription>
              {selectedComplaint
                ? `Rate how well your complaint "${selectedComplaint.title}" was resolved`
                : "Rate how well your complaint was resolved"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>How satisfied are you with the resolution?</Label>
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
                placeholder="Share your feedback about the resolution..."
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
