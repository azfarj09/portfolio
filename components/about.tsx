"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Code2, 
  Database, 
  Server, 
  Cloud, 
  Container, 
  Zap, 
  Palette,
  Globe,
  FileCode,
  Layers
} from "lucide-react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    // Small delay to ensure proper mounting
    const mountTimer = setTimeout(() => {
      setIsMounted(true)
    }, 50)

    return () => clearTimeout(mountTimer)
  }, [])

  useEffect(() => {
    // Check for screens smaller than iPhone SE
    const checkScreenSize = () => {
      const width = window.innerWidth
      const shouldHideIcons = width < 375 // Hide icons for screens smaller than 375px
      console.log(`DEBUG: Screen width: ${width}px, Should hide icons: ${shouldHideIcons}, Current isSmallScreen: ${isSmallScreen}`)
      setIsSmallScreen(shouldHideIcons)
    }

    // Initial check
    checkScreenSize()
    
    // Listen for resize events
    window.addEventListener('resize', checkScreenSize)
    window.addEventListener('orientationchange', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
      window.removeEventListener('orientationchange', checkScreenSize)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          // Add a small delay to ensure smooth animation start
          setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, 50)
          observer.disconnect() // Stop observing once animated
        }
      },
      { threshold: 0.15, rootMargin: '-20px' }, // Require more of the element to be visible
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated, isMounted])

  return (
    <section id="about" ref={ref} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 ${isVisible ? "opacity-100 animate-slide-in-left" : "opacity-0"}`}>
            <div className="space-y-4">
              <div className="text-sm text-primary font-mono uppercase tracking-wider hover:text-accent transition-colors duration-300">About</div>
              <h2 className="text-4xl md:text-5xl font-bold text-balance hover:text-primary transition-colors duration-500 cursor-default">My Coding Journey</h2>
            </div>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p className="hover:text-foreground transition-colors duration-300 transform hover:translate-x-2">
                My coding journey started with <span className="text-primary hover:text-accent transition-colors duration-300 cursor-default">Scratch</span> when I was younger, learning the basics of programming logic through visual blocks. This foundation sparked my curiosity and led me to explore real programming languages.
              </p>

              <p className="hover:text-foreground transition-colors duration-300 transform hover:translate-x-2">
                I then dove into <span className="text-primary hover:text-accent transition-colors duration-300 cursor-default">Python</span> as my first text-based language, following tutorials from amazing YouTubers like <span className="text-primary hover:text-accent transition-colors duration-300 cursor-default">Bro Code</span> and <span className="text-primary hover:text-accent transition-colors duration-300 cursor-default">Dave Gray</span>. Their clear explanations and hands-on approach made complex concepts feel achievable.
              </p>

              <p className="hover:text-foreground transition-colors duration-300 transform hover:translate-x-2">
                From there, I discovered web development and learned <span className="text-primary hover:text-accent transition-colors duration-300 cursor-default">HTML, CSS, and JavaScript</span>. The ability to create interactive websites fascinated me, and I continued expanding my skills with frameworks like React and Next.js. Each new technology opened up more possibilities for bringing ideas to life.
              </p>
            </div>
          </div>

          <div className={`${isVisible ? "opacity-100 animate-scale-in-bounce animate-delay-400" : "opacity-0"}`}>
            <div className="relative group">
              <div className="bg-card border border-border rounded-lg p-8 space-y-6 hover:shadow-2xl hover:border-primary/50 transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">Technologies I work with</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "JavaScript", icon: Code2, color: "text-yellow-400" },
                      { name: "TypeScript", icon: FileCode, color: "text-blue-400" },
                      { name: "React", icon: Zap, color: "text-cyan-400" },
                      { name: "Next.js", icon: Globe, color: "text-white" },
                      { name: "Node.js", icon: Server, color: "text-green-400" },
                      { name: "Python", icon: Code2, color: "text-blue-300" },
                      { name: "PostgreSQL", icon: Database, color: "text-blue-500" },
                      { name: "MongoDB", icon: Database, color: "text-green-500" },
                      { name: "AWS", icon: Cloud, color: "text-orange-400" },
                      { name: "Docker", icon: Container, color: "text-blue-400" },
                      { name: "GraphQL", icon: Layers, color: "text-pink-400" },
                      { name: "Tailwind CSS", icon: Palette, color: "text-teal-400" },
                    ].map((tech, index) => {
                      const IconComponent = tech.icon
                      return (
                        <div
                          key={tech.name}
                          className={`flex items-center gap-3 text-sm text-muted-foreground hover:text-primary hover:scale-110 hover:translate-x-2 transition-all duration-300 cursor-default p-3 rounded-lg hover:bg-primary/10 group/tech ${
                            isVisible ? 'animate-slide-in-right' : 'opacity-0'
                          }`}
                          style={{ animationDelay: `${(index * 0.1) + 0.6}s` }}
                        >
                          {(typeof window === 'undefined' || window.innerWidth >= 375) && (
                            <IconComponent className={`h-4 w-4 ${tech.color} group-hover/tech:scale-125 transition-all duration-300`} />
                          )}
                          <span className="font-medium">{tech.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 animate-morphing-blob animate-float" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/20 rounded-full animate-float animate-delay-600" />
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-primary/30 rounded-full animate-float animate-delay-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
