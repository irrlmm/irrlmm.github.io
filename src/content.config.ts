import { glob, file } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

/**
 * FAKE DATABASE COLLECTIONS
 */

const checklistSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const valueSchema = z.object({
  label: z.string(),
  value: z.string(),
  href: z.optional(z.string()),
});

const factSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  image: z.optional(z.string()),
  tags: z.optional(z.array(reference("meta:tag"))),
});

const cardSchema = z.object({
  id: z.string(),
  label: z.optional(z.string()),
  value: z.optional(z.string()),
  icon: z.optional(z.string()),
  pre: z.optional(z.string()),
  post: z.optional(z.string()),
  description: z.optional(z.string()),
});

//
// Metadata schema
//

const tag = defineCollection({
  loader: file("./src/content/meta/tags.json"),
  schema: z.object({
    label: z.string(),
  }),
});

const person = defineCollection({
  loader: file("./src/content/meta/persons.json"),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    avatar: z.string(),
    birthDate: z.coerce.date(),
    currentJob: reference("meta:job"),
    location: z.object({
      country: z.string(),
      city: z.string(),
    }),
    email: z.string(),
    links: z.array(valueSchema),
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

const job = defineCollection({
  loader: file("./src/content/meta/jobs.json"),
  schema: z.object({
    company: reference("meta:company"),
    timeline: z.string(),
    title: z.string(),
    description: z.string(),
    scope: z.array(z.string()),
    isCurrent: z.optional(z.boolean()),
    linkNext: z.optional(z.boolean()),
  }),
});

//
// Work schema
//

const quiz = defineCollection({
  loader: glob({
    base: "./src/content/quizzes",
    pattern: "**/*.{md,mdx,json}",
  }),
  schema: z.object({
    endMessages: z.object({
      allCorrect: z.object({
        title: z.string(),
        text: z.string(),
      }),
      someCorrect: z.object({
        title: z.string(),
        text: z.string(),
      }),
    }),
    questions: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
        options: z.array(
          z.object({
            label: z.string(),
            response: z.object({
              type: z.enum(["positive", "negative"]),
              title: z.string(),
              text: z.string(),
            }),
          })
        ),
      })
    ),
  }),
});

const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx,json}" }),
  schema: z.object({
    coverImage: z.string(),
    date: z.coerce.date(),
    title: z.string(),
    subtitle: z.string(),
    client: z.optional(reference("meta:company")),
    overview: z.array(valueSchema),
    sections: z.array(
      z.object({
        title: z.optional(z.string()),
        lines: z.optional(z.array(z.string())),
        values: z.optional(z.array(valueSchema)),
        checklist: z.optional(z.array(checklistSchema)),
        facts: z.optional(z.array(factSchema)),
        image: z.optional(z.string()),
        separator: z.optional(z.boolean()),
      })
    ),
  }),
});

//
// Pages schemas
//

const about = defineCollection({
  loader: file("./src/content/about.json"),
  schema: z.object({
    title: z.string(),
    tag: z.optional(reference("meta:tag")),
    lead: z.array(z.string()),
    sections: z.array(
      z.object({
        title: z.optional(z.string()),
        lines: z.optional(z.array(z.string())),
        values: z.optional(z.array(valueSchema)),
        checklist: z.optional(z.array(checklistSchema)),
        facts: z.optional(z.array(factSchema)),
        cards: z.optional(z.array(cardSchema)),
        quiz: z.optional(reference("quiz")),
        separator: z.optional(z.boolean()),
      })
    ),
  }),
});

const cv = defineCollection({
  loader: file("./src/content/cv.json"),
  schema: z.object({
    person: reference("meta:person"),
    brief: z.array(valueSchema),
    skills: z.array(valueSchema),
    education: z.array(valueSchema),
    jobs: z.array(reference("meta:job")),
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
  quiz,
  "meta:tag": tag,
  "meta:person": person,
  "meta:company": company,
  "meta:job": job,
  "page:cv": cv,
  "page:about": about,
};
