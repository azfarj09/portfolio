import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"
import { TechPill } from "@/components/tech-pill"
import { techGroups, technologies } from "@/lib/site-data"

// The three chapters of the journey, in order.
const journey: { name: string; text: ReactNode }[] = [
  {
    name: "Scratch",
    text: (
      <>
        My coding journey started with <span className="hl">Scratch</span> when I was younger, learning the basics of
        programming logic through visual blocks. This foundation sparked my curiosity and led me to explore real
        programming languages.
      </>
    ),
  },
  {
    name: "Python",
    text: (
      <>
        I then dove into <span className="hl">Python</span> as my first text-based language, following tutorials from
        amazing YouTubers like <span className="hl">Bro Code</span> and <span className="hl">Dave Gray</span>. Their
        clear explanations and hands-on approach made complex concepts feel achievable.
      </>
    ),
  },
  {
    name: "Web development",
    text: (
      <>
        From there, I discovered web development and learned <span className="hl">HTML, CSS, and JavaScript</span>.
        The ability to create interactive websites fascinated me, and I continued expanding my skills with frameworks
        like React and Next.js. Each new technology opened up more possibilities for bringing ideas to life.
      </>
    ),
  },
]

const twoDigits = (n: number) => String(n).padStart(2, "0")

export function About() {
  return (
    <section
      id="about"
      className="section"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="wrap">
        <Reveal as="header" className="sec-head">
          <p className="eyebrow">
            <span className="eyebrow__num">01</span>
            About
          </p>
          <h2 id="about-heading" className="sec-title">
            My Coding <em>Journey</em>
          </h2>
        </Reveal>

        <ol className="journey">
          {journey.map((step, index) => (
            <Reveal as="li" key={step.name} className="journey__step">
              <div className="journey__label">
                <span className="journey__num" aria-hidden="true">
                  {twoDigits(index + 1)}
                </span>
                <h3 className="journey__name">{step.name}</h3>
              </div>
              <p className="journey__text">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <div className="stack">
          <Reveal as="h3" className="stack__title">
            Technologies I <em>work with</em>
            <sup className="stack__count" aria-hidden="true">
              ({technologies.length})
            </sup>
          </Reveal>

          <div className="stack__rows">
            {techGroups.map((group, groupIndex) => (
              <Reveal key={group.name} className="stack__row" delay={groupIndex * 70}>
                <h4 className="stack__group">{group.name}</h4>
                <ul className="stack__names">
                  {group.items.map((tech) => (
                    <TechPill key={tech} name={tech} />
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
