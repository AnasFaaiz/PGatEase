"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function AddProperty() {
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const propertyData = Object.fromEntries(formData)

    try {
      // Get existing properties from localStorage
      const existingProperties = JSON.parse(localStorage.getItem('properties') || '[]')
      
      // Create new property object with required format
      const newProperty = {
        name: propertyData.name,
        address: propertyData.address,
        occupied: 0,
        vacant: parseInt(propertyData.rooms || 0),
        totalCapacity: parseInt(propertyData.capacity || 0),
        facilities: propertyData.facilities ? propertyData.facilities.split(',').map(f => f.trim()) : [],
        rules: propertyData.rules || '',
        createdAt: new Date().toISOString()
      }

      // Add new property to existing array
      const updatedProperties = [...existingProperties, newProperty]

      // Save back to localStorage
      localStorage.setItem('properties', JSON.stringify(updatedProperties))

      // Call the global addProperty function if it exists
      if (typeof window.addProperty === 'function') {
        window.addProperty(newProperty)
      }

      router.push("/owner/dashboard")
    } catch (error) {
      console.error('Error saving property:', error)
      // You might want to show an error message to the user here
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Property</h1>
        <p className="text-muted-foreground">Enter your property details</p>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
          <CardDescription>
            Please fill in the details of your new property
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Property Name</Label>
              <Input 
                id="name" 
                name="name"
                placeholder="Enter property name" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter complete address"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rooms">Total Rooms</Label>
                <Input
                  id="rooms"
                  name="rooms"
                  type="number"
                  min="1"
                  placeholder="Number of rooms"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Total Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  placeholder="Maximum residents"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="facilities">Facilities</Label>
              <Textarea
                id="facilities"
                name="facilities"
                placeholder="List available facilities (e.g., WiFi, AC, Laundry - separate with commas)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rules">Rules & Regulations</Label>
              <Textarea
                id="rules"
                name="rules"
                placeholder="Enter property rules and regulations"
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit">Add Property</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}