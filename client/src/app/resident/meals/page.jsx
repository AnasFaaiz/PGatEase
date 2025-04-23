"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit,
  Leaf,
  Star,
  ThumbsDown,
  ThumbsUp,
  Utensils,
  X,
} from "lucide-react"
import { format, addDays, startOfWeek, isSameDay } from "date-fns"
import { toast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Sample meal data
const weeklyMenu = [
  {
    day: "Monday",
    date: startOfWeek(new Date(), { weekStartsOn: 1 }),
    meals: [
      {
        type: "Breakfast",
        time: "7:30 AM - 9:30 AM",
        options: [
          { id: "monday-breakfast-1", name: "Poha & Tea", type: "Vegetarian" },
          { id: "monday-breakfast-2", name: "Bread & Eggs", type: "Non-Vegetarian" },
        ],
        selected: "monday-breakfast-1",
        status: "confirmed",
        cutoffTime: "Previous day 9:00 PM",
      },
      {
        type: "Lunch",
        time: "12:30 PM - 2:30 PM",
        options: [
          { id: "monday-lunch-1", name: "Rice, Dal & Vegetables", type: "Vegetarian" },
          { id: "monday-lunch-2", name: "Rice, Dal & Chicken Curry", type: "Non-Vegetarian" },
        ],
        selected: "monday-lunch-1",
        status: "confirmed",
        cutoffTime: "Same day 10:00 AM",
      },
      {
        type: "Dinner",
        time: "8:00 PM - 10:00 PM",
        options: [
          { id: "monday-dinner-1", name: "Paneer Butter Masala & Roti", type: "Vegetarian" },
          { id: "monday-dinner-2", name: "Chicken Curry & Roti", type: "Non-Vegetarian" },
        ],
        selected: "monday-dinner-1",
        status: "confirmed",
        cutoffTime: "Same day 6:00 PM",
      },
    ],
  },
  {
    day: "Tuesday",
    date: addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 1),
    meals: [
      {
        type: "Breakfast",
        time: "7:30 AM - 9:30 AM",
        options: [
          { id: "tuesday-breakfast-1", name: "Idli & Sambar", type: "Vegetarian" },
          { id: "tuesday-breakfast-2", name: "Bread & Eggs", type: "Non-Vegetarian" },
        ],
        selected: "tuesday-breakfast-1",
        status: "confirmed",
        cutoffTime: "Previous day 9:00 PM",
      },
      {
        type: "Lunch",
        time: "12:30 PM - 2:30 PM",
        options: [
          { id: "tuesday-lunch-1", name: "Rice, Dal & Vegetables", type: "Vegetarian" },
          { id: "tuesday-lunch-2", name: "Rice, Dal & Fish Curry", type: "Non-Vegetarian" },
        ],
        selected: "tuesday-lunch-1",
        status: "confirmed",
        cutoffTime: "Same day 10:00 AM",
      },
      {
        type: "Dinner",
        time: "8:00 PM - 10:00 PM",
        options: [
          { id: "tuesday-dinner-1", name: "Aloo Paratha & Curd", type: "Vegetarian" },
          { id: "tuesday-dinner-2", name: "Egg Curry & Roti", type: "Non-Vegetarian" },
        ],
        selected: "tuesday-dinner-1",
        status: "pending",
        cutoffTime: "Same day 6:00 PM",
      },
    ],
  },
  {
    day: "Wednesday",
    date: addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 2),
    meals: [
      {
        type: "Breakfast",
        time: "7:30 AM - 9:30 AM",
        options: [
          { id: "wednesday-breakfast-1", name: "Upma & Tea", type: "Vegetarian" },
          { id: "wednesday-breakfast-2", name: "Bread & Eggs", type: "Non-Vegetarian" },
        ],
        selected: "wednesday-breakfast-1",
        status: "pending",
        cutoffTime: "Previous day 9:00 PM",
      },
      {
        type: "Lunch",
        time: "12:30 PM - 2:30 PM",
        options: [
          { id: "wednesday-lunch-1", name: "Rice, Dal & Vegetables", type: "Vegetarian" },
          { id: "wednesday-lunch-2", name: "Rice, Dal & Chicken Curry", type: "Non-Vegetarian" },
        ],
        selected: "wednesday-lunch-1",
        status: "pending",
        cutoffTime: "Same day 10:00 AM",
      },
      {
        type: "Dinner",
        time: "8:00 PM - 10:00 PM",
        options: [
          { id: "wednesday-dinner-1", name: "Chole Bhature", type: "Vegetarian" },
          { id: "wednesday-dinner-2", name: "Butter Chicken & Naan", type: "Non-Vegetarian" },
        ],
        selected: null,
        status: "pending",
        cutoffTime: "Same day 6:00 PM",
      },
    ],
  },
  {
    day: "Thursday",
    date: addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 3),
    meals: [
      {
        type: "Breakfast",
        time: "7:30 AM - 9:30 AM",
        options: [
          { id: "thursday-breakfast-1", name: "Dosa & Sambar", type: "Vegetarian" },
          { id: "thursday-breakfast-2", name: "Bread & Eggs", type: "Non-Vegetarian" },
        ],
        selected: null,
        status: "pending",
        cutoffTime: "Previous day 9:00 PM",
      },
      {
        type: "Lunch",
        time: "12:30 PM - 2:30 PM",
        options: [
          { id: "thursday-lunch-1", name: "Rice, Dal & Vegetables", type: "Vegetarian" },
          { id: "thursday-lunch-2", name: "Rice, Dal & Fish Curry", type: "Non-Vegetarian" },
        ],
        selected: null,
        status: "pending",
        cutoffTime: "Same day 10:00 AM",
      },
      {
        type: "Dinner",
        time: "8:00 PM - 10:00 PM",
        options: [
          { id: "thursday-dinner-1", name: "Rajma Chawal", type: "Vegetarian" },
          { id: "thursday-dinner-2", name: "Chicken Biryani", type: "Non-Vegetarian" },
        ],
        selected: null,
        status: "pending",
        cutoffTime: "Same day 6:00 PM",
      },
    ],
  },
  {
    day: "Friday",
    date: addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 4),
    meals: [
      {
        type: "Breakfast",
        time: "7:30 AM - 9:30 AM",
        options: [
          { id: "friday-breakfast-1", name: "Puri Bhaji", type: "Vegetarian" },
          { id: "friday-breakfast-2", name: "Bread & Eggs", type: "Non-Vegetarian" },
        ],
        selected: null,
        status: "pending",
        cutoffTime: "Previous day 9:00 PM",
      },
      {
        type: "Lunch",
        time: "12:30 PM - 2:30 PM",
        options: [
          { id: "friday-lunch-1", name: "Rice, Dal & Vegetables", type: "Vegetarian" },
          { id: "friday-lunch-2", name: "Rice, Dal & Chicken Curry", type: "Non-Vegetarian" },
        ],
        selected: null,
        status: "pending",
        cutoffTime: "Same day 10:00 AM",
      },
      {
        type: "Dinner",
        time: "8:00 PM - 10:00 PM",
        options: [
          { id: "friday-dinner-1", name: "Paneer Tikka Masala & Roti", type: "Vegetarian" },
          { id: "friday-dinner-2", name: "Mutton Curry & Roti", type: "Non-Vegetarian" },
        ],
        selected: null,
        status: "pending",
        cutoffTime: "Same day 6:00 PM",
      },
    ],
  },
  {
    day: "Saturday",
    date: addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 5),
    meals: [
      {
        type: "Breakfast",
        time: "7:30 AM - 9:30 AM",
        options: [
          { id: "saturday-breakfast-1", name: "Aloo Paratha & Curd", type: "Vegetarian" },
          { id: "saturday-breakfast-2", name: "Bread & Eggs", type: "Non-Vegetarian" },
        ],
        selected: null,
        status: "pending",
        cutoffTime: "Previous day 9:00 PM",
      },
      {
        type: "Lunch",
        time: "12:30 PM - 2:30 PM",
        options: [
          { id: "saturday-lunch-1", name: "Rice, Dal & Vegetables", type: "Vegetarian" },
          { id: "saturday-lunch-2", name: "Rice, Dal & Fish Curry", type: "Non-Vegetarian" },
        ],
        selected: null,
        status: "pending",
        cutoffTime: "Same day 10:00 AM",
      },
      {
        type: "Dinner",
        time: "8:00 PM - 10:00 PM",
        options: [
          { id: "saturday-dinner-1", name: "Veg Biryani", type: "Vegetarian" },
          { id: "saturday-dinner-2", name: "Chicken Biryani", type: "Non-Vegetarian" },
        ],
        selected: null,
        status: "pending",
        cutoffTime: "Same day 6:00 PM",
      },
    ],
  },
  {
    day: "Sunday",
    date: addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 6),
    meals: [
      {
        type: "Breakfast",
        time: "7:30 AM - 9:30 AM",
        options: [
          { id: "sunday-breakfast-1", name: "Chole Bhature", type: "Vegetarian" },
          { id: "sunday-breakfast-2", name: "Bread & Eggs", type: "Non-Vegetarian" },
        ],
        selected: null,
        status: "pending",
        cutoffTime: "Previous day 9:00 PM",
      },
      {
        type: "Lunch",
        time: "12:30 PM - 2:30 PM",
        options: [
          { id: "sunday-lunch-1", name: "Rice, Dal & Vegetables", type: "Vegetarian" },
          { id: "sunday-lunch-2", name: "Rice, Dal & Chicken Curry", type: "Non-Vegetarian" },
        ],
        selected: null,
        status: "pending",
        cutoffTime: "Same day 10:00 AM",
      },
      {
        type: "Dinner",
        time: "8:00 PM - 10:00 PM",
        options: [
          { id: "sunday-dinner-1", name: "Paneer Butter Masala & Roti", type: "Vegetarian" },
          { id: "sunday-dinner-2", name: "Butter Chicken & Naan", type: "Non-Vegetarian" },
        ],
        selected: null,
        status: "pending",
        cutoffTime: "Same day 6:00 PM",
      },
    ],
  },
]

