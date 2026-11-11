import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Blog } from "@/components/blog"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { calculateAge } from "@/lib/utils"

export default function Home() {
  // Worked out once here so the server-rendered HTML and the browser agree;
  // the components then keep it up to date on the client.
  const age = calculateAge()

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">
        <Hero age={age} />
        <About />
        <Projects />
        <Blog age={age} />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
