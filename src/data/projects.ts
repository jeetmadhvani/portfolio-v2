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
  year: string;
  description: string;
  media: ProjectMedia[];
}

const repeatedMedia = (src: string, alt: string): ProjectMedia[] => [
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
    year: "2026",
    description:
      "A CRM built for freelancers to manage leads, clients, tasks and follow ups in one place.",
    media: repeatedMedia(
      "/images/harbor.png",
      "Harbor CRM dashboard",
    ),
  },

  baithak: {
    number: "Nº002",
    name: "Baithak",
    category: "Web Design",
    stack: "React · Tailwind",
    year: "2026",
    description:
      "A fictional café website built around atmosphere, typography and a simple browsing experience.",
    media: repeatedMedia(
      "/images/baithak.png",
      "Baithak website",
    ),
  },

  scribe: {
    number: "Nº003",
    name: "Scribe",
    category: "Product Concept",
    stack: "React · Tailwind",
    year: "2026",
    description:
      "A writing tool concept that learns how you write and helps you create in your own voice.",
    media: repeatedMedia(
      "/images/scribe.png",
      "Scribe writing tool",
    ),
  },
};