// Rules for the contact form, shared by the form (components/contact.tsx) and
// the API route (app/api/contact/route.ts) so the browser and server always agree.

export const CONTACT_FIELDS = ["name", "email", "subject", "message"] as const

export type ContactField = (typeof CONTACT_FIELDS)[number]
export type ContactValues = Record<ContactField, string>
export type ContactErrors = Partial<Record<ContactField, string>>

/** Longest text allowed in each field. */
export const CONTACT_LIMITS: Record<ContactField, number> = {
  name: 100,
  email: 254,
  subject: 150,
  message: 3000,
}

export const EMPTY_CONTACT: ContactValues = { name: "", email: "", subject: "", message: "" }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const MISSING: Record<ContactField, string> = {
  name: "Please enter your name.",
  email: "Please enter your email.",
  subject: "Please enter a subject.",
  message: "Please write a message.",
}

/** Picks the four fields out of whatever was submitted and trims them. */
export function cleanContactValues(input: unknown): ContactValues {
  const source = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>
  const read = (field: ContactField) => {
    const value = source[field]
    return typeof value === "string" ? value.trim() : ""
  }
  return { name: read("name"), email: read("email"), subject: read("subject"), message: read("message") }
}

/** Returns what is wrong with one field, or undefined if it is fine. */
export function validateContactField(field: ContactField, value: string): string | undefined {
  const text = value.trim()
  if (!text) return MISSING[field]
  if (text.length > CONTACT_LIMITS[field]) return `That's too long (max ${CONTACT_LIMITS[field]} characters).`
  if (field === "email" && !EMAIL_PATTERN.test(text)) return "That email address doesn't look right."
  return undefined
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  for (const field of CONTACT_FIELDS) {
    const problem = validateContactField(field, values[field])
    if (problem) errors[field] = problem
  }
  return errors
}
