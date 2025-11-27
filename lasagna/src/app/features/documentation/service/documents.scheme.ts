import {z} from 'zod';

export const DocumentDataScheme = z.object({
  data: z.object({
    title: z.string(),
    order: z.number().optional(),
  }),
  html: z.string(),
  language: z.string().length(2),
  name: z.string(),
  order: z.number(),
  path: z.string(),
  title: z.string(),
  type: z.string(),
});

export const DocumentThreeScheme = z.object({
  data: z.object({
    title: z.string(),
    order: z.number().optional(),
  }),
  language: z.string().length(2),
  name: z.string(),
  order: z.number(),
  path: z.string(),
  title: z.string(),
  type: z.string(),
});

export const DocumentMetaScheme = z.object({
  updatedAt: z.number(),
});

const DocumentsDataEntryScheme = z.object({
  key: z.literal('data'),
  value: z.array(DocumentDataScheme),
});

const DocumentsTreeEntryScheme = z.object({
  key: z.literal('tree'),
  value: z.array(
    z.object({
      children: z.array(DocumentThreeScheme),
      name: z.string(),
      type: z.string(),
    })
  ),
});

const DocumentsFAQTreeEntryScheme = z.object({
  key: z.literal('tree'),
  value: z.array(DocumentThreeScheme),
});

const DocumentsMetaEntryScheme = z.object({
  key: z.literal('meta'),
  value: DocumentMetaScheme,
});

export const DocumentsScheme = z.union([
  DocumentsDataEntryScheme,
  DocumentsTreeEntryScheme,
  DocumentsFAQTreeEntryScheme,
  DocumentsMetaEntryScheme,
]);
