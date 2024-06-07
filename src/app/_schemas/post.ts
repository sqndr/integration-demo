import * as z from "zod";

export const postSchema = z.object({
  name: z.string().min(3),
  body: z.string().min(3),
});

export type PostSchema = z.infer<typeof postSchema>;
