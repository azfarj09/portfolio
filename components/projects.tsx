"use client"

import { useCallback, useState } from "react"
import { ArrowUpRight, Github } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { TicTacToeDemo } from "./tic-tac-toe-demo"
import { Notification } from "./notification"
import projects from "./projects.json"

export function Projects() {
  const [showTicTacToe, setShowTicTacToe] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const hideNotification = useCallback(() => setShowNotification(false), [])

  // Tic Tac Toe opens a playable demo, the portfolio is the page you're on,
  // and everything else links out to its live site.
  const renderLiveDemo = (project: (typeof projects)[number]) => {
    const className = "btn btn--primary btn--sm btn--out"
    const label = (
      <>
        Live Demo
        <ArrowUpRight />
      </>
    )

    if (project.title === "Tic Tac Toe Game") {
      return (
        <button type="button" className={className} onClick={() => setShowTicTacToe(true)}>
          {label}
        </button>
      )
    }

    if (project.title === "Portfolio Website") {
      return (
        <button type="button" className={className} onClick={() => setShowNotification(true)}>
          {label}
        </button>
      )
    }

    return (
      <a href={project.live} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    )
  }

  return (
    <section
      id="projects"
      className="section section--raised"
      aria-labelledby="projects-heading"
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      <div className="wrap">
        <Reveal as="header" className="sec-head">
          <p className="eyebrow">
            <span className="eyebrow__num">02</span>
            Projects
          </p>
          <h2 id="projects-heading" className="sec-title">
            My <em>Projects</em>
          </h2>
          <p className="sec-intro">
            Here are some projects I've built while learning to code! Each one taught me something new and helped me
            grow as a developer.
          </p>
        </Reveal>

        <ol className="projects">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.title} className="project">
              <div className="project__media">
                <div className="frame">
                  <div className="frame__bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span>{project.title}</span>
                  </div>
                  <img src={project.image || "/placeholder.svg"} alt={project.title} loading="lazy" />
                </div>
              </div>

              <div className="project__body">
                <span className="project__num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="project__title">{project.title}</h3>
                <p className="project__desc">{project.description}</p>

                <ul className="tags">
                  {project.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <div className="project__actions">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
                    <Github />
                    Code
                  </a>
                  {renderLiveDemo(project)}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* Tic Tac Toe Demo Modal */}
      <TicTacToeDemo isOpen={showTicTacToe} onClose={() => setShowTicTacToe(false)} />

      {/* Portfolio Notification */}
      <Notification message="You are already on this website!" isVisible={showNotification} onHide={hideNotification} />
    </section>
  )
}
