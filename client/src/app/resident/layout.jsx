"use client"

import { ResidentSidebar } from "@/components/resident/sidebar"

export default function ResidentLayout({ children }) {
  return (
    <div className="min-h-screen">
      <ResidentSidebar />
      <div className="lg:pl-72">
        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}