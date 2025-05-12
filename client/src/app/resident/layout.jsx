import React from "react"
import { ResidentSidebar } from "@/components/resident/sidebar"

export default function ResidentLayout({ children }) {
  return <ResidentSidebar>{children}</ResidentSidebar>
}