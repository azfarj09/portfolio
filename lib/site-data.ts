// Small pieces of site content that more than one component needs.

export const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
] as const

// Grouped for the "Technologies I work with" list in the About section
export const techGroups = [
  { name: "Languages", items: ["JavaScript", "TypeScript", "Python"] },
  { name: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { name: "Backend", items: ["Node.js", "GraphQL"] },
  { name: "Databases", items: ["PostgreSQL", "MongoDB"] },
  { name: "Cloud & tools", items: ["AWS", "Docker"] },
] as const

export const technologies = techGroups.flatMap((group) => group.items)

export const links = {
  github: "https://github.com/azfarj09",
  linkedin: "https://www.linkedin.com/in/azfar-jamil-83b36a38b/",
  email: "azfarj09@gmail.com",
  mailto: "mailto:azfarj09@gmail.com",
  // Opens the visitor's mail app with a short intro already filled in
  mailtoIntro:
    "mailto:azfarj09@gmail.com?subject=Portfolio Contact&body=Hi Azfar,%0D%0A%0D%0AI found your portfolio and would like to get in touch.%0D%0A%0D%0ABest regards,",
} as const