// Meal preferences
const mealPreferences = {
  defaultDietType: "Vegetarian", // Vegetarian or Non-Vegetarian
  jainFood: false,
  allergies: ["Peanuts"],
  spiceLevel: "Medium", // Mild, Medium, Spicy
}

export default function MealsPage() {
  const [selectedDay, setSelectedDay] = useState(weeklyMenu[0].day)
  const [selectedMealType, setSelectedMealType] = useState("all")
  const [menu, setMenu] = useState(weeklyMenu)
  const [preferences, setPreferences] = useState(mealPreferences)
  const [feedbackMeal, setFeedbackMeal] = useState(null)
  const [isPreferencesDialogOpen, setIsPreferencesDialogOpen] = useState(false)

  const today = new Date()
  const currentDayData = menu.find((day) => day.day === selectedDay)

  // Filter meals based on selected meal type
  const filteredMeals = currentDayData
    ? selectedMealType === "all"
      ? currentDayData.meals
      : currentDayData.meals.filter((meal) => meal.type === selectedMealType)
    : []

  // Handle meal selection
  const handleMealSelection = (dayIndex, mealIndex, optionId) => {
    const updatedMenu = [...menu]
    updatedMenu[dayIndex].meals[mealIndex].selected = optionId
    updatedMenu[dayIndex].meals[mealIndex].status = "pending"
    setMenu(updatedMenu)

    toast({
      title: "Meal preference updated",
      description: "Your meal preference has been updated. Don't forget to confirm before the cutoff time.",
    })
  }

  // Handle meal confirmation
  const handleMealConfirmation = (dayIndex, mealIndex) => {
    const updatedMenu = [...menu]
    updatedMenu[dayIndex].meals[mealIndex].status = "confirmed"
    setMenu(updatedMenu)

    toast({
      title: "Meal confirmed",
      description: "Your meal selection has been confirmed.",
    })
  }

  // Handle meal skipping
  const handleMealSkipping = (dayIndex, mealIndex) => {
    const updatedMenu = [...menu]
    updatedMenu[dayIndex].meals[mealIndex].selected = null
    updatedMenu[dayIndex].meals[mealIndex].status = "skipped"
    setMenu(updatedMenu)

    toast({
      title: "Meal skipped",
      description: "You have chosen to skip this meal.",
    })
  }

  // Handle meal feedback submission
  const handleFeedbackSubmission = (rating, comment) => {
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    })
    setFeedbackMeal(null)
  }

  // Handle preference update
  const handlePreferenceUpdate = (newPreferences) => {
    setPreferences(newPreferences)
    setIsPreferencesDialogOpen(false)

    toast({
      title: "Preferences updated",
      description: "Your meal preferences have been updated.",
    })
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Pending
          </Badge>
        )
      case "skipped":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            Skipped
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700">
            Not Selected
          </Badge>
        )
    }
  }

  // Check if a day is today
  const isToday = (date) => {
    return isSameDay(date, today)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Meals</h1>
            <p className="text-muted-foreground">View and customize your meal preferences</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isPreferencesDialogOpen} onOpenChange={setIsPreferencesDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Leaf className="mr-2 h-4 w-4" />
                  Meal Preferences
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Meal Preferences</DialogTitle>
                  <DialogDescription>Set your default meal preferences here.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="diet-type">Default Diet Type</Label>
                    <RadioGroup
                      id="diet-type"
                      defaultValue={preferences.defaultDietType}
                      onValueChange={(value) =>
                        setPreferences({
                          ...preferences,
                          defaultDietType: value,
                        })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Vegetarian" id="vegetarian" />
                        <Label htmlFor="vegetarian">Vegetarian</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Non-Vegetarian" id="non-vegetarian" />
                        <Label htmlFor="non-vegetarian">Non-Vegetarian</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="jain-food">Jain Food</Label>
                      <Switch
                        id="jain-food"
                        checked={preferences.jainFood}
                        onCheckedChange={(checked) =>
                          setPreferences({
                            ...preferences,
                            jainFood: checked,
                          })
                        }
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Jain food excludes root vegetables and certain other ingredients.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="spice-level">Spice Level</Label>
                    <RadioGroup
                      id="spice-level"
                      defaultValue={preferences.spiceLevel}
                      onValueChange={(value) =>
                        setPreferences({
                          ...preferences,
                          spiceLevel: value,
                        })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Mild" id="mild" />
                        <Label htmlFor="mild">Mild</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Spicy" id="spicy" />
                        <Label htmlFor="spicy">Spicy</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      placeholder="Enter any food allergies or restrictions"
                      value={preferences.allergies.join(", ")}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          allergies: e.target.value.split(",").map((item) => item.trim()),
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsPreferencesDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handlePreferenceUpdate(preferences)}>Save Preferences</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Weekly Menu</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">May 1 - May 7, 2024</div>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>Select your meals for the week</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={selectedDay} value={selectedDay} onValueChange={setSelectedDay}>
              <TabsList className="mb-4 grid w-full grid-cols-7">
                {menu.map((day) => (
                  <TabsTrigger
                    key={day.day}
                    value={day.day}
                    className={cn(isToday(day.date) && "bg-blue-50 dark:bg-blue-900")}
                  >
                    <div className="flex flex-col items-center">
                      <span>{day.day.substring(0, 3)}</span>
                      {isToday(day.date) && <span className="text-xs text-blue-600">Today</span>}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                    <SelectTrigger className="h-8 w-[150px]">
                      <SelectValue placeholder="Meal Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Meals</SelectItem>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentDayData ? format(currentDayData.date, "MMMM d, yyyy") : ""}
                </div>
              </div>

              {filteredMeals.map((meal, mealIndex) => {
                const dayIndex = menu.findIndex((day) => day.day === selectedDay)
                const isPastCutoff = false // In a real app, this would be calculated based on current time and cutoff time
                const isEditable = meal.status !== "confirmed" && !isPastCutoff

                return (
                  <div key={`${selectedDay}-${meal.type}`} className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-blue-500" />
                        <h3 className="font-medium">{meal.type}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{meal.time}</span>
                      </div>
                    </div>

                    <Card>
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(meal.status)}
                            {meal.status === "confirmed" && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2"
                                      onClick={() => setFeedbackMeal(meal)}
                                    >
                                      <Star className="mr-1 h-3 w-3" />
                                      <span className="text-xs">Feedback</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Provide feedback for this meal</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Cutoff: {meal.cutoffTime}
                            {isPastCutoff && (
                              <Badge variant="outline" className="ml-2 bg-red-50 text-red-700">
                                Past Cutoff
                              </Badge>
                            )}
                          </div>
                        </div>

                        <RadioGroup
                          value={meal.selected}
                          onValueChange={(value) => handleMealSelection(dayIndex, mealIndex, value)}
                          className="space-y-3"
                          disabled={!isEditable}
                        >
                          {meal.options.map((option) => (
                            <div
                              key={option.id}
                              className={cn(
                                "flex items-center justify-between rounded-lg border p-3",
                                meal.selected === option.id && "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value={option.id} id={option.id} />
                                <div>
                                  <Label htmlFor={option.id} className="font-medium">
                                    {option.name}
                                  </Label>
                                  <p className="text-sm text-muted-foreground">{option.type}</p>
                                </div>
                              </div>
                              {option.type === preferences.defaultDietType && (
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                  Preferred
                                </Badge>
                              )}
                            </div>
                          ))}
                        </RadioGroup>

                        {meal.status === "pending" && meal.selected && (
                          <div className="mt-4 flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMealSkipping(dayIndex, mealIndex)}
                              disabled={!isEditable}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Skip Meal
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleMealConfirmation(dayIndex, mealIndex)}
                              disabled={!isEditable}
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Confirm Selection
                            </Button>
                          </div>
                        )}

                        {meal.status !== "pending" && meal.status !== "confirmed" && (
                          <div className="mt-4 flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updatedMenu = [...menu]
                                updatedMenu[dayIndex].meals[mealIndex].status = "pending"
                                setMenu(updatedMenu)
                              }}
                              disabled={!isEditable}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Selection
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )
              })}

              {filteredMeals.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <Utensils className="mb-2 h-10 w-10 text-muted-foreground" />
                  <h3 className="mb-1 text-lg font-medium">No meals found</h3>
                  <p className="text-sm text-muted-foreground">
                    There are no meals available for the selected filters.
                  </p>
                </div>
              )}
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Meal Preferences</CardTitle>
              <CardDescription>Your default meal settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Default Diet Type</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {preferences.defaultDietType}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Jain Food</span>
                  <Badge variant="outline" className={preferences.jainFood ? "bg-green-50 text-green-700" : ""}>
                    {preferences.jainFood ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Spice Level</span>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">
                    {preferences.spiceLevel}
                  </Badge>
                </div>
                <Separator />
                <div>
                  <span className="text-sm font-medium">Allergies</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {preferences.allergies.length > 0 ? (
                      preferences.allergies.map((allergy) => (
                        <Badge key={allergy} variant="outline" className="bg-red-50 text-red-700">
                          {allergy}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">No allergies specified</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setIsPreferencesDialogOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Preferences
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meal Summary</CardTitle>
              <CardDescription>Your meal selections for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Confirmed Meals</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {menu.reduce(
                      (count, day) => count + day.meals.filter((meal) => meal.status === "confirmed").length,
                      0,
                    )}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pending Selections</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {menu.reduce(
                      (count, day) => count + day.meals.filter((meal) => meal.status === "pending").length,
                      0,
                    )}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Skipped Meals</span>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">
                    {menu.reduce(
                      (count, day) => count + day.meals.filter((meal) => meal.status === "skipped").length,
                      0,
                    )}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Not Selected</span>
                  <Badge variant="outline">
                    {menu.reduce(
                      (count, day) =>
                        count + day.meals.filter((meal) => meal.selected === null && meal.status !== "skipped").length,
                      0,
                    )}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Reminder</p>
                    <p>Please confirm your meal selections before the cutoff time to ensure availability.</p>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Meal Feedback Dialog */}
      <Dialog open={!!feedbackMeal} onOpenChange={(open) => !open && setFeedbackMeal(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Meal Feedback</DialogTitle>
            <DialogDescription>
              {feedbackMeal ? `Share your feedback for ${feedbackMeal.type} on ${selectedDay}` : "Share your feedback"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>How was your meal?</Label>
              <div className="flex justify-center gap-4">
                <Button variant="outline" className="flex flex-col items-center gap-1 p-4">
                  <ThumbsUp className="h-6 w-6 text-green-500" />
                  <span>Good</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-1 p-4">
                  <ThumbsDown className="h-6 w-6 text-red-500" />
                  <span>Needs Improvement</span>
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="feedback">Additional Comments</Label>
              <Textarea id="feedback" placeholder="Share your thoughts about the meal..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeedbackMeal(null)}>
              Cancel
            </Button>
            <Button onClick={() => handleFeedbackSubmission("Good", "")}>Submit Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
