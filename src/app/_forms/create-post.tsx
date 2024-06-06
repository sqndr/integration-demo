"use client";

import { useReactForm } from "../_components/form";
import { postSchema, type PostSchema } from "../_schemas/post";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

export const CreatePostForm = () => {
  const router = useRouter();
  const form = useReactForm<PostSchema>({
    schema: postSchema,
    defaultValues: { name: "", body: "" },
  });

  const utils = api.useUtils();
  const createPostMutation = api.post.create.useMutation();

  const onSubmit = form.handleSubmit((data) => {
    createPostMutation.mutate(data, {
      async onSuccess() {
        await utils.post.invalidate();
        form.reset();
        router.refresh();
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="a cool new title" {...field} />
              </FormControl>
              <FormDescription>The title for the new post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea placeholder="a story ✌🏻" {...field} />
              </FormControl>
              <FormDescription>
                A cool textarea with no WYSIWYG editor; a developers dream.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit" disabled={createPostMutation.isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
