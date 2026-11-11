"use client"

import { useRef, useState } from "react"
import { ArrowUpRight, Check, Mail, MapPin, Send } from "lucide-react"
import { DiscordIcon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import {
  CONTACT_FIELDS,
  CONTACT_LIMITS,
  EMPTY_CONTACT,
  cleanContactValues,
  validateContact,
  validateContactField,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "@/lib/contact"
import { links } from "@/lib/site-data"

// What the area under the button is showing.
//   error        the server (or network) failed
//   unavailable  the server has no email settings, so it cannot send at all
//   rate-limited too many messages from this visitor
type Notice = { kind: "error" | "unavailable" | "rate-limited"; message: string } | null

export function Contact() {
  const [values, setValues] = useState<ContactValues>(EMPTY_CONTACT)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notice, setNotice] = useState<Notice>(null)
  const [sentName, setSentName] = useState<string | null>(null) // set once a message has gone through
  const honeypotRef = useRef<HTMLInputElement>(null)

  const handleChange =
    (field: ContactField) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value
      setValues((current) => ({ ...current, [field]: value }))
      // Once a field has been flagged, re-check it as the visitor types so the error clears itself.
      if (errors[field]) {
        setErrors((current) => ({ ...current, [field]: validateContactField(field, value) }))
      }
    }

  const handleBlur = (field: ContactField) => () => {
    if (values[field].trim() === "") return // don't nag about fields they haven't reached yet
    setErrors((current) => ({ ...current, [field]: validateContactField(field, values[field]) }))
  }

  const focusFirstInvalid = (problems: ContactErrors) => {
    const first = CONTACT_FIELDS.find((field) => problems[field])
    if (first) document.getElementById(`contact-${first}`)?.focus()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    const data = cleanContactValues(values)
    const problems = validateContact(data)
    setErrors(problems)
    if (Object.keys(problems).length > 0) {
      focusFirstInvalid(problems)
      return
    }

    setIsSubmitting(true)
    setNotice(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, website: honeypotRef.current?.value ?? "" }),
      })

      if (response.ok) {
        setSentName(data.name.split(/\s+/)[0])
        setValues(EMPTY_CONTACT)
        setErrors({})
        return
      }

      const errorData = await response.json().catch(() => ({}))

      if (response.status === 429) {
        const minutes = Math.max(1, Math.ceil((Number(errorData.retryAfter) || 60) / 60))
        setNotice({
          kind: "rate-limited",
          message: `Too many requests. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
        })
      } else if (response.status === 400 && errorData.errors) {
        setErrors(errorData.errors)
        focusFirstInvalid(errorData.errors)
      } else if (errorData.code === "not_configured") {
        setNotice({ kind: "unavailable", message: "This form can't send messages right now." })
      } else {
        setNotice({ kind: "error", message: "Failed to send message. Please try again." })
      }
    } catch (error) {
      console.error("Contact form error:", error)
      setNotice({ kind: "error", message: "Network error. Please check your connection and try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  // If the form can't deliver, the visitor can still send the same message from their own email app.
  const mailtoFallback =
    `${links.mailto}?subject=${encodeURIComponent(values.subject.trim())}` +
    `&body=${encodeURIComponent(`${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`)}`

  const fieldProps = (field: ContactField) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: handleChange(field),
    onBlur: handleBlur(field),
    maxLength: CONTACT_LIMITS[field],
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
  })

  const fieldError = (field: ContactField) =>
    errors[field] && (
      <p id={`contact-${field}-error`} className="field__error">
        {errors[field]}
      </p>
    )

  const messageLength = values.message.length

  return (
    <section
      id="contact"
      className="section band"
      aria-labelledby="contact-heading"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <div className="wrap">
        <Reveal as="header" className="sec-head">
          <p className="eyebrow">
            <span className="eyebrow__num">04</span>
            Contact
          </p>
          <h2 id="contact-heading" className="sec-title">
            Let's <em>Connect!</em>
          </h2>
          <p className="sec-intro">
            I love meeting other developers and learning new things! Whether you want to collaborate on a project,
            share coding tips, or just chat about tech, I'd love to hear from you.
          </p>
        </Reveal>

        <div className="contact">
          {/* Contact Info */}
          <Reveal className="contact__info">
            <h3 className="contact__heading">Get in Touch</h3>
            <p className="contact__text">
              I'm always excited to connect with fellow developers, learn from others, and share what I've discovered
              on my coding journey. Feel free to reach out!
            </p>

            <ul className="contact__list">
              <li className="contact__row">
                <Mail aria-hidden="true" />
                <span className="contact__key">Email</span>
                <a href={links.mailto} className="contact__val">
                  {links.email}
                </a>
              </li>
              <li className="contact__row">
                <DiscordIcon />
                <span className="contact__key">Discord</span>
                <span className="contact__val">azfar222</span>
              </li>
              <li className="contact__row">
                <MapPin aria-hidden="true" />
                <span className="contact__key">Location</span>
                <span className="contact__val">Toronto, Ontario</span>
              </li>
            </ul>
          </Reveal>

          {/* Contact Form */}
          <Reveal className="contact__form" delay={120}>
            {sentName !== null ? (
              <div className="form__done" role="status">
                <span className="form__done-icon" aria-hidden="true">
                  <Check />
                </span>
                <h3 className="form__done-title">Message sent successfully!</h3>
                <p className="form__done-text">
                  Thanks for reaching out{sentName ? `, ${sentName}` : ""}! Your message is in my inbox.
                </p>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setSentName(null)}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form" noValidate>
                <div className="form__row">
                  <div className="field" data-invalid={errors.name ? "" : undefined}>
                    <label htmlFor="contact-name">Name</label>
                    <input {...fieldProps("name")} placeholder="Your name" autoComplete="name" required />
                    {fieldError("name")}
                  </div>
                  <div className="field" data-invalid={errors.email ? "" : undefined}>
                    <label htmlFor="contact-email">Email</label>
                    <input
                      {...fieldProps("email")}
                      type="email"
                      inputMode="email"
                      placeholder="your.email@example.com"
                      autoComplete="email"
                      required
                    />
                    {fieldError("email")}
                  </div>
                </div>

                <div className="field" data-invalid={errors.subject ? "" : undefined}>
                  <label htmlFor="contact-subject">Subject</label>
                  <input {...fieldProps("subject")} placeholder="Project inquiry" required />
                  {fieldError("subject")}
                </div>

                <div className="field" data-invalid={errors.message ? "" : undefined}>
                  <label htmlFor="contact-message">Message</label>
                  <textarea {...fieldProps("message")} placeholder="Tell me about your project..." required />
                  <div className="field__foot">
                    {fieldError("message")}
                    <span
                      className="field__count"
                      data-near={messageLength > CONTACT_LIMITS.message * 0.9 ? "" : undefined}
                      aria-hidden="true"
                    >
                      {messageLength} / {CONTACT_LIMITS.message}
                    </span>
                  </div>
                </div>

                {/* Spam trap: hidden from people, tempting for bots. Leave it empty. */}
                <div className="form__hp" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" ref={honeypotRef} />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn--accent form__submit">
                  {isSubmitting ? <span className="spinner" aria-hidden="true" /> : <Send />}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {/* Status Messages */}
                <div className="form__live" role="status" aria-live="polite">
                  {notice && (
                    <div className={`form__status form__status--${notice.kind === "unavailable" ? "error" : notice.kind}`}>
                      <p>{notice.message}</p>
                      {notice.kind !== "rate-limited" && (
                        <a href={mailtoFallback} className="form__fallback">
                          Send it from your email app instead
                          <ArrowUpRight />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
