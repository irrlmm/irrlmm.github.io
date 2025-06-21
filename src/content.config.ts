import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

//
// Work schema
//

const work = defineCollection({
  loader: glob({ base: "./src/content", pattern: "**/*.{md,mdx,json}" }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    description: z.string(),
    longDescription: z.array(z.string()),
    sections: z.array(
      z.object({
        title: z.optional(z.string()),
        text: z.optional(z.array(z.string())),
        image: z.optional(
          z.object({
            src: z.string(),
            description: z.optional(z.string()),
          })
        ),
      })
    ),
  }),
});

export const collections = { work };
