"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddResidentPage() {
  const router = useRouter()

  const pgs = [
    { id: 1, name:"Sunshine PG", location: "Sector 15, Noida" },
    { id: 2, name:"Green View PG", location: "Sector 16, Noida" },
    { id: 3, name:"City Stay PG", location: "Sector 17, Noida" },
    { id: 4, name:"Red PG", location: "Sector 18, Noida" },
  ]
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    room: "",
    bed: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Add your API call here to save the resident
    // Example:
    // await saveResident(formData)
    router.push("/owner/residents")
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Resident</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Room Number</Label>
                <Input
                  id="room"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="pg">Select PG</Label>
                <Select 
                  name="pgId" 
                  onValueChange={(value) => handleChange({ target: { name: "pgId", value }})}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a PG" />
                  </SelectTrigger>
                  <SelectContent>
                    {pgs.map(pg => (
                      <SelectItem key={pg.id} value={pg.id.toString()}>
                        {pg.name} - {pg.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bed">Bed</Label>
                <Select name="bed" onValueChange={(value) => handleChange({ target: { name: "bed", value }})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Bed A</SelectItem>
                    <SelectItem value="B">Bed B</SelectItem>
                    <SelectItem value="C">Bed C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button type="submit">Add Resident</Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push("/owner/residents")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}