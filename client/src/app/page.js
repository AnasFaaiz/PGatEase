import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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
                className="h-6 w-6"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">PGatEase</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-12">
        <section className="mb-20 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Simplify PG Management in Hyderabad
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            A comprehensive platform for PG owners and residents to manage properties, payments, meals, and more.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/auth/login?role=owner">
              <Button size="lg" className="w-full sm:w-auto">
                PG Owner Login
              </Button>
            </Link>
            <Link href="/auth/login?role=resident">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Resident Login
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>PG Management</CardTitle>
              <CardDescription>Manage multiple PG properties efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Track occupancy, manage residents, and monitor payments across all your properties from a single dashboard.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Resident Experience</CardTitle>
              <CardDescription>Enhance comfort and convenience</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Customize meals, request laundry services, make payments, and communicate issues seamlessly.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Real-time Updates</CardTitle>
              <CardDescription>Stay informed with instant notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Receive alerts for emergencies, payment reminders, and important announcements in real-time.</p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/40">
        <div className="container mx-auto py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} PGatEase. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:underline">Terms</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">Privacy</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}