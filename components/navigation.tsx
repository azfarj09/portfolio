"use client"

import { useEffect, useState } from "react"
import { Mail, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { links, navItems } from "@/lib/site-data"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // While the mobile menu is open: lock page scroll, close on Escape,
  // and close if the window grows back to the desktop layout.
  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth > 820) setIsMenuOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)
    window.addEventListener("resize", handleResize)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("resize", handleResize)
    }
  }, [isMenuOpen])

  const scrollToTop = () => {
    setIsMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <header className={`nav${isScrolled ? " is-scrolled" : ""}${isMenuOpen ? " is-open" : ""}`}>
        <div className="nav__inner">
          <button type="button" className="brand" onClick={scrollToTop}>
            Azfar Jamil
          </button>

          <div className="nav__right">
            <nav
              className="nav__links"
              aria-label="Main navigation"
              itemScope
              itemType="https://schema.org/SiteNavigationElement"
            >
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="nav__link">
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="nav__tools">
              <ThemeToggle />
              <button
                type="button"
                className="icon-btn nav__burger"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <Menu className="icon-menu" />
                <X className="icon-close" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen menu for small screens */}
      <div id="mobile-menu" className={`menu${isMenuOpen ? " is-open" : ""}`} aria-hidden={!isMenuOpen}>
        <ul className="menu__list">
          {navItems.map((item, index) => (
            <li key={item.name}>
              <a href={item.href} className="menu__link" onClick={() => setIsMenuOpen(false)}>
                <span className="menu__num">{String(index + 1).padStart(2, "0")}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <a href={links.mailtoIntro} className="btn btn--primary menu__cta">
          <Mail />
          Get In Touch
        </a>
      </div>
    </>
  )
}
