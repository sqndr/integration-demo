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
import { ActionDialog } from "~/components/action-dialog";
import { Icon, EditIcon } from "../_components/icon";
import { useQueryState } from "nuqs";
import { ACTION_VALUE_PARAM_NAME } from "~/lib/actions";
import dynamic from "next/dynamic";

export const CreatePostForm = () => {
  const router = useRouter();
  const form = useReactForm<PostSchema>({
    schema: postSchema,
    defaultValues: { name: "", body: "" },
  });

  const [activeAction, setActiveAction] = useQueryState(
    ACTION_VALUE_PARAM_NAME,
  );

  const utils = api.useUtils();
  const createPostMutation = api.post.create.useMutation();

  const onSubmit = form.handleSubmit((data) => {
    createPostMutation.mutate(data, {
      async onSuccess() {
        await utils.post.invalidate();
        form.reset();
        await setActiveAction(null);
        router.refresh();
      },
    });
  });

  return (
    <ActionDialog action="create-post">
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
    </ActionDialog>
  );
};

export const DynamicCreatePost = dynamic(
  () => Promise.resolve(CreatePostForm),
  {
    ssr: false,
  },
);

export const OpenCreatePostDialog = () => {
  const [activeAction, setActiveAction] = useQueryState(
    ACTION_VALUE_PARAM_NAME,
  );
  const handleClick = async () => {
    await setActiveAction("create-post");
  };

  return (
    <>
      <Button onClick={handleClick}>
        <Icon>
          <EditIcon />
        </Icon>
      </Button>
      {activeAction === "create-post" && <DynamicCreatePost />}
    </>
  );
};
