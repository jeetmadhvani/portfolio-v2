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
      "A simple CRM designed to help freelancers manage leads, clients, and follow ups in one place.",
    link: "/work/harbor",

    visual: {
      background: "#E8E8E8",
      accent: "#111111",
      label: "CRM / PRODUCT",
    },

    caseStudy: {
      problem:
        "Freelancers need a clearer way to keep track of leads and client work.",

      approach:
        "I designed Harbor around a clean dashboard that keeps important client information and next steps easy to see.",

      role: "Product design + frontend development",
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
      "A café website designed to bring the warmth and character of the space online.",
    link: "/work/baithak",

    visual: {
      background: "#C9B39A",
      accent: "#241B16",
      label: "HOSPITALITY / WEB",
    },

    caseStudy: {
      problem:
        "The website needed to capture the atmosphere of the café, not just present information.",

      approach:
        "I used photography, typography, and spacious layouts to make the digital experience feel as warm as the physical space.",

      role: "UI design + frontend development",
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
      "A writing tool concept that learns your writing style and helps you create in your own voice.",
    link: "/work/scribe",

    visual: {
      background: "#D9D5CC",
      accent: "#161616",
      label: "AI / PRODUCT",
    },

    caseStudy: {
      problem:
        "AI generated writing often feels generic and loses the personality of the person using it.",

      approach:
        "I designed Scribe around learning from your existing writing so generated content feels more personal and natural.",

      role: "Product concept + UI design + frontend",
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
