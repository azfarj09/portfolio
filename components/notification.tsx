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
    <div className="toast" role="status">
      {message}
    </div>
  )
}
