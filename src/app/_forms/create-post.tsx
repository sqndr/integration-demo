"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import { Form, useReactForm } from "../_components/form";
import { FormField } from "../_components/form-field";
import { postSchema, type PostSchema } from "../_schemas/post";

export const CreatePostForm = () => {
  const form = useReactForm<PostSchema>({
    schema: postSchema,
    defaultValues: { title: "", body: "" },
  });

  const onSubmit = form.handleSubmit((data) => console.log(data));

  return (
    <Form {...form}>
      <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormField name="title" label="Title">
          <TextField.Root {...form.register("title")} />
        </FormField>

        <FormField name="body" label="Body">
          <TextArea size="3" {...form.register("body")} />
        </FormField>

        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
