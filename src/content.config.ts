import { glob } from "astro/loaders";
import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";

//
// Schemas

const schemaRole = z.object({
  role: z.string(),
  org: reference("orgs"),
  dateStart: z.coerce.date(),
  dateEnd: z.coerce.date(),
  experience: z.array(z.string()).optional(),
  type: z.string().optional(),
});

//
// Collections

const work = defineCollection({
  loader: glob({
    base: "./content/work",
    pattern: "**/*.{md,mdx,json}",
  }),
  schema: z.object({
    title: z.string(),
    coverImage: z.string(),
    org: reference("orgs"),
    tags: z.array(
      z.enum([
        "design system",
        "growth",
        "onboarding",
        "revenue",
        "concept",
        "task completion",
        "ai",
      ]),
    ),
    date: z.coerce.date(),
  }),
});

const blog = defineCollection({
  loader: glob({
    base: "./content/blog",
    pattern: "**/*.{md,mdx,json}",
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});

const pages = defineCollection({
  loader: glob({
    base: "./content/pages",
    pattern: "**/*.{md,mdx,json}",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const orgs = defineCollection({
  loader: glob({
    base: "./content/orgs",
    pattern: "**/*.{md,mdx,json}",
  }),
  schema: z.object({
    name: z.string(),
    countryCode: z.string(),
    img: z.string(),
    description: z.string().optional(),
  }),
});

const users = defineCollection({
  loader: glob({
    base: "./content/users",
    pattern: "**/*.json",
  }),
  schema: z.object({
    name: z.string(),
    email: z.string(),
    birthday: z.coerce.date(),
    cv: z.object({
      description: z.string(),
      roles: z.array(z.array(reference("cv:roles"))),
      education: z.array(reference("cv:education")),
      projects: z.array(reference("cv:projects")),
    }),
  }),
});

const cvEducation = defineCollection({
  loader: glob({
    base: "./content/cv/education",
    pattern: "**/*.json",
  }),
  schema: schemaRole,
});

const cvRoles = defineCollection({
  loader: glob({
    base: "./content/cv/roles",
    pattern: "**/*.json",
  }),
  schema: schemaRole,
});

const cvProjects = defineCollection({
  loader: glob({
    base: "./content/cv/projects",
    pattern: "**/*.json",
  }),
  schema: schemaRole,
});

export const collections = {
  users,
  orgs,
  work,
  blog,
  pages,
  "cv:education": cvEducation,
  "cv:roles": cvRoles,
  "cv:projects": cvProjects,
};
