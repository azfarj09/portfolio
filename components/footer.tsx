import { Github, Linkedin, Mail } from "lucide-react"
import { links, navItems } from "@/lib/site-data"

export function Footer() {
  return (
    <footer className="footer band">
      <div className="wrap">
        <div className="footer__grid">
          {/* Brand & social */}
          <div>
            <h3 className="footer__brand">Azfar Jamil</h3>
            <p className="footer__blurb">
              Building digital experiences with passion and precision. Let's create something amazing together.
            </p>
            <div className="socials">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="GitHub"
              >
                <Github />
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
              <a href={links.mailto} className="icon-btn" aria-label="Email">
                <Mail />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__h">Contact</h4>
            <a href={links.mailto}>{links.email}</a>
            <p>Toronto, Ontario</p>
            <p>Discord: azfar222</p>
          </div>

          {/* Quick links */}
          <div className="footer__col">
            <h4 className="footer__h">Quick Links</h4>
            {navItems.map((item) => (
              <a key={item.name} href={item.href}>
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <p className="footer__legal">© 2025 Azfar Jamil. Built with Next.js and Tailwind CSS.</p>
      </div>

      {/* Oversized wordmark, cropped by the bottom of the page */}
      <div className="footer__mark" aria-hidden="true">
        Azfar Jamil
      </div>
    </footer>
  )
}
