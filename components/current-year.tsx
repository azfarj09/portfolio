"use client"

import { useEffect, useState } from "react"

/**
 * The page is pre-rendered, so the year baked into the HTML is the year of the
 * last deploy. This starts from that value (so hydration matches) and then
 * corrects it in the browser if a new year has started since.
 */
export function CurrentYear({ initial }: { initial: number }) {
  const [year, setYear] = useState(initial)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return <>{year}</>
}
