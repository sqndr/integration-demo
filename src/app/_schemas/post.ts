import * as z from "zod";

export const postSchema = z.object({
  title: z.string().min(1),
  body: z.string(),
  tags: z.array(z.string()).optional(),
});

export type PostSchema = z.infer<typeof postSchema>;
