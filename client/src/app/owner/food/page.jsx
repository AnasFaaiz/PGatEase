"use client"

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
  Calendar,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Download,
  Filter,
  Pizza,
  Search,
  Share2,
  Utensils,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "@/components/ui/chart"

// Sample meal preference data
const mealPreferences = [
  {
    id: 1,
    residentName: "Aditya Patel",
    roomNumber: "203",
    breakfast: "Poha & Tea",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Paneer Butter Masala",
    dietType: "Vegetarian",
    allergies: "None",
    pgName: "Sunshine PG",
  },
  {
    id: 2,
    residentName: "Priya Sharma",
    roomNumber: "105",
    breakfast: "Bread & Eggs",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Chicken Curry",
    dietType: "Non-Vegetarian",
    allergies: "Peanuts",
    pgName: "Sunshine PG",
  },
  {
    id: 3,
    residentName: "Rahul Verma",
    roomNumber: "302",
    breakfast: "Idli & Sambar",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Paneer Butter Masala",
    dietType: "Vegetarian",
    allergies: "Lactose",
    pgName: "Sunshine PG",
  },
  {
    id: 4,
    residentName: "Neha Gupta",
    roomNumber: "201",
    breakfast: "Oatmeal",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Paneer Butter Masala",
    dietType: "Vegetarian",
    allergies: "Gluten",
    pgName: "Sunshine PG",
  },
  {
    id: 5,
    residentName: "Vikram Singh",
    roomNumber: "104",
    breakfast: "Bread & Eggs",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Chicken Curry",
    dietType: "Non-Vegetarian",
    allergies: "None",
    pgName: "Sunshine PG",
  },
  {
    id: 6,
    residentName: "Ananya Reddy",
    roomNumber: "305",
    breakfast: "Poha & Tea",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Paneer Butter Masala",
    dietType: "Vegetarian",
    allergies: "None",
    pgName: "Sunshine PG",
  },
  {
    id: 7,
    residentName: "Karan Malhotra",
    roomNumber: "102",
    breakfast: "Bread & Eggs",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Chicken Curry",
    dietType: "Non-Vegetarian",
    allergies: "None",
    pgName: "Green Valley PG",
  },
  {
    id: 8,
    residentName: "Divya Patel",
    roomNumber: "204",
    breakfast: "Idli & Sambar",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Paneer Butter Masala",
    dietType: "Vegetarian",
    allergies: "None",
    pgName: "City Heights PG",
  },
]

// Sample weekly menu
const weeklyMenu = [
  {
    day: "Monday",
    breakfast: "Poha & Tea",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Paneer Butter Masala",
    pgName: "Sunshine PG",
  },
  {
    day: "Tuesday",
    breakfast: "Bread & Eggs",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Chicken Curry",
    pgName: "Sunshine PG",
  },
  {
    day: "Wednesday",
    breakfast: "Idli & Sambar",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Aloo Paratha",
    pgName: "Sunshine PG",
  },
  {
    day: "Thursday",
    breakfast: "Upma",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Chole Bhature",
    pgName: "Sunshine PG",
  },
  {
    day: "Friday",
    breakfast: "Bread & Eggs",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Fish Curry",
    pgName: "Sunshine PG",
  },
  {
    day: "Saturday",
    breakfast: "Dosa",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Biryani",
    pgName: "Sunshine PG",
  },
  {
    day: "Sunday",
    breakfast: "Puri Bhaji",
    lunch: "Rice, Dal & Vegetables",
    dinner: "Butter Chicken",
    pgName: "Sunshine PG",
  },
]

// Sample meal trend data
const mealTrendData = [
  {
    name: "Paneer Butter Masala",
    count: 35,
    type: "Vegetarian",
  },
  {
    name: "Chicken Curry",
    count: 28,
    type: "Non-Vegetarian",
  },
  {
    name: "Aloo Paratha",
    count: 22,
    type: "Vegetarian",
  },
  {
    name: "Biryani",
    count: 40,
    type: "Non-Vegetarian",
  },
  {
    name: "Chole Bhature",
    count: 18,
    type: "Vegetarian",
  },
]

// Sample diet preference data
const dietPreferenceData = [
  { name: "Vegetarian", value: 65 },
  { name: "Non-Vegetarian", value: 35 },
]

// Sample meal type distribution
const mealTypeDistribution = [
  { name: "Breakfast", vegetarian: 80, nonVegetarian: 20 },
  { name: "Lunch", vegetarian: 70, nonVegetarian: 30 },
  { name: "Dinner", vegetarian: 60, nonVegetarian: 40 },
]

