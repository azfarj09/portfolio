import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'
import { cleanContactValues, validateContact } from '@/lib/contact'
import { buildContactEmail, createMailer, isEmailConfigured } from '@/lib/mailer'

export async function POST(request: NextRequest) {
  // Read the submission. Anything that isn't valid JSON is rejected straight away.
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
  }

  // Spam trap: real visitors never see the "website" field, so only bots fill it in.
  // Pretend it worked so they don't learn to avoid it.
  const trap = (body as { website?: unknown } | null)?.website
  if (typeof trap === 'string' && trap.trim() !== '') {
    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 })
  }

  // Validate required fields
  const values = cleanContactValues(body)
  const errors = validateContact(values)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ message: 'Please check the highlighted fields.', errors }, { status: 400 })
  }

  // Validate environment variables
  if (!isEmailConfigured()) {
    console.warn(
      '[contact] EMAIL_USER / EMAIL_PASS are not set, so the form cannot send. ' +
        'Add them to .env.local (or to Environment Variables on Vercel) and restart the server.'
    )
    return NextResponse.json(
      { message: 'Email is not set up on this server yet.', code: 'not_configured' },
      { status: 503 }
    )
  }

  // Get client IP for rate limiting
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown'

  // Apply rate limiting: 3 emails per 15 minutes per IP
  const rateLimitResult = rateLimit(ip, 3, 15 * 60 * 1000)

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        message: 'Too many requests. Please try again later.',
        retryAfter: rateLimitResult.retryAfter
      },
      {
        status: 429,
        headers: {
          'Retry-After': rateLimitResult.retryAfter?.toString() || '900'
        }
      }
    )
  }

  try {
    // Send email
    const result = await createMailer().sendMail(buildContactEmail(values))
    console.log('[contact] Email sent:', result.messageId)

    return NextResponse.json(
      {
        message: 'Email sent successfully!',
        remaining: rateLimitResult.remaining
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[contact] Sending failed:', error)

    // Point at the usual causes in the server log. Visitors only get a generic message.
    const code = (error as { code?: string }).code
    const text = error instanceof Error ? error.message : ''
    if (code === 'EAUTH') {
      console.error(
        '[contact] The mail server rejected the login. For Gmail, EMAIL_PASS must be a Google App Password, not the normal account password.'
      )
    } else if (/certificate|self.signed|verify/i.test(text)) {
      console.error(
        '[contact] The mail server certificate could not be verified. An antivirus or network is probably intercepting the connection. ' +
          'For local development only, set EMAIL_ALLOW_UNVERIFIED_TLS=true in .env.local.'
      )
    }

    return NextResponse.json({ message: 'Failed to send email', code: 'send_failed' }, { status: 500 })
  }
}
