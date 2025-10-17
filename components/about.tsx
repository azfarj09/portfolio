"use client"

import { useEffect, useRef, useState } from "react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
          observer.disconnect() // Stop observing once animated
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

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
                  <div className="grid grid-cols-2 gap-4">
                    {[
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
                    ].map((tech, index) => (
                      <div
                        key={tech}
                        className={`text-sm text-muted-foreground hover:text-primary hover:scale-110 hover:translate-x-2 transition-all duration-300 cursor-default p-2 rounded hover:bg-primary/10 ${
                          isVisible ? 'animate-slide-in-right' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${(index * 0.1) + 0.6}s` }}
                      >
                        {tech}
                      </div>
                    ))}
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
