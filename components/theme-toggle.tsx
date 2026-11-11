"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  // Which icon shows is decided in CSS from the .dark class on <html>,
  // so the button looks right before React has loaded.
  return (
    <button
      type="button"
      className="icon-btn theme-toggle"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Sun className="icon-sun" />
      <Moon className="icon-moon" />
    </button>
  )
}
