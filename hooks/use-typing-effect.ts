import { useState, useEffect } from 'react'

interface UseTypingEffectOptions {
  text: string
  speed?: number
  delay?: number
}

export function useTypingEffect({ text, speed = 100, delay = 0 }: UseTypingEffectOptions) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!text) return

    const timer = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, speed, delay])

  return { displayedText, isComplete }
}