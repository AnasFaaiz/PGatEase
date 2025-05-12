import React from "react"
import { OwnerSidebar } from "@/components/owner/sidebar"

export default function OwnerLayout({ children }) {
  return <OwnerSidebar>{children}</OwnerSidebar>
}