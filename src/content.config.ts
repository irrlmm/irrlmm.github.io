import { glob, file } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

/**
 * FAKE DATABASE COLLECTIONS
 */

const valueSchema = z.object({
  label: z.string(),
  value: z.string(),
  href: z.optional(z.string()),
});

const cardSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.optional(z.string()),
  pre: z.optional(z.string()),
  post: z.optional(z.string()),
  description: z.string(),
});

//
// Metadata schema
//

const person = defineCollection({
  loader: file("./src/content/meta/persons.json"),
  schema: z.object({
    name: z.string(),
    jobTitle: z.string(),
    avatar: z.string(),
  }),
});

const company = defineCollection({
  loader: file("./src/content/meta/companies.json"),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    href: z.optional(z.string()),
  }),
});

//
// Work schema
//

const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx,json}" }),
  schema: z.object({
    coverImage: z.string(),
    date: z.coerce.date(),
    title: z.string(),
    subtitle: z.string(),
    client: z.optional(reference("meta:company")),
    overview: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        href: z.optional(z.string()),
      })
    ),
    sections: z.array(
      z.object({
        title: z.string(),
        lines: z.optional(z.array(z.string())),
        values: z.optional(z.array(valueSchema)),
        cards: z.optional(z.array(cardSchema)),
      })
    ),
  }),
});

//
// Pages schemas
//

const about = defineCollection({
  loader: file("./src/content/page/about.json"),
  schema: z.object({
    title: z.string(),
    lead: z.array(z.string()),
    sections: z.array(
      z.object({
        title: z.string(),
        cards: z.optional(z.array(cardSchema)),
        lines: z.optional(z.array(z.string())),
        separator: z.optional(z.boolean()),
      })
    ),
  }),
});

const cv = defineCollection({
  loader: file("./src/content/page/cv.json"),
  schema: z.object({
    person: reference("meta:person"),
    brief: z.array(valueSchema),
    skills: z.array(valueSchema),
    education: z.array(valueSchema),
    jobs: z.array(
      z.object({
        company: reference("meta:company"),
        timeline: z.string(),
        title: z.string(),
        description: z.string(),
        scope: z.array(z.string()),
        isCurrent: z.optional(z.boolean()),
        linkNext: z.optional(z.boolean()),
      })
    ),
    competitions: z.array(
      z.object({
        title: z.string(),
        values: z.array(valueSchema),
      })
    ),
  }),
});

export const collections = {
  work,
  "meta:person": person,
  "meta:company": company,
  "page:cv": cv,
  "page:about": about,
};
