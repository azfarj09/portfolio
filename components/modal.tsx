"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { X } from "lucide-react"

interface ModalProps {
  onClose: () => void
  /** Read out by screen readers as the dialog's name. */
  label: string
  size?: "default" | "wide" | "narrow"
  /** Show the round close button in the top-right corner. */
  showClose?: boolean
  children: ReactNode
}

/** Centered dialog. Closes on Escape or a click on the backdrop. */
export function Modal({ onClose, label, size = "default", showClose = true, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current()
    }

    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    panelRef.current?.focus()

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [])

  return (
    <div
      className="modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        className={`modal__panel${size === "default" ? "" : ` modal__panel--${size}`}`}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
      >
        {showClose && (
          <button type="button" className="icon-btn modal__close" onClick={onClose} aria-label="Close">
            <X />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
