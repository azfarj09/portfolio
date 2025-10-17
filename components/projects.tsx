"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import projects from "./projects.json"

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={ref} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 ${isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-sm text-primary font-mono uppercase tracking-wider mb-4">Projects</div>
          <h2 className="text-4xl md:text-5xl font-bold text-balance hover:text-primary transition-colors duration-500 cursor-default">My Projects</h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Here are some projects I've built while learning to code! Each one taught me something new and helped me grow as a developer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1 cursor-pointer ${
                isVisible ? `opacity-100 animate-scale-in-bounce` : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.3}s` }}
              onMouseEnter={(e) => e.currentTarget.classList.add('animate-card-hover')}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('animate-card-hover')
                e.currentTarget.classList.add('animate-card-unhover')
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute top-4 right-4 w-8 h-8 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-all duration-300" />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-2">{project.title}</h3>

                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={tech} 
                      variant="outline" 
                      className="text-xs hover:bg-primary/20 hover:scale-110 transition-all duration-300 cursor-default"
                      style={{ animationDelay: `${techIndex * 50}ms` }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Button variant="ghost" size="sm" className="hover:text-primary hover:scale-105 hover:shadow-md transition-all duration-300" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Code
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:text-primary hover:scale-105 hover:shadow-md transition-all duration-300">
                    <ExternalLink className="h-4 w-4 mr-2 group-hover:-rotate-12 transition-transform duration-300" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
