export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt?: string;
}

export interface Project {
  number: string;
  name: string;
  category: string;
  stack: string;
  image: string;
  description: string;
  link: string;

  visual: {
    background: string;
    accent: string;
    label: string;
  };

  caseStudy: {
    problem: string;
    approach: string;
    role: string;
  };

  media: ProjectMedia[];
  year: string;
}

const repeatedMedia = (
  src: string,
  alt: string,
): ProjectMedia[] => [
  { type: "image", src, alt },
  { type: "image", src, alt },
  { type: "image", src, alt },
  { type: "image", src, alt },
  { type: "image", src, alt },
  { type: "image", src, alt },
];

export const projects: Record<string, Project> = {
  harbor: {
    number: "Nº001",
    name: "Harbor",
    category: "Product / CRM",
    stack: "React · TypeScript · Tailwind",
    image: "/images/harbor.png",
    description:
      "A CRM built for freelancers to manage leads, clients, tasks, and follow ups in one place.",
    link: "/work/harbor",

    visual: {
      background: "#E8E8E8",
      accent: "#111111",
      label: "CRM / PRODUCT",
    },

    caseStudy: {
      problem:
        "Freelancers often have leads, tasks and client information scattered across different tools.",

      approach:
        "Harbor brings the client workflow into one focused interface, keeping leads, follow ups and tasks visible without adding unnecessary complexity.",

      role:
        "Product design + frontend development",
    },

    year: "2026",

    media: repeatedMedia(
      "/images/harbor.png",
      "Harbor CRM dashboard",
    ),
  },

  baithak: {
    number: "Nº002",
    name: "Baithak",
    category: "Web Design",
    stack: "React · TypeScript · Tailwind",
    image: "/images/baithak.png",
    description:
      "A fictional café website built around atmosphere, typography, and a simple browsing experience.",
    link: "/work/baithak",

    visual: {
      background: "#C9B39A",
      accent: "#241B16",
      label: "HOSPITALITY / WEB",
    },

    caseStudy: {
      problem:
        "The goal was to create a café website that felt atmospheric without making the browsing experience complicated.",

      approach:
        "The design uses typography, spacing and restrained motion to make the brand feel present while keeping the menu and information easy to reach.",

      role:
        "UI design + frontend development",
    },

    year: "2026",

    media: repeatedMedia(
      "/images/baithak.png",
      "Baithak café website",
    ),
  },

  scribe: {
    number: "Nº003",
    name: "Scribe",
    category: "Product Concept",
    stack: "React · TypeScript · Tailwind",
    image: "/images/scribe.png",
    description:
      "An exploration into a writing tool that learns how you write and helps you create in your own voice.",
    link: "/work/scribe",

    visual: {
      background: "#D9D5CC",
      accent: "#161616",
      label: "AI / PRODUCT",
    },

    caseStudy: {
      problem:
        "Most writing tools help generate text, but don't necessarily preserve the way an individual actually writes.",

      approach:
        "Scribe explores a writing workflow where the system learns from a user's existing writing and uses it as the foundation for generation.",

      role:
        "Product concept + UI design + frontend",
    },

    year: "2026",

    media: repeatedMedia(
      "/images/scribe.png",
      "Scribe writing tool",
    ),
  },
};