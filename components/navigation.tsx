"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

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
        setIsMobileMenuOpen(false)
        setIsClosing(false)
      }, 300)
    } else {
      setIsMobileMenuOpen(true)
    }
  }

  const handleMenuItemClick = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsMobileMenuOpen(false)
      setIsClosing(false)
    }, 200)
  }

  return (
    <>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className={`fixed inset-0 bg-background/20 backdrop-blur-sm z-40 md:hidden ${isClosing ? 'animate-overlay-fade-out' : 'animate-overlay-fade-in'
            }`}
          onClick={handleMenuToggle}
        />
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out">
        <div
          className={`transition-all duration-500 ease-out mx-auto max-w-[calc(100%-2rem)] md:max-w-7xl mx-4 px-6 md:px-6 py-3 md:py-4 ${isScrolled
              ? "md:!max-w-4xl !mt-4 !py-2 md:!py-3 bg-background/90 backdrop-blur-md border border-border rounded-full shadow-lg"
              : "bg-transparent"
            }`}
        >
          <div className="flex items-center justify-between">
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
                    className={`relative text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 active:scale-95 group ${isScrolled ? "text-sm" : "text-base"
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
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden ${isMobileMenuOpen && !isClosing ? 'max-h-96' : 'max-h-0'
          } transition-all duration-500 ease-out`}>
          <div className={`transform transition-all duration-400 ${isMobileMenuOpen && !isClosing
              ? 'animate-slide-down-bounce'
              : isClosing
                ? 'animate-slide-up-bounce'
                : 'opacity-0 scale-95 -translate-y-4'
            } max-w-[calc(100%-2rem)] mx-auto mt-2 mx-4 px-6 py-6 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-xl`}>
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:shadow-md transition-all duration-300 py-3 px-4 rounded-xl font-medium transform hover:translate-x-2 hover:scale-105 active:scale-95 ${isMobileMenuOpen && !isClosing
                      ? 'animate-menu-item-slide opacity-100'
                      : isClosing
                        ? 'animate-menu-item-slide-out'
                        : 'opacity-0 translate-x-[-30px]'
                    }`}
                  style={{
                    animationDelay: isMobileMenuOpen && !isClosing ? `${index * 80 + 100}ms` : `${(navItems.length - index - 1) * 50}ms`
                  }}
                  onClick={handleMenuItemClick}
                >
                  <span className="relative">
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
