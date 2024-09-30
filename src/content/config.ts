// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
// 2. Define your collection(s)
const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      isDraft: z.boolean(),
      title: z.string(),
      metaTitle: z.string(),
      metaDescription: z.string(),
      schemaDescription: z.string(),
      subtitle: z.string().optional().describe('Sits below the title on posts'),
      summary: z
        .string()
        .max(400)
        .describe('A short summary of the post used in the blog index'),
      // In frontmatter, dates written without quotes around them are interpreted as Date objects
      publishDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      heroImage: image()
        .refine((img) => img.width >= 1080, {
          message: 'Cover image must be at least 1080 pixels wide!',
        })
        .optional(),
      alt: z.string().optional().describe('Alt text for the hero image'),
      socialImage: z
        .string()
        .optional()
        .describe('Image used when sharing on social media'),
      keywords: z
        .array(z.string())
        .optional()
        .describe('Keywords for schema.org tags'),
    }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blog: blogCollection,
};
