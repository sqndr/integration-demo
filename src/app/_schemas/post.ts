import * as z from "zod";

export const postSchema = z.object({
  name: z.string().min(1),
  body: z.string(),
});

export type PostSchema = z.infer<typeof postSchema>;
