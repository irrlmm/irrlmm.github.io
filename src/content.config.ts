import { glob, file } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

/**
 * FAKE DATABASE COLLECTIONS
 */

const work = defineCollection({
  // Load Markdown and MDX files in the `src/content/work/` directory.
  loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx,json}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    coverImage: z.string(),
    date: z.coerce.date(),
    timeline: z.string(),
    client: z.nullable(reference("company")),
    role: z.nullable(z.string()),
    title: z.string(),
    subtitle: z.string(),
    sections: z.array(
      z.object({
        title: z.string(),
        lines: z.optional(z.array(z.string())),
        values: z.optional(
          z.array(
            z.object({
              label: z.string(),
              value: z.object({
                text: z.string(),
                href: z.optional(z.string()),
              }),
            })
          )
        ),
      })
    ),
  }),
});

const company = defineCollection({
  loader: file("./src/content/companies.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    logo: z.string(),
    href: z.optional(z.string()),
  }),
});

const job = defineCollection({
  loader: file("./src/content/jobs.json"),
  schema: z.object({
    id: z.string(),
    company: reference("company"),
    timeline: z.string(),
    title: z.string(),
    description: z.string(),
    scope: z.array(z.string()),
    isCurrent: z.optional(z.boolean()),
    linkNext: z.optional(z.boolean()),
  }),
});

export const collections = { work, company, job };
