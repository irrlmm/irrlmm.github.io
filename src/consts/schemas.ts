import type { Person, WithContext } from "schema-dts";

export const SCHEMA_PERSON_MINI: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Igor Lemeshkin",
  jobTitle: "Product Designer",
  url: "https://irrlmm.me",
  sameAs: [
    "https://www.linkedin.com/in/irrlmm",
    "https://www.behance.net/irrlmm",
    "https://dribbble.com/irrlmm",
  ],
};

export const SCHEMA_PERSON_FULL: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Igor Lemeshkin",
  jobTitle: "Senior Product Designer",
  url: "https://irrlmm.github.io",
  sameAs: [
    "https://www.linkedin.com/in/irrlmm",
    "https://dribbble.com/irrlmm",
    "https://www.behance.net/irrlmm",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Senior Product Designer",
    skills: ["UX/UI Design", "Design Systems", "Product Design"],
  },
  worksFor: {
    "@type": "Organization",
    name: "iMusician",
    url: "https://imusician.pro",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Higher School of Economics",
    alternateName: "HSE",
    url: "https://www.hse.ru/en",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "Bachelor's Degree in Business Informatics",
  },
  knowsAbout: ["Design", "UX/UI Design", "Product Design", "Frontend"],
  skills: [
    "Figma",
    "Sketch",
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Rapid Prototyping",
    "Design",
    "Visual Design",
    "Icon Design",
    "Illustration Design",
    "UI Design",
    "UX Design",
    "Design Systems",
    "Product Design",
    "Interaction Design",
    "Frontend Development",
    "Collaboration",
    "Leadership",
    "Analytics",
  ],
  award: ["Winner of Microsoft Imagine Cup Hackathon"],
};
