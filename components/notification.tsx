"use client"

import { useEffect } from "react"

interface NotificationProps {
  message: string
  isVisible: boolean
  onHide: () => void
}

export function Notification({ message, isVisible, onHide }: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide()
      }, 3000) // Hide after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [isVisible, onHide])

  if (!isVisible) return null

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[60] animate-slide-down-bounce">
      <div className="bg-primary/90 backdrop-blur-md text-primary-foreground px-6 py-3 rounded-lg shadow-lg border border-primary/20">
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  )
}