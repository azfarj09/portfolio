"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    // Small delay to ensure proper mounting
    const mountTimer = setTimeout(() => {
      setIsMounted(true)
    }, 50)

    return () => clearTimeout(mountTimer)
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-32 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-sm text-primary font-mono uppercase tracking-wider mb-4">Contact</div>
          <h2 className="text-4xl md:text-5xl font-bold text-balance hover:text-primary transition-colors duration-500 cursor-default">Let's Connect!</h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            I love meeting other developers and learning new things! Whether you want to collaborate on a project, share coding tips, or just chat about tech, I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`space-y-8 ${isVisible ? "opacity-100 animate-slide-in-left" : "opacity-0"}`}>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold hover:text-primary transition-colors duration-300 cursor-default">Get in Touch</h3>
              <p className="text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300">
                I'm always excited to connect with fellow developers, learn from others, and share what I've discovered on my coding journey. Feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              <div className={`flex items-center gap-4 p-4 rounded-lg hover:bg-card/50 hover:scale-105 hover:translate-x-2 transition-all duration-300 cursor-pointer group ${
                isVisible ? 'animate-slide-in-right animate-delay-200' : 'opacity-0'
              }`}>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                  <Mail className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <div className="font-medium group-hover:text-primary transition-colors duration-300">Email</div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">azfar.jamil@email.com</div>
                </div>
              </div>

              <div className={`flex items-center gap-4 p-4 rounded-lg hover:bg-card/50 hover:scale-105 hover:translate-x-2 transition-all duration-300 cursor-pointer group ${
                isVisible ? 'animate-slide-in-right animate-delay-400' : 'opacity-0'
              }`}>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                  <Phone className="h-5 w-5 text-primary group-hover:-rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <div className="font-medium group-hover:text-primary transition-colors duration-300">Phone</div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className={`flex items-center gap-4 p-4 rounded-lg hover:bg-card/50 hover:scale-105 hover:translate-x-2 transition-all duration-300 cursor-pointer group ${
                isVisible ? 'animate-slide-in-right animate-delay-600' : 'opacity-0'
              }`}>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <div className="font-medium group-hover:text-primary transition-colors duration-300">Location</div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Toronto, Ontario</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className={`p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group ${isVisible ? "opacity-100 animate-scale-in-bounce animate-delay-400" : "opacity-0"}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`space-y-2 ${isVisible ? 'animate-slide-in-left animate-delay-600' : 'opacity-0'}`}>
                  <label className="text-sm font-medium hover:text-primary transition-colors duration-300">Name</label>
                  <Input 
                    name="name" 
                    placeholder="Your name" 
                    className="hover:border-primary/50 focus:scale-105 transition-all duration-300" 
                    required 
                  />
                </div>
                <div className={`space-y-2 ${isVisible ? 'animate-slide-in-right animate-delay-600' : 'opacity-0'}`}>
                  <label className="text-sm font-medium hover:text-primary transition-colors duration-300">Email</label>
                  <Input 
                    name="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="hover:border-primary/50 focus:scale-105 transition-all duration-300" 
                    required 
                  />
                </div>
              </div>

              <div className={`space-y-2 ${isVisible ? 'animate-fade-in-up animate-delay-800' : 'opacity-0'}`}>
                <label className="text-sm font-medium hover:text-primary transition-colors duration-300">Subject</label>
                <Input 
                  name="subject" 
                  placeholder="Project inquiry" 
                  className="hover:border-primary/50 focus:scale-105 transition-all duration-300" 
                  required 
                />
              </div>

              <div className={`space-y-2 ${isVisible ? 'animate-fade-in-up animate-delay-1000' : 'opacity-0'}`}>
                <label className="text-sm font-medium hover:text-primary transition-colors duration-300">Message</label>
                <Textarea 
                  name="message" 
                  placeholder="Tell me about your project..." 
                  className="min-h-32 resize-none hover:border-primary/50 focus:scale-105 transition-all duration-300" 
                  required 
                />
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full animate-glow hover:animate-button-magic transform hover:scale-105 active:scale-95 transition-all duration-300 ${isVisible ? 'animate-scale-in-bounce animate-delay-1200' : 'opacity-0'}`}
              >
                <Send className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-3 bg-green-600/20 border border-green-500/50 rounded-lg text-center">
                  <p className="text-green-400 font-medium">✅ Message sent successfully!</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-3 bg-red-600/20 border border-red-500/50 rounded-lg text-center">
                  <p className="text-red-400 font-medium">❌ Failed to send message. Please try again.</p>
                </div>
              )}
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
