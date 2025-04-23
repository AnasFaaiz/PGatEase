"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  AlertCircle,
  Bell,
  CreditCard,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Shirt,
  User,
  Utensils,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"

const navigation = [
  { name: "Dashboard", href: "/resident/dashboard", icon: Home },
  { name: "Meals", href: "/resident/meals", icon: Utensils },
  { name: "Laundry", href: "/resident/laundry", icon: Shirt },
  { name: "Payments", href: "/resident/payments", icon: CreditCard },
  { name: "Complaints", href: "/resident/complaints", icon: MessageSquare },
  { name: "Emergency", href: "/resident/emergency", icon: AlertCircle },
  { name: "Notifications", href: "/resident/notifications", icon: Bell },
]

const secondaryNavigation = [
  { name: "Profile", href: "/resident/profile", icon: User },
  { name: "Settings", href: "/resident/settings", icon: Settings },
]

export function ResidentSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isMobile = useMobile()

  // Close the mobile menu when navigating or when screen size changes
  useEffect(() => {
    setOpen(false)
  }, [pathname, isMobile])

  return (
    <>
      {isMobile && (
        <div className="sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 border-r pr-0 sm:max-w-xs lg:hidden">
              <div className="flex h-16 shrink-0 items-center border-b px-6">
                <Link href="/resident/dashboard" className="flex items-center gap-2">
                  <span className="font-semibold">PGatEase</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-y-1 px-2 py-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  )
                })}

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t" />
                  </div>
                </div>

                {secondaryNavigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  )
                })}

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t" />
                  </div>
                </div>

                <Button variant="ghost" className="justify-start px-3 text-sm font-medium text-muted-foreground">
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex flex-1 items-center justify-between">
            <Link href="/resident/dashboard" className="flex items-center gap-2">
              <span className="font-semibold">PGatEase</span>
            </Link>
            <div className="flex items-center gap-x-4">
              <Link href="/resident/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
              </Link>
              <Link href="/resident/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/resident/dashboard" className="flex items-center gap-2">
              <span className="font-semibold">PGatEase</span>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col gap-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t" />
              </div>
            </div>

            {secondaryNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t" />
              </div>
            </div>

            <Button variant="ghost" className="justify-start px-3 text-sm font-medium text-muted-foreground">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </nav>
        </div>
      </div>
    </>
  )
}
