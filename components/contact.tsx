"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react"

// Custom Discord Icon Component
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'rate-limited'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
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
          ; (e.target as HTMLFormElement).reset()

        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 3000)
      } else if (response.status === 429) {
        const errorData = await response.json()
        setSubmitStatus('rate-limited')
        setErrorMessage(`Too many requests. Please try again in ${Math.ceil(errorData.retryAfter / 60)} minutes.`)

        // Auto-hide rate limit message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
          setErrorMessage('')
        }, 5000)
      } else {
        const errorData = await response.json()
        setSubmitStatus('error')
        setErrorMessage(errorData.message || 'Failed to send message. Please try again.')

        // Auto-hide error message after 3 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
          setErrorMessage('')
        }, 3000)
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')

      // Auto-hide error message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorMessage('')
      }, 3000)
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
              <div className={`flex items-center gap-4 p-4 rounded-lg hover:bg-card/50 hover:scale-105 hover:translate-x-2 transition-all duration-300 cursor-pointer group ${isVisible ? 'animate-slide-in-right animate-delay-200' : 'opacity-0'
                }`}>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                  <Mail className="h-5 w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <div className="font-medium group-hover:text-primary transition-colors duration-300">Email</div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">azfarj09@gmail.com</div>
                </div>
              </div>

              <div className={`flex items-center gap-4 p-4 rounded-lg hover:bg-card/50 hover:scale-105 hover:translate-x-2 transition-all duration-300 cursor-pointer group ${isVisible ? 'animate-slide-in-right animate-delay-400' : 'opacity-0'
                }`}>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                  <DiscordIcon className="h-5 w-5 text-primary group-hover:-rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <div className="font-medium group-hover:text-primary transition-colors duration-300">Discord</div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">azfar222</div>
                </div>
              </div>

              <div className={`flex items-center gap-4 p-4 rounded-lg hover:bg-card/50 hover:scale-105 hover:translate-x-2 transition-all duration-300 cursor-pointer group ${isVisible ? 'animate-slide-in-right animate-delay-600' : 'opacity-0'
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
                <div className="p-3 bg-green-600/20 border border-green-500/50 rounded-lg text-center animate-fade-in-up">
                  <p className="text-green-400 font-medium">✅ Message sent successfully!</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 bg-red-600/20 border border-red-500/50 rounded-lg text-center">
                  <p className="text-red-400 font-medium">❌ {errorMessage || 'Failed to send message. Please try again.'}</p>
                </div>
              )}

              {submitStatus === 'rate-limited' && (
                <div className="p-3 bg-yellow-600/20 border border-yellow-500/50 rounded-lg text-center">
                  <p className="text-yellow-400 font-medium">⏰ {errorMessage}</p>
                </div>
              )}
            </form>
          </Card>
        </div>

        {/* Footer */}
        <div
          className={`mt-16 pt-8 border-t border-border ${isVisible ? "opacity-100 animate-fade-in-up animate-delay-800" : "opacity-0"}`}
        >
          <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
            {/* Left Side - Brand & Social */}
            <div className="space-y-4 md:flex-[2]">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                Azfar Jamil
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Building digital experiences with passion and precision. Let's create something amazing together.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/azfarj09" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/azfar-jamil-83b36a38b/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:azfarj09@gmail.com" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Center - Contact */}
            <div className="md:flex-1">
              <h4 className="text-sm font-semibold mb-4">Contact</h4>
              <div className="flex flex-col gap-2">
                <a href="mailto:azfarj09@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">azfarj09@gmail.com</a>
                <p className="text-sm text-muted-foreground">Toronto, Ontario</p>
                <p className="text-sm text-muted-foreground">Discord: azfar222</p>
              </div>
            </div>

            {/* Right Side - Quick Links */}
            <div className="md:flex-1">
              <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <a href="#about" className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all">About</a>
                <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all">Projects</a>
                <a href="#blog" className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all">Blog</a>
                <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all">Contact</a>
              </div>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-border">
            <p className="text-muted-foreground text-sm">© 2025 Azfar Jamil. Built with Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