export default function FoodSelectionPage() {
  const [selectedPg, setSelectedPg] = useState("Sunshine PG")
  const [activeTab, setActiveTab] = useState("preferences")
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [selectedMealType, setSelectedMealType] = useState("all")
  const [filters, setFilters] = useState({
    dietType: [],
    allergies: [],
  })
  const [viewMode, setViewMode] = useState("table")

  // Filter meal preferences based on selected PG and other filters
  const filteredPreferences = mealPreferences
    .filter((pref) => pref.pgName === selectedPg)
    .filter((pref) => {
      // Filter by diet type
      if (filters.dietType.length > 0 && !filters.dietType.includes(pref.dietType)) return false

      // Filter by allergies
      if (filters.allergies.length > 0) {
        if (pref.allergies === "None" && filters.allergies.includes("None")) return true
        if (pref.allergies !== "None" && filters.allergies.some((allergy) => pref.allergies.includes(allergy)))
          return true
        return false
      }

      // Filter by meal type
      if (selectedMealType !== "all") {
        // This would be more complex in a real app, but for demo purposes we'll just return true
        return true
      }

      return true
    })

  // Get filtered menu for selected PG
  const filteredMenu = weeklyMenu.filter((menu) => menu.pgName === selectedPg)

  // Count diet types
  const vegetarianCount = mealPreferences.filter(
    (pref) => pref.pgName === selectedPg && pref.dietType === "Vegetarian",
  ).length
  const nonVegetarianCount = mealPreferences.filter(
    (pref) => pref.pgName === selectedPg && pref.dietType === "Non-Vegetarian",
  ).length

  // Count allergies
  const allergiesCount = mealPreferences.filter(
    (pref) => pref.pgName === selectedPg && pref.allergies !== "None",
  ).length

  // Get unique allergies for filter
  const uniqueAllergies = [
    "None",
    ...new Set(
      mealPreferences
        .filter((pref) => pref.pgName === selectedPg && pref.allergies !== "None")
        .map((pref) => pref.allergies),
    ),
  ]

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
      dietType: [],
      allergies: [],
    })
  }

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Food Selection</h1>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">
                Manage meal preferences for <span className="font-medium text-foreground">{selectedPg}</span>
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
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share with Kitchen
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Residents</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredPreferences.length}</div>
            <p className="text-xs text-muted-foreground">
              {filteredPreferences.length} residents with meal preferences
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vegetarian</CardTitle>
            <Pizza className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vegetarianCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((vegetarianCount / filteredPreferences.length) * 100)}% of residents
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Non-Vegetarian</CardTitle>
            <Utensils className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nonVegetarianCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((nonVegetarianCount / filteredPreferences.length) * 100)}% of residents
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Special Diets</CardTitle>
            <Coffee className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allergiesCount}</div>
            <p className="text-xs text-muted-foreground">Residents with allergies or dietary restrictions</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="preferences" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="preferences">Resident Preferences</TabsTrigger>
            <TabsTrigger value="menu">Weekly Menu</TabsTrigger>
            <TabsTrigger value="trends">Meal Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle>Meal Preferences</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                          {(filters.dietType.length > 0 || filters.allergies.length > 0) && (
                            <Badge variant="secondary" className="ml-2 rounded-sm px-1">
                              {filters.dietType.length + filters.allergies.length}
                            </Badge>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Filter Preferences</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                          Diet Type
                        </DropdownMenuLabel>
                        <DropdownMenuCheckboxItem
                          checked={filters.dietType.includes("Vegetarian")}
                          onCheckedChange={() => toggleFilter("dietType", "Vegetarian")}
                        >
                          Vegetarian
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filters.dietType.includes("Non-Vegetarian")}
                          onCheckedChange={() => toggleFilter("dietType", "Non-Vegetarian")}
                        >
                          Non-Vegetarian
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                          Allergies
                        </DropdownMenuLabel>
                        {uniqueAllergies.map((allergy) => (
                          <DropdownMenuCheckboxItem
                            key={allergy}
                            checked={filters.allergies.includes(allergy)}
                            onCheckedChange={() => toggleFilter("allergies", allergy)}
                          >
                            {allergy}
                          </DropdownMenuCheckboxItem>
                        ))}
                        <DropdownMenuSeparator />
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={resetFilters}>
                          Reset Filters
                        </Button>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                      <SelectTrigger className="h-9 w-[150px]">
                        <SelectValue placeholder="Meal Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Meals</SelectItem>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                      </SelectContent>
                    </Select>
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
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resident</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Diet Type</TableHead>
                        <TableHead className="hidden md:table-cell">Breakfast</TableHead>
                        <TableHead className="hidden md:table-cell">Lunch</TableHead>
                        <TableHead className="hidden md:table-cell">Dinner</TableHead>
                        <TableHead>Allergies</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPreferences.length > 0 ? (
                        filteredPreferences.map((pref) => (
                          <TableRow key={pref.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                  <AvatarFallback>
                                    {pref.residentName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{pref.residentName}</div>
                              </div>
                            </TableCell>
                            <TableCell>Room {pref.roomNumber}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  pref.dietType === "Vegetarian"
                                    ? "bg-green-50 text-green-700"
                                    : "bg-red-50 text-red-700"
                                }
                              >
                                {pref.dietType}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{pref.breakfast}</TableCell>
                            <TableCell className="hidden md:table-cell">{pref.lunch}</TableCell>
                            <TableCell className="hidden md:table-cell">{pref.dinner}</TableCell>
                            <TableCell>
                              {pref.allergies === "None" ? (
                                <span className="text-muted-foreground">None</span>
                              ) : (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700">
                                  {pref.allergies}
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No meal preferences found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredPreferences.length} of{" "}
                  {mealPreferences.filter((pref) => pref.pgName === selectedPg).length} residents
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
          </TabsContent>

          <TabsContent value="menu">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Weekly Menu</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="text-sm font-medium">Week of May 1 - May 7, 2024</div>
                      <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>Current menu for {selectedPg}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Tabs
                      defaultValue={selectedDay}
                      value={selectedDay}
                      onValueChange={setSelectedDay}
                      className="w-full"
                    >
                      <TabsList className="mb-4 grid w-full grid-cols-7">
                        {filteredMenu.map((menu) => (
                          <TabsTrigger key={menu.day} value={menu.day}>
                            {menu.day.substring(0, 3)}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {filteredMenu.map((menu) => (
                        <TabsContent key={menu.day} value={menu.day}>
                          <div className="space-y-6">
                            <div className="rounded-lg border p-4">
                              <div className="mb-2 flex items-center gap-2">
                                <Coffee className="h-5 w-5 text-amber-500" />
                                <h3 className="font-medium">Breakfast</h3>
                              </div>
                              <p>{menu.breakfast}</p>
                              <div className="mt-2 text-xs text-muted-foreground">Serving Time: 7:30 AM - 9:30 AM</div>
                            </div>
                            <div className="rounded-lg border p-4">
                              <div className="mb-2 flex items-center gap-2">
                                <Utensils className="h-5 w-5 text-blue-500" />
                                <h3 className="font-medium">Lunch</h3>
                              </div>
                              <p>{menu.lunch}</p>
                              <div className="mt-2 text-xs text-muted-foreground">Serving Time: 12:30 PM - 2:30 PM</div>
                            </div>
                            <div className="rounded-lg border p-4">
                              <div className="mb-2 flex items-center gap-2">
                                <Pizza className="h-5 w-5 text-red-500" />
                                <h3 className="font-medium">Dinner</h3>
                              </div>
                              <p>{menu.dinner}</p>
                              <div className="mt-2 text-xs text-muted-foreground">Serving Time: 8:00 PM - 10:00 PM</div>
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Monthly Menu
                  </Button>
                  <Button>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share with Residents
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Meal Selection Stats</CardTitle>
                  <CardDescription>Today's meal selection statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Breakfast: Poha & Tea</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span>Selected by</span>
                      <span className="font-medium">4 residents</span>
                    </div>
                    <Progress value={67} className="mt-2 h-2" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Lunch: Rice, Dal & Vegetables</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span>Selected by</span>
                      <span className="font-medium">6 residents</span>
                    </div>
                    <Progress value={100} className="mt-2 h-2" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Dinner: Paneer Butter Masala</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span>Selected by</span>
                      <span className="font-medium">4 residents</span>
                    </div>
                    <Progress value={67} className="mt-2 h-2" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Dinner: Chicken Curry</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span>Selected by</span>
                      <span className="font-medium">2 residents</span>
                    </div>
                    <Progress value={33} className="mt-2 h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Dishes</CardTitle>
                  <CardDescription>Most selected dishes in the last month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mealTrendData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Selection Count" fill="#0088FE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Diet Preferences</CardTitle>
                  <CardDescription>Distribution of diet preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dietPreferenceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {dietPreferenceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Meal Type Distribution</CardTitle>
                  <CardDescription>Vegetarian vs Non-Vegetarian by meal type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mealTypeDistribution}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="vegetarian" name="Vegetarian" stackId="a" fill="#00C49F" />
                        <Bar dataKey="nonVegetarian" name="Non-Vegetarian" stackId="a" fill="#FF8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Special Dietary Requirements</CardTitle>
                  <CardDescription>Residents with allergies or special dietary needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mealPreferences
                      .filter((pref) => pref.pgName === selectedPg && pref.allergies !== "None")
                      .map((pref) => (
                        <div key={pref.id} className="flex items-start gap-4 rounded-lg border p-3">
                          <Avatar className="mt-0.5">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback>
                              {pref.residentName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{pref.residentName}</h4>
                              <Badge variant="outline" className="bg-amber-50 text-amber-700">
                                {pref.allergies}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Room {pref.roomNumber} • {pref.dietType}
                            </p>
                          </div>
                        </div>
                      ))}
                    {mealPreferences.filter((pref) => pref.pgName === selectedPg && pref.allergies !== "None")
                      .length === 0 && (
                      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <Coffee className="mb-2 h-10 w-10 text-muted-foreground" />
                        <h3 className="mb-1 text-lg font-medium">No special dietary requirements</h3>
                        <p className="text-sm text-muted-foreground">
                          None of the residents have reported allergies or special dietary needs.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
