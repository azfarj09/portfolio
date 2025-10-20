import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "azfarj09 - Azfar Jamil",
    template: "%s | azfarj09 - Azfar Jamil"
  },
  description: "12-year-old Full Stack Developer passionate about modern web technologies. Specializing in React, Next.js, TypeScript, and Node.js. Building the future, one line of code at a time.",
  keywords: [
    "Azfar Jamil",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Web Development",
    "Young Developer",
    "Portfolio",
    "JavaScript",
    "Frontend",
    "Backend"
  ],
  authors: [{ name: "Azfar Jamil", url: "https://github.com/azfarj09" }],
  creator: "Azfar Jamil",
  publisher: "Azfar Jamil",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://azfarj.vercel.app',
    siteName: 'Azfar Jamil Portfolio',
    title: 'azfarj09 - Azfar Jamil',
    description: '12-year-old Full Stack Developer passionate about modern web technologies. Building amazing web applications with React, Next.js, and TypeScript.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Azfar Jamil - Full Stack Developer Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'azfarj09 - Azfar Jamil',
    description: '12-year-old Full Stack Developer building amazing web applications. Check out my projects and coding journey!',
    images: ['/og-image.png'],
    creator: '@azfarj09',
  },
  alternates: {
    canonical: 'https://azfarj.vercel.app',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Azfar Jamil",
    "jobTitle": "Full Stack Developer",
    "description": "12-year-old Full Stack Developer passionate about modern web technologies",
    "url": "https://azfarj.vercel.app",
    "sameAs": [
      "https://github.com/azfarj09",
      "https://www.linkedin.com/in/azfar-jamil-83b36a38b/"
    ],
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "Web Development",
      "Full Stack Development"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Self-taught through YouTube tutorials"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full Stack Developer",
      "occupationLocation": {
        "@type": "Place",
        "name": "Toronto, Ontario, Canada"
      }
    }
  }

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
