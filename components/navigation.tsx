"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out">
      <div 
        className={`transition-all duration-500 ease-out ${
          isScrolled 
            ? "max-w-4xl mx-auto mt-4 px-6 py-3 bg-background/90 backdrop-blur-md border border-border rounded-full shadow-lg" 
            : "max-w-7xl mx-auto px-6 py-4 bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className={`font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent transition-all duration-300 hover:scale-105 cursor-pointer ${
              isScrolled ? "text-lg" : "text-xl"
            }`}
          >
            Azfar Jamil
          </button>
          <div className="flex items-center gap-4">
            <div className={`hidden md:flex items-center transition-all duration-300 ${
              isScrolled ? "space-x-6" : "space-x-8"
            }`}>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-muted-foreground hover:text-foreground transition-all duration-200 ${
                    isScrolled ? "text-sm" : "text-base"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden transition-all duration-300 ${
          isScrolled 
            ? "max-w-4xl mx-auto mt-2 px-6 py-4 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-lg" 
            : "bg-background/95 backdrop-blur-md border-b border-border"
        }`}>
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
