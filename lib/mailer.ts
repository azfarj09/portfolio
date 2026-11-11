import nodemailer from "nodemailer"
import type { ContactValues } from "@/lib/contact"

// Email settings come from environment variables (see .env.local):
//   EMAIL_USER  the address the form sends from, and where messages are delivered
//   EMAIL_PASS  a Google App Password for that account (not the normal password)
// Optional:
//   EMAIL_HOST / EMAIL_PORT            use another mail provider instead of Gmail
//   EMAIL_ALLOW_UNVERIFIED_TLS=true    local development only, see createMailer()

export function isEmailConfigured() {
  return Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS)
}

export function createMailer() {
  const auth = { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }

  // Some antivirus programs and school/work networks intercept mail connections,
  // which makes the mail server's certificate impossible to verify. This switch
  // lets a LOCAL dev server send anyway. It is deliberately ignored in production,
  // where skipping the check would put the email password at risk.
  const allowUnverified = process.env.NODE_ENV !== "production" && process.env.EMAIL_ALLOW_UNVERIFIED_TLS === "true"
  const tls = allowUnverified ? { rejectUnauthorized: false } : undefined

  const host = process.env.EMAIL_HOST
  if (host) {
    const port = Number(process.env.EMAIL_PORT) || 587
    return nodemailer.createTransport({ host, port, secure: port === 465, auth, tls })
  }

  return nodemailer.createTransport({ service: "gmail", auth, tls })
}

/** Makes visitor-typed text safe to place inside the HTML email. */
function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/** Email headers must stay on one line. */
const oneLine = (text: string) => text.replace(/[\r\n]+/g, " ").trim()

/** Builds the email that lands in the site owner's inbox. */
export function buildContactEmail({ name, email, subject, message }: ContactValues) {
  const owner = process.env.EMAIL_USER as string
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message).replace(/\r?\n/g, "<br>"),
  }

  return {
    from: { name: "Portfolio Contact Form", address: owner },
    to: owner, // Send to yourself
    replyTo: { name: oneLine(name), address: email }, // So you can reply directly to the sender
    subject: `Portfolio Contact: ${oneLine(subject)}`,
    text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}\n`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #17140f;">
        <h2 style="margin: 0 0 20px; padding-bottom: 12px; border-bottom: 3px solid #2b50ff; font-size: 22px;">
          New Contact Form Submission
        </h2>

        <table style="width: 100%; border-collapse: collapse; background: #f2ede3; border-radius: 10px;">
          <tr><td style="padding: 14px 18px 4px; font-size: 12px; letter-spacing: 1px; color: #5b5448;">NAME</td></tr>
          <tr><td style="padding: 0 18px 10px; font-size: 16px;"><strong>${safe.name}</strong></td></tr>
          <tr><td style="padding: 4px 18px; font-size: 12px; letter-spacing: 1px; color: #5b5448;">EMAIL</td></tr>
          <tr><td style="padding: 0 18px 10px; font-size: 16px;"><a href="mailto:${safe.email}" style="color: #2445e6;">${safe.email}</a></td></tr>
          <tr><td style="padding: 4px 18px; font-size: 12px; letter-spacing: 1px; color: #5b5448;">SUBJECT</td></tr>
          <tr><td style="padding: 0 18px 16px; font-size: 16px;">${safe.subject}</td></tr>
        </table>

        <div style="margin: 20px 0; padding: 4px 0 4px 18px; border-left: 4px solid #2b50ff;">
          <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 1px; color: #5b5448;">MESSAGE</p>
          <p style="margin: 0; font-size: 16px; line-height: 1.6;">${safe.message}</p>
        </div>

        <p style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #ddd6c8; font-size: 12px; color: #857c6d;">
          This email was sent from your portfolio contact form. Reply to it to answer ${safe.name} directly.
        </p>
      </div>
    `,
  }
}
