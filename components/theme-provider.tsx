'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  useTheme,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeColorSync />
      {children}
    </NextThemesProvider>
  )
}

// The theme-color meta tags in layout.tsx follow the phone's setting, so on a
// dark-mode phone the browser bar would stay dark after switching to light.
// This points them at whichever theme is actually showing.
function ThemeColorSync() {
  const { resolvedTheme } = useTheme()

  React.useEffect(() => {
    if (!resolvedTheme) return
    const color = resolvedTheme === 'dark' ? '#12110e' : '#f2ede3'
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((meta) => meta.setAttribute('content', color))
  }, [resolvedTheme])

  return null
}
