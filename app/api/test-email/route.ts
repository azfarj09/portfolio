import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET() {
  try {
    console.log('Testing email configuration...')
    console.log('EMAIL_USER:', process.env.EMAIL_USER)
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS)

    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Test connection
    await transporter.verify()
    
    return NextResponse.json({
      success: true,
      message: 'Email configuration is working!',
      user: process.env.EMAIL_USER
    })
  } catch (error) {
    console.error('Email test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}