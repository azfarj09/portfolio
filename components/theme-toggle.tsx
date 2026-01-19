"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9"
                aria-label="Toggle theme"
            >
                <div className="w-5 h-5" />
            </Button>
        )
    }

    const isDark = resolvedTheme === "dark"

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-9 h-9 hover:bg-accent/50 hover:scale-110 active:scale-95 transition-all duration-300 overflow-hidden"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {/* Sun icon - visible in dark mode, click to switch to light */}
            <Sun
                className={`h-5 w-5 absolute transition-all duration-500 ease-in-out ${isDark
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-90 scale-0 opacity-0"
                    }`}
            />
            {/* Moon icon - visible in light mode, click to switch to dark */}
            <Moon
                className={`h-5 w-5 absolute transition-all duration-500 ease-in-out ${isDark
                    ? "-rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                    }`}
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

// Mobile-friendly theme toggle that matches navigation menu item styling
export function MobileThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="flex items-center px-3 py-2 text-sm font-medium rounded-[0.5rem] text-muted-foreground">
                <div className="w-4 h-4 mr-2" />
                Theme
            </div>
        )
    }

    const isDark = resolvedTheme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-[0.5rem] text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors relative z-10"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <div className="w-4 h-4 mr-2 relative">
                <Sun
                    className={`w-4 h-4 absolute inset-0 transition-all duration-300 ${isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
                        }`}
                />
                <Moon
                    className={`w-4 h-4 absolute inset-0 transition-all duration-300 ${isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                        }`}
                />
            </div>
            {isDark ? "Light Mode" : "Dark Mode"}
        </button>
    )
}
