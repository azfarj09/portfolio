"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { useTypingEffect } from "@/hooks/use-typing-effect"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const { displayedText: typedName, isComplete } = useTypingEffect({
    text: "Azfar Jamil",
    speed: 150,
    delay: 500
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-accent/20 rounded-full animate-float animate-delay-400" />
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-primary/30 rounded-full animate-float animate-delay-800" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="space-y-8">
          <div className="opacity-0 animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold text-balance bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
              {typedName}
              <span className={`inline-block w-1 h-16 md:h-20 bg-primary ml-2 ${isComplete ? 'animate-pulse' : 'animate-blink'}`} />
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mt-4">Full Stack Developer</p>
          </div>

          <div className="opacity-0 animate-fade-in-up animate-delay-200">
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Hey! I'm a 12-year-old who fell in love with coding by watching YouTube tutorials. What started as curiosity turned into building real projects!
            </p>
          </div>

          <div className="opacity-0 animate-fade-in-up animate-delay-400">
            <p className="text-base text-muted-foreground mb-8">
              From <span className="text-primary font-semibold">YouTube tutorials</span> to building awesome websites - proving age is just a number in coding!
            </p>
          </div>

          <div className="opacity-0 animate-fade-in-up animate-delay-600 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="animate-glow">
              View My Work
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors" asChild>
                <a href="https://github.com/azfarj09" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in-up animate-delay-800">
          <ArrowDown className="h-6 w-6 text-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  )
}
