"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export function Contact() {
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
    <section id="contact" ref={ref} className="py-32 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-sm text-primary font-mono uppercase tracking-wider mb-4">Contact</div>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Let's Connect!</h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            I love meeting other developers and learning new things! Whether you want to collaborate on a project, share coding tips, or just chat about tech, I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`space-y-8 ${isVisible ? "opacity-100 animate-slide-in-left" : "opacity-0"}`}>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Get in Touch</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always excited to connect with fellow developers, learn from others, and share what I've discovered on my coding journey. Feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">azfar.jamil@email.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-muted-foreground">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-muted-foreground">Toronto, Ontario</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className={`p-8 ${isVisible ? "opacity-100 animate-fade-in-up animate-delay-400" : "opacity-0"}`}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Project inquiry" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="Tell me about your project..." className="min-h-32 resize-none" />
              </div>

              <Button className="w-full animate-glow">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>

        {/* Footer */}
        <div
          className={`text-center mt-16 pt-8 border-t border-border ${isVisible ? "opacity-100 animate-fade-in-up animate-delay-800" : "opacity-0"}`}
        >
          <p className="text-muted-foreground">© 2025 Azfar Jamil. Built with Next.js and Tailwind CSS.</p>
        </div>
      </div>
    </section>
  )
}
