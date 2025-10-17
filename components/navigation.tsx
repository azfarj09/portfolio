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
    <>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
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
              className={`md:hidden transition-all duration-200 hover:bg-accent/50 ${
                isMobileMenuOpen ? 'bg-accent/30' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative">
                <Menu className={`h-5 w-5 transition-all duration-200 ${
                  isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`} />
                <X className={`h-5 w-5 absolute inset-0 transition-all duration-200 ${
                  isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                }`} />
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`transition-all duration-300 ${
          isScrolled 
            ? "max-w-4xl mx-auto mt-2 px-6 py-6 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-xl" 
            : "mx-6 mt-2 px-6 py-6 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-xl"
        }`}>
          <div className="flex flex-col space-y-1">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 py-3 px-4 rounded-lg font-medium transform hover:translate-x-1 ${
                  isMobileMenuOpen ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}
