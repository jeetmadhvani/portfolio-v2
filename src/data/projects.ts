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

export const projects: Record<string, Project> = {
  harbor: {
    number: "Nº001",
    name: "Harbor",
    category: "Product / CRM",
    stack: "React · TypeScript · Tailwind",
    image: "/project-media/harbor-dashboard.png",
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

    media: [
      {
        type: "image",
        src: "/project-media/harbor-dashboard.png",
        alt: "Harbor CRM dashboard",
      },
      {
        type: "image",
        src: "/project-media/harbor-leads.png",
        alt: "Harbor CRM leads",
      },
      {
        type: "image",
        src: "/project-media/harbor-pipeline.png",
        alt: "Harbor CRM pipeline",
      },
      {
        type: "image",
        src: "/project-media/harbor-lead-details.png",
        alt: "Harbor CRM lead details",
      },
      {
        type: "image",
        src: "/project-media/harbor-new-lead.png",
        alt: "Harbor CRM new lead",
      },
    ],
  },

  baithak: {
    number: "Nº002",
    name: "Baithak",
    category: "Web Design",
    stack: "React · TypeScript · Tailwind",
    image: "/project-media/baithak-hero.png",
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

    media: [
      {
        type: "image",
        src: "/project-media/baithak-hero.png",
        alt: "Baithak café website hero",
      },
      {
        type: "image",
        src: "/project-media/baithak-menu.png",
        alt: "Baithak café menu",
      },
      {
        type: "image",
        src: "/project-media/baithak-weekly.png",
        alt: "Baithak weekly events section",
      },
      {
        type: "image",
        src: "/project-media/baithak-location.png",
        alt: "Baithak location section",
      },
      {
        type: "image",
        src: "/project-media/baithak-footer.png",
        alt: "Baithak café closing section",
      },
    ],
  },

  scribe: {
    number: "Nº003",
    name: "Scribe",
    category: "Product Concept",
    stack: "React · TypeScript · Tailwind",
    image: "/project-media/scribe-hero.png",
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

    media: [
      {
        type: "image",
        src: "/project-media/scribe-waitinglist.png",
        alt: "Scribe product concept",
      },
      {
        type: "image",
        src: "/project-media/scribe-hero.png",
        alt: "Scribe landing page hero",
      },
      {
        type: "image",
        src: "/project-media/scribe-howitworks.png",
        alt: "Scribe how it works section",
      },
      {
        type: "image",
        src: "/project-media/scribe-testimonials.png",
        alt: "Scribe creator testimonials",
      },
    ],
  },
};