import { z } from 'zod';

export const BlogPostMetaScheme = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  keywords: z.string(),
  date: z.string(),
  lang: z.string().length(2),
  image: z.string().nullable().optional(),
});

export const BlogPostFullScheme = BlogPostMetaScheme.extend({
  html: z.string(),
});

export type BlogPostMeta = z.infer<typeof BlogPostMetaScheme>;
export type BlogPostFull = z.infer<typeof BlogPostFullScheme>;