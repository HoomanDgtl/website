import { defineCollection, z } from "astro:content";

export const developmentSchema = defineCollection({
  schema: ({ image }) => {
    return z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      centeredHeader: z.boolean().optional().default(false),
      hideHeader: z.boolean().optional().default(false),
    });
  },
});
