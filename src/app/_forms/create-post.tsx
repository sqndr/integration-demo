"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import { Form, useReactForm } from "../_components/form";
import { FormField } from "../_components/form-field";
import { postSchema, type PostSchema } from "../_schemas/post";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

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
        <FormField name="name" label="Name">
          <TextField.Root {...form.register("name")} />
        </FormField>

        <FormField name="body" label="Body">
          <TextArea size="3" {...form.register("body")} />
        </FormField>

        <div>
          <Button type="submit" disabled={createPostMutation.isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
