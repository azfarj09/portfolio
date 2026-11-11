import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { PlayIcon } from "@/components/icons"
import { LiveAge } from "@/components/live-age"
import { links, technologies } from "@/lib/site-data"

/** Scrolling strip of technologies under the hero. Purely decorative. */
function Ticker() {
  // The list is rendered twice so the loop has no visible seam.
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[0, 1].map((copy) => (
          <div key={copy} className="ticker__group">
            {technologies.flatMap((tech) => [<span key={tech}>{tech}</span>, <i key={`${tech}-star`}>✦</i>])}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Hero({ age }: { age: number }) {
  return (
    <>
      <section
        id="hero"
        className="hero"
        aria-label="Introduction to Azfar Jamil, Full Stack Developer"
        itemScope
        itemType="https://schema.org/WPHeader"
      >
        <div className="wrap hero__grid">
          <div className="hero__meta">
            <p className="hero__role">Full Stack Developer</p>
            <p>Toronto, Ontario</p>
          </div>

          <div className="hero__title">
            <h1 className="hero__name">
              <span className="hero__line">
                <span>Azfar</span>
              </span>{" "}
              <span className="hero__line hero__line--serif">
                <span>
                  Jamil
                  <span className="hero__dot" aria-hidden="true">
                    .
                  </span>
                </span>
              </span>
            </h1>

            {/* Spinning sticker */}
            <div className="badge" aria-hidden="true">
              <svg className="badge__ring" viewBox="0 0 200 200">
                <defs>
                  <path id="hero-badge-ring" d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0" />
                </defs>
                <circle cx="100" cy="100" r="100" />
                <text>
                  <textPath href="#hero-badge-ring" textLength={470} lengthAdjust="spacing">
                    FROM YOUTUBE TUTORIALS • TO REAL PROJECTS •
                  </textPath>
                </text>
              </svg>
              <PlayIcon className="badge__play" />
            </div>
          </div>

          <div className="hero__aside">
            <p className="hero__lead">
              Hey! I'm a <LiveAge initial={age} />-year-old who fell in love with coding by watching YouTube tutorials.
              What started as curiosity turned into building real projects!
            </p>
            <p className="hero__sub">
              From <span className="hl">YouTube tutorials</span> to building awesome websites - proving age is just a
              number in coding!
            </p>

            <div className="hero__actions">
              <a href="#projects" className="btn btn--primary btn--down">
                View My Work
                <ArrowDown />
              </a>
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
                <a href={links.mailtoIntro} className="icon-btn" aria-label="Email">
                  <Mail />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker />
    </>
  )
}
