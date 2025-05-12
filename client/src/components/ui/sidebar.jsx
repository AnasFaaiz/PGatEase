import * as React from "react"
import { cn } from "@/lib/utils"

const SidebarContext = React.createContext({})

const SidebarProvider = ({ children }) => {
  return <SidebarContext.Provider value={{}}>{children}</SidebarContext.Provider>
}
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <aside
      ref={ref}
      className={cn(
        "flex flex-col w-64 h-screen",
        {
          "border-r": variant === "inset",
        },
        className
      )}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex-1 overflow-auto", className)} {...props} />
})
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("mt-auto", className)} {...props} />
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("", className)} {...props} />
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => {
  return <nav ref={ref} className={cn("", className)} {...props} />
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuButton = React.forwardRef(({ className, isActive, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors",
        isActive ? "bg-secondary" : "hover:bg-secondary/50",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("", className)} {...props} />
})
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-4", className)} {...props} />
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-1", className)} {...props} />
})
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarRail = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("absolute top-0 left-0 h-full w-1 transition-all", className)}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarRail,
  SidebarProvider,
}