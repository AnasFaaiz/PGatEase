"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ComplaintsPage() {
  // Sample complaints data - replace with actual API call
  const complaints = [
    {
      id: 1,
      title: "Water Leakage in Bathroom",
      description: "There is a continuous water leakage from the bathroom tap",
      resident: "Aditya Patel",
      room: "203",
      date: "2024-02-10",
      status: "Pending",
      priority: "High"
    },
    {
      id: 2,
      title: "AC Not Working",
      description: "AC in my room is not cooling properly",
      resident: "Priya Sharma",
      room: "105",
      date: "2024-02-09",
      status: "In Progress",
      priority: "Medium"
    },
    {
      id: 3,
      title: "WiFi Connectivity Issues",
      description: "Poor WiFi signal in my room",
      resident: "Rahul Verma",
      room: "302",
      date: "2024-02-08",
      status: "Resolved",
      priority: "Low"
    }
  ]

  const staffMembers = [
    {id: 1, name: "Rajesh Kumar", role: "Warden"},
    {id: 2, name: "Sunita Sharma", role: "Assistant Warden"},
    {id: 3, name: "Amit Singh", role: "Maintence Staff"},
    {id: 4, name: "Priya Verma", role: "Housekeeping Staff"},
  ]

  const handleAssignStaff = (complaintId, staffId) => {
    // Logic to assign staff to the complaint
    console.log(`Assigned staff ID ${staffId} to complaint ID ${complaintId}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-700"
      case "In Progress":
        return "bg-blue-50 text-blue-700"
      case "Resolved":
        return "bg-green-50 text-green-700"
      default:
        return "bg-gray-50 text-gray-700"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-700"
      case "Medium":
        return "bg-orange-50 text-orange-700"
      case "Low":
        return "bg-green-50 text-green-700"
      default:
        return "bg-gray-50 text-gray-700"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Complaints</h1>
        <p className="text-muted-foreground">Manage and track resident complaints</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Complaints</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search complaints..." className="w-full pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Resident</TableHead>
                  <TableHead className="hidden md:table-cell">Room</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{complaint.title}</div>
                        <div className="text-sm text-muted-foreground">{complaint.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{complaint.resident}</TableCell>
                    <TableCell className="hidden md:table-cell">{complaint.room}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(complaint.priority)}>
                        {complaint.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(complaint.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Assign to Staff</DropdownMenuLabel>
                          {staffMembers.map((staff) => (
                            <DropdownMenuItem 
                              key={staff.id}
                              onClick={() => handleAssignStaff(complaint.id, staff.id)}
                            >
                              {staff.name} - {staff.role}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}