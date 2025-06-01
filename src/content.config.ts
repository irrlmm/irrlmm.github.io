import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

//
// Work schema
//

const work = defineCollection({
  loader: glob({ base: "./src/content", pattern: "**/*.{md,mdx,json}" }),
  schema: z.object({
    date: z.coerce.date(),
    type: z.enum(["case study", "story"]),
    title: z.string(),
    description: z.string(),
    // sections: z.array(
    //   z.object({
    //     title: z.optional(z.string()),
    //     lines: z.optional(z.array(z.string())),
    //     values: z.optional(
    //       z.array(
    //         z.object({
    //           label: z.string(),
    //           value: z.string(),
    //           href: z.optional(z.string()),
    //         })
    //       )
    //     ),
    //     image: z.optional(z.string()),
    //   })
    // ),
  }),
});

export const collections = { work };
