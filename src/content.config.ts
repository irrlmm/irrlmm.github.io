import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, reference } from "astro:content";

//
// Collections

const work = defineCollection({
  loader: glob({
    base: "./content/work",
    pattern: "**/*.{md,mdx,json}",
  }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    coverImage: z.string(),
    org: reference("orgs"),
    theme: z.tuple([z.string(), z.string()]).optional(),
    draft: z.boolean().optional(),
    tag: z.enum([
      "design system",
      "growth",
      "onboarding",
      "revenue",
      "concept",
      "task completion",
      "trust",
      "mobile",
      "ai",
      "personalization",
      "engagement",
    ]),
  }),
});

const artifacts = defineCollection({
  loader: glob({
    base: "./content/artifacts",
    pattern: "**/*.{md,mdx,json}",
  }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    type: z.enum(["article", "stack"]).optional(),
    images: z.array(z.string()).min(1).optional(),
    draft: z.boolean().optional(),
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
    updated: z.string().optional(),
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

export const collections = {
  orgs,
  work,
  artifacts,
  pages,
};
