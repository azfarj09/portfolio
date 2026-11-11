"use client"

import { useEffect, useState } from "react"
import { calculateAge } from "@/lib/utils"

/**
 * The page is pre-rendered, so the age baked into the HTML is the age on the
 * day of the last deploy. This starts from that value (so hydration matches)
 * and then corrects it in the browser if a birthday has passed since.
 */
export function useLiveAge(initialAge: number) {
  const [age, setAge] = useState(initialAge)

  useEffect(() => {
    setAge(calculateAge())
  }, [])

  return age
}

export function LiveAge({ initial }: { initial: number }) {
  return <>{useLiveAge(initial)}</>
}
