"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Building, User, Menu, Moon, Sun, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth"

const DesktopNavLinks = ({ role, isLoggedIn }) => {
  const pathname = usePathname()

  if (!isLoggedIn) {
    return (
      <>
        <Link
          href="/"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Home
        </Link>
        <Link
          href="#features"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Features
        </Link>
      </>
    )
  }

  if (role === "owner") {
    return (
      <>
        <Link
          href="/owner/dashboard"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/owner/dashboard" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/owner/residents"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/owner/residents" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Residents
        </Link>
        <Link
          href="/owner/visitors"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/owner/visitors" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Visitors
        </Link>
        <Link
          href="/owner/attendance"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/owner/attendance" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Attendance
        </Link>
        <Link
          href="/owner/complaints"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/owner/complaints" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Complaints
        </Link>
        <Link
          href="/owner/payments"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/owner/payments" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Payments
        </Link>
      </>
    )
  }

  if (role === "resident") {
    return (
      <>
        <Link
          href="/resident/dashboard"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/resident/dashboard" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/resident/attendance"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/resident/attendance" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Attendance
        </Link>
        <Link
          href="/resident/complaints"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/resident/complaints" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Complaints
        </Link>
        <Link
          href="/resident/payments"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/resident/payments" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Payments
        </Link>
      </>
    )
  }

  return null
}

const MobileNavLinks = ({ role, isLoggedIn }) => {
  const pathname = usePathname()

  if (!isLoggedIn) {
    return (
      <>
        <Link
          href="/"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary py-2",
            pathname === "/" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Home
        </Link>
        <Link
          href="#features"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary py-2"
        >
          Features
        </Link>
      </>
    )
  }

  if (role === "owner") {
    return (
      <>
        <Link
          href="/owner/dashboard"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary py-2",
            pathname === "/owner/dashboard" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/owner/residents"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary py-2",
            pathname === "/owner/residents" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Residents
        </Link>
        <Link
          href="/owner/visitors"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary py-2",
            pathname === "/owner/visitors" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Visitors
        </Link>
        <Link
          href="/owner/attendance"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary py-2",
            pathname === "/owner/attendance" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Attendance
        </Link>
        <Link
          href="/owner/complaints"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary py-2",
            pathname === "/owner/complaints" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Complaints
        </Link>
        <Link
          href="/owner/payments"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary py-2",
            pathname === "/owner/payments" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Payments
        </Link>
      </>
    )
  }

  if (role === "resident") {
    return (
      <>
        <Link
          href="/resident/dashboard"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary py-2",
            pathname === "/resident/dashboard" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/resident/attendance"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary py-2",
            pathname === "/resident/attendance" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Attendance
        </Link>
        <Link
          href="/resident/complaints"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary py-2",
            pathname === "/resident/complaints" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Complaints
        </Link>
        <Link
          href="/resident/payments"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary py-2",
            pathname === "/resident/payments" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Payments
        </Link>
      </>
    )
  }

  return null
}

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme()
  const pathname = usePathname()

  let user = null
  let role = undefined
  let signOut = () => {}

  try {
    const auth = useAuth()
    user = auth.user
    role = auth.role
    signOut = auth.signOut
  } catch (error) {
    console.error("Auth context not available:", error)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isLoggedIn = !!user

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="lg:hidden">
              <div className="flex flex-col gap-4 mt-8">
                <MobileNavLinks role={role} isLoggedIn={isLoggedIn} />
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            <span className="font-bold hidden md:inline-block">PG Management</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 ml-10">
            <DesktopNavLinks role={role} isLoggedIn={isLoggedIn} />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="text-red-500">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar