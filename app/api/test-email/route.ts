import { NextResponse } from 'next/server'
import { createMailer, isEmailConfigured } from '@/lib/mailer'

// Open http://localhost:3000/api/test-email while running `npm run dev` to check
// that the email settings in .env.local work. It only logs in to the mail server;
// it does not send anything. Disabled on the live site.
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'Not found' }, { status: 404 })
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error: 'EMAIL_USER and EMAIL_PASS are not set. Fill them in in .env.local and restart the dev server.'
      },
      { status: 500 }
    )
  }

  try {
    // Test connection
    await createMailer().verify()

    return NextResponse.json({
      success: true,
      message: 'Email configuration is working!'
    })
  } catch (error) {
    console.error('Email test failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
