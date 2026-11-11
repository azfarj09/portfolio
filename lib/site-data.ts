// Small pieces of site content that more than one component needs.

export const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
] as const

export const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "GraphQL",
  "Tailwind CSS",
] as const

export const links = {
  github: "https://github.com/azfarj09",
  linkedin: "https://www.linkedin.com/in/azfar-jamil-83b36a38b/",
  email: "azfarj09@gmail.com",
  mailto: "mailto:azfarj09@gmail.com",
  // Opens the visitor's mail app with a short intro already filled in
  mailtoIntro:
    "mailto:azfarj09@gmail.com?subject=Portfolio Contact&body=Hi Azfar,%0D%0A%0D%0AI found your portfolio and would like to get in touch.%0D%0A%0D%0ABest regards,",
} as const
