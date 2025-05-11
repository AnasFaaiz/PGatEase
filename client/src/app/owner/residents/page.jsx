"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function ResidentsPage() {
  const router = useRouter()

  // Sample data for residents
  const residents = [
    {
      id: 1,
      name: "Aditya Patel",
      email: "aditya@gmail.com",
      phone: "+91 9876543210",
      room: "203",
      bed: "B",
      joinDate: "Jan 15, 2023",
      status: "Active",
      dueAmount: 0,
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      phone: "+91 9876543211",
      room: "105",
      bed: "A",
      joinDate: "Mar 10, 2023",
      status: "Active",
      dueAmount: 12500,
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul@gmail.com",
      phone: "+91 9876543212",
      room: "302",
      bed: "C",
      joinDate: "Nov 5, 2022",
      status: "Active",
      dueAmount: 0,
    },
    {
      id: 4,
      name: "Neha Gupta",
      email: "neha@gmail.com",
      phone: "+91 9876543213",
      room: "201",
      bed: "A",
      joinDate: "Feb 20, 2023",
      status: "Active",
      dueAmount: 0,
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram@gmail.com",
      phone: "+91 9876543214",
      room: "104",
      bed: "B",
      joinDate: "Apr 12, 2023",
      status: "Notice Period",
      dueAmount: 0,
    },
    {
      id: 6,
      name: "Ananya Reddy",
      email: "ananya@gmail.com",
      phone: "+91 9876543215",
      room: "305",
      bed: "A",
      joinDate: "Dec 1, 2022",
      status: "Active",
      dueAmount: 1850,
    },
  ]

  const handleAddResident = () => {
    // Logic to add a new resident
    router.push("/owner/residents/add-residents")
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Residents</h1>
          <p className="text-muted-foreground">Manage residents at Sunshine PG</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddResident}>
            <UserPlus className="mr-2 h-4 w-4" /> Add Resident
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Residents</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search residents..." className="w-full pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Room/Bed</TableHead>
                  <TableHead className="hidden md:table-cell">Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {residents.map((resident) => (
                  <TableRow key={resident.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>
                            {resident.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{resident.name}</div>
                          <div className="text-sm text-muted-foreground">{resident.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      Room {resident.room}, Bed {resident.bed}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{resident.joinDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={resident.status === "Notice Period" ? "outline" : "default"}
                        className={
                          resident.status === "Notice Period"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-green-50 text-green-700"
                        }
                      >
                        {resident.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {resident.dueAmount > 0 ? (
                        <span className="text-red-500">₹{resident.dueAmount.toLocaleString()}</span>
                      ) : (
                        <span className="text-green-600">No dues</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Resident</DropdownMenuItem>
                          <DropdownMenuItem>Payment History</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Remove Resident</DropdownMenuItem>
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
