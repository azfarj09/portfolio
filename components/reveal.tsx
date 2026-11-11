"use client"

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react"

interface RevealProps {
  /** Element to render, e.g. "li" or "header". Defaults to a div. */
  as?: ElementType
  className?: string
  /** Delay before the fade-in starts, in milliseconds. */
  delay?: number
  children: ReactNode
}

/**
 * Fades its content up into place the first time it scrolls into view.
 *
 * Content starts out visible. It is only hidden ("armed") once the browser
 * confirms it is still completely below the screen, so if the observer never
 * runs (no JavaScript, a background tab, a screenshot bot) nothing stays blank.
 */
export function Reveal({ as: Tag = "div", className = "", delay = 0, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useState<"idle" | "armed" | "shown">("idle")

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1]

        if (entry.isIntersecting) {
          setState("shown")
          observer.disconnect()
          return
        }

        const viewportHeight = entry.rootBounds?.height ?? window.innerHeight
        if (entry.boundingClientRect.top >= viewportHeight) {
          setState((current) => (current === "idle" ? "armed" : current))
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal${state === "armed" ? " is-armed" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? ({ "--d": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
