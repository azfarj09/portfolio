import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Birthday: January 9, 2013
export const BIRTHDAY = new Date(2013, 0, 9)

export function calculateAge(birthDate: Date = BIRTHDAY): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export function replaceAgeInText(text: string): string {
  const age = calculateAge()
  return text.replace(/\b12-year-old\b/g, `${age}-year-old`)
}
