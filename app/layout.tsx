import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Azfar Jamil | Full Stack Developer Portfolio - React, Next.js & TypeScript Expert",
    template: "%s | Azfar Jamil - Full Stack Developer"
  },
  description: "Azfar Jamil is a talented young Full Stack Developer from Toronto, Canada, passionate about modern web technologies. Specializing in React, Next.js, TypeScript, Node.js, and Python. View my projects, skills, and coding journey. Building the future, one line of code at a time.",
  keywords: [
    // Name variations
    "Azfar Jamil",
    "azfarj09",
    "Azfar Jamil portfolio",
    "Azfar Jamil developer",
    // Role-based keywords
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Software Developer",
    "Young Developer",
    "Teen Developer",
    // Technology keywords
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "Python Developer",
    // Framework/Library keywords
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "JavaScript",
    "Python",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
    // Service keywords
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Web Application Development",
    "Responsive Web Design",
    // Location keywords
    "Developer Toronto",
    "Developer Canada",
    "Toronto Web Developer",
    "Canadian Developer",
    // Long-tail keywords
    "hire young developer",
    "portfolio website developer",
    "modern web development portfolio",
    "React Next.js portfolio",
    "coding projects portfolio"
  ],
  authors: [{ name: "Azfar Jamil", url: "https://github.com/azfarj09" }],
  creator: "Azfar Jamil",
  publisher: "Azfar Jamil",
  metadataBase: new URL('https://azfarj.vercel.app'),
  verification: {
    google: 'google914b766941dfa99c',
    // Add these after registering with respective services
    // yandex: 'your-yandex-verification-code',
    // other: { 'msvalidate.01': 'your-bing-verification-code' }
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://azfarj.vercel.app',
    siteName: 'Azfar Jamil - Full Stack Developer Portfolio',
    title: 'Azfar Jamil | Full Stack Developer Portfolio - React, Next.js & TypeScript Expert',
    description: 'Explore Azfar Jamil\'s portfolio - a talented young Full Stack Developer from Toronto, Canada. View projects built with React, Next.js, TypeScript, Node.js & more.',
    images: [
      {
        url: 'https://azfarj.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Azfar Jamil - Full Stack Developer Portfolio | React, Next.js & TypeScript Expert',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@azfarj09',
    title: 'Azfar Jamil | Full Stack Developer Portfolio',
    description: 'Young Full Stack Developer from Toronto, Canada. Specializing in React, Next.js, TypeScript & Node.js. Check out my projects and coding journey!',
    images: [
      {
        url: 'https://azfarj.vercel.app/og-image.png',
        alt: 'Azfar Jamil - Full Stack Developer Portfolio',
      }
    ],
    creator: '@azfarj09',
  },
  alternates: {
    canonical: 'https://azfarj.vercel.app',
    languages: {
      'en-US': 'https://azfarj.vercel.app',
    },
  },
  category: 'technology',
  other: {
    'revisit-after': '7 days',
    'author': 'Azfar Jamil',
    'geo.region': 'CA-ON',
    'geo.placename': 'Toronto',
    'geo.position': '43.6532;-79.3832',
    'ICBM': '43.6532, -79.3832',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Person Schema - Main identity
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://azfarj.vercel.app/#person",
    "name": "Azfar Jamil",
    "alternateName": "azfarj09",
    "jobTitle": "Full Stack Developer",
    "description": "Talented young Full Stack Developer from Toronto, Canada, passionate about modern web technologies including React, Next.js, TypeScript, and Node.js",
    "url": "https://azfarj.vercel.app",
    "image": "https://azfarj.vercel.app/og-image.png",
    "sameAs": [
      "https://github.com/azfarj09",
      "https://www.linkedin.com/in/azfar-jamil-83b36a38b/"
    ],
    "email": "mailto:azfarj09@gmail.com",
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
      "GraphQL",
      "Tailwind CSS",
      "Web Development",
      "Full Stack Development",
      "Frontend Development",
      "Backend Development"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Self-taught through YouTube tutorials"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full Stack Developer",
      "occupationLocation": {
        "@type": "City",
        "name": "Toronto",
        "containedInPlace": {
          "@type": "Country",
          "name": "Canada"
        }
      },
      "skills": "React, Next.js, TypeScript, Node.js, Python, PostgreSQL, MongoDB"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "Ontario",
      "addressCountry": "Canada"
    }
  }

  // WebSite Schema - For sitelinks searchbox
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://azfarj.vercel.app/#website",
    "name": "Azfar Jamil - Full Stack Developer Portfolio",
    "alternateName": "azfarj09 Portfolio",
    "url": "https://azfarj.vercel.app",
    "description": "Portfolio website of Azfar Jamil, a Full Stack Developer from Toronto, Canada",
    "publisher": {
      "@id": "https://azfarj.vercel.app/#person"
    },
    "inLanguage": "en-US",
    "copyrightYear": new Date().getFullYear(),
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://azfarj.vercel.app/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  // WebPage Schema - For the main page
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://azfarj.vercel.app/#webpage",
    "url": "https://azfarj.vercel.app",
    "name": "Azfar Jamil | Full Stack Developer Portfolio - React, Next.js & TypeScript Expert",
    "description": "Explore Azfar Jamil's portfolio - a talented young Full Stack Developer from Toronto, Canada. View projects built with React, Next.js, TypeScript, Node.js & more.",
    "isPartOf": {
      "@id": "https://azfarj.vercel.app/#website"
    },
    "about": {
      "@id": "https://azfarj.vercel.app/#person"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://azfarj.vercel.app/og-image.png"
    },
    "breadcrumb": {
      "@id": "https://azfarj.vercel.app/#breadcrumb"
    },
    "inLanguage": "en-US",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  }

  // BreadcrumbList Schema - For navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://azfarj.vercel.app/#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://azfarj.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://azfarj.vercel.app/#about"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Projects",
        "item": "https://azfarj.vercel.app/#projects"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Blog",
        "item": "https://azfarj.vercel.app/#blog"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Contact",
        "item": "https://azfarj.vercel.app/#contact"
      }
    ]
  }

  // Portfolio/CreativeWork Schema - For projects section
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://azfarj.vercel.app/#projects",
    "name": "Azfar Jamil's Projects",
    "description": "A collection of web development projects built by Azfar Jamil",
    "numberOfItems": 3,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "SoftwareSourceCode",
          "name": "Portfolio Website",
          "description": "Personal portfolio website showcasing coding journey with modern web technologies",
          "programmingLanguage": ["TypeScript", "JavaScript"],
          "runtimePlatform": "Next.js",
          "codeRepository": "https://github.com/azfarj09/portfolio",
          "author": { "@id": "https://azfarj.vercel.app/#person" }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "SoftwareSourceCode",
          "name": "Tic Tac Toe Game",
          "description": "A Tic Tac Toe game built with HTML, CSS, and JavaScript",
          "programmingLanguage": ["HTML", "CSS", "JavaScript"],
          "codeRepository": "https://github.com/azfarj09/Tic-tac-toe",
          "author": { "@id": "https://azfarj.vercel.app/#person" }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "SoftwareSourceCode",
          "name": "AI PDF Tools",
          "description": "AI-powered PDF toolkit with summarization, flashcard generation, and interactive chat",
          "programmingLanguage": ["TypeScript", "JavaScript"],
          "runtimePlatform": "Next.js",
          "codeRepository": "https://github.com/azfarj09/ai-pdf-summarizer",
          "url": "https://ai-pdf-tools.vercel.app",
          "author": { "@id": "https://azfarj.vercel.app/#person" }
        }
      }
    ]
  }

  // Combine all schemas
  const structuredData = [
    personSchema,
    websiteSchema,
    webPageSchema,
    breadcrumbSchema,
    portfolioSchema
  ]

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect hints for performance optimization */}
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#65a3ff" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#3b82f6" media="(prefers-color-scheme: light)" />

        {/* Additional SEO meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Azfar Jamil" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
