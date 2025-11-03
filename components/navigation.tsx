"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Briefcase, FileText, Mail } from "lucide-react"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [keepSquareCorners, setKeepSquareCorners] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleMenuToggle = () => {
    if (isMobileMenuOpen) {
      setIsClosing(true)
      setTimeout(() => {
        setKeepSquareCorners(false)
      }, 290) // Round corners 10ms before dropdown animation ends
      setTimeout(() => {
        setIsMobileMenuOpen(false)
        setIsClosing(false)
      }, 300)
    } else {
      setIsMobileMenuOpen(true)
      setKeepSquareCorners(true)
    }
  }

  const handleMenuItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')

    // Close menu first
    setIsClosing(true)
    setTimeout(() => {
      setKeepSquareCorners(false)
    }, 290)
    setTimeout(() => {
      setIsMobileMenuOpen(false)
      setIsClosing(false)
    }, 300)

    // Scroll to section after menu starts closing
    setTimeout(() => {
      if (href) {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }, 350)
  }

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className={`fixed inset-0 bg-background/20 backdrop-blur-sm z-40 md:hidden ${isClosing ? 'animate-overlay-fade-out' : 'animate-overlay-fade-in'}`}
          onClick={handleMenuToggle}
        />
      )}

      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4 transition-all duration-500 ease-out ${isScrolled ? 'pt-4' : 'pt-2 md:pt-2'}`}>
        <nav
          className={`w-full max-w-[calc(100%-2rem)] md:max-w-7xl rounded-[2rem] ${isScrolled
            ? "md:!max-w-4xl md:rounded-full bg-background/90 backdrop-blur-md border border-border/50 shadow-lg transition-all duration-500 ease-out"
            : isMobileMenuOpen
              ? "bg-background/60 backdrop-blur-md border border-border/50 transition-[background-color,border] duration-200"
              : "bg-transparent transition-all duration-500 ease-out"
            }`}
        >
          <div className={`flex items-center justify-between px-6 mx-auto transition-all duration-500 ease-out ${isScrolled ? "py-3" : "py-4"}`}>
            <button
              onClick={scrollToTop}
              className="transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {/* Desktop: Show text */}
              <span className={`hidden md:block font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent ${isScrolled ? "text-lg" : "text-xl"
                }`}>
                Azfar Jamil
              </span>

              {/* Mobile: Show favicon */}
              <img
                src="/favicon.svg"
                alt="Azfar Jamil"
                className={`md:hidden transition-all duration-300 ${isScrolled ? "w-8 h-8" : "w-10 h-10"
                  }`}
              />
            </button>
            <div className="flex items-center gap-4">
              <div className={`hidden md:flex items-center transition-all duration-300 ${isScrolled ? "space-x-6" : "space-x-8"
                }`}>
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`relative text-muted-foreground hover:text-foreground transition-all md:duration-1000 ease-out hover:scale-105 active:scale-95 group ${isScrolled ? "text-sm" : "text-base"
                      }`}
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                ))}
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden transition-all duration-300 hover:bg-accent/50 hover:scale-110 active:scale-95 ${isMobileMenuOpen ? 'bg-accent/30 animate-button-pulse' : ''
                  }`}
                onClick={handleMenuToggle}
              >
                <div className="relative">
                  <Menu className={`h-5 w-5 transition-all duration-300 ease-out ${isMobileMenuOpen ? 'rotate-180 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
                    }`} />
                  <X className={`h-5 w-5 absolute inset-0 transition-all duration-300 ease-out ${isMobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : 'rotate-180 scale-75 opacity-0'
                    }`} />
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-border/50 overflow-hidden"
              >
                <div className="px-4 py-3 space-y-1">
                  {navItems.map((item, index) => {
                    const icons: Record<string, typeof User> = {
                      About: User,
                      Projects: Briefcase,
                      Blog: FileText,
                      Contact: Mail
                    }
                    const IconComponent = icons[item.name]

                    if (!IconComponent) return null

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * (index + 1) }}
                        className="relative"
                      >
                        <a
                          href={item.href}
                          className="flex items-center px-3 py-2 text-sm font-medium rounded-[0.5rem] text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors relative z-10"
                          onClick={handleMenuItemClick}
                        >
                          <IconComponent className="w-4 h-4 mr-2" />
                          {item.name}
                        </a>
                      </motion.div>
                    )
                  })}
                  <a
                    href="mailto:azfarj09@gmail.com?subject=Portfolio Contact&body=Hi Azfar,%0D%0A%0D%0AI found your portfolio and would like to get in touch.%0D%0A%0D%0ABest regards,"
                    style={{
                      display: typeof window !== 'undefined' && window.innerHeight <= 296 ? 'none' : 'block'
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="pt-2 pb-2 cursor-pointer"
                    >
                      <div className="flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground hover:bg-primary/90 py-1.75 px-6 rounded-[0.5rem] font-semibold transition-colors">
                        <Mail className="w-4 h-4" />
                        Get In Touch
                      </div>
                    </motion.div>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </>
  )
}
