"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("resident")

  useEffect(() => {
    const role = searchParams.get("role")
    if (role === "owner" || role === "resident") {
      setActiveTab(role)
    }
  }, [searchParams])

  const handleLogin = (role) => {
    // In a real app, you would authenticate the user here
    if (role === "owner") {
      router.push("/owner/dashboard")
    } else {
      router.push("/resident/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <Link href="/" className="mx-auto mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-blue-600 p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-xl font-bold">PGatEase</span>
          </Link>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Login to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="resident">Resident</TabsTrigger>
              <TabsTrigger value="owner">PG Owner</TabsTrigger>
            </TabsList>
            <TabsContent value="resident" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="resident-email">Email</Label>
                <Input id="resident-email" placeholder="name@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="resident-password">Password</Label>
                  <Link href="#" className="text-xs text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="resident-password" type="password" />
              </div>
              <Button className="w-full" onClick={() => handleLogin("resident")}>
                Login as Resident
              </Button>
            </TabsContent>
            <TabsContent value="owner" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="owner-email">Email</Label>
                <Input id="owner-email" placeholder="name@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="owner-password">Password</Label>
                  <Link href="#" className="text-xs text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="owner-password" type="password" />
              </div>
              <Button className="w-full" onClick={() => handleLogin("owner")}>
                Login as PG Owner
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            {activeTab === "owner" ? (
              <Link href="/auth/registration/owner" className="text-blue-600 hover:underline">
                Sign up as PG Owner
              </Link>
            ) : (
              <Link href="/auth/registration/resident" className="text-blue-600 hover:underline">
                Sign up as Resident
              </Link>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}