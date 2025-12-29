import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

//
// Work schema
//

const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx,json}" }),
  schema: z.object({
    coverImage: z.string(),
    date: z.coerce.date(),
    title: z.string(),
    intro: z.string(),
    sections: z.array(
      z.object({
        title: z.optional(z.string()),
        paragraphs: z.optional(z.array(z.string())),
        images: z.optional(
          z.array(z.object({ src: z.string(), chip: z.optional(z.string()) }))
        ),
        separator: z.optional(z.boolean()),
      })
    ),
  }),
});

export const collections = { work };
