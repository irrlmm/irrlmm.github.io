import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, reference } from "astro:content";

//
// Collections

const themeModeSchema = z.object({
  "surface-container": z.string(),
  background: z.string(),
  surface: z.string(),
  "on-surface": z.string(),
  outline: z.string(),
  primary: z.string(),
  "on-primary": z.string(),
  shadow: z.string(),
});

const work = defineCollection({
  loader: glob({
    base: "./content/work",
    pattern: "**/*.{md,mdx,json}",
  }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    coverImage: z.string(),
    draft: z.boolean().optional(),
    org: reference("orgs"),
    theme: z
      .object({
        light: themeModeSchema,
        dark: themeModeSchema,
      })
      .optional(),
    role: z.string(),
    engagement: z.string(),
    duration: z.string(),
    team: z.string(),
    impact: z.string(),
    tag: z.enum([
      "saas",
      "b2b",
      "design system",
      "design systems",
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
  schema: z.discriminatedUnion("type", [
    z.object({
      date: z.coerce.date(),
      title: z.string(),
      draft: z.boolean().optional(),
      type: z.literal("note"),
      theme: z
        .object({
          light: themeModeSchema,
          dark: themeModeSchema,
        })
        .optional(),
    }),
    z.object({
      date: z.coerce.date(),
      title: z.string(),
      draft: z.boolean().optional(),
      type: z.literal("stack"),
      images: z.array(z.string()).min(1),
      theme: z
        .object({
          light: themeModeSchema,
          dark: themeModeSchema,
        })
        .optional(),
    }),
  ]),
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
