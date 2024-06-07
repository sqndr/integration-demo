"use client";

import { Heading } from "@radix-ui/themes";
import { api } from "~/trpc/react";
import {
  CreatePostForm,
  DynamicCreatePost,
  OpenCreatePostDialog,
} from "./_forms/create-post";
import { DeleteButton } from "./delete-button";

export default function Home() {
  const { isLoading, data: posts } = api.post.getLatest.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-10">
      <div className="container m-auto flex flex-col gap-8">
        <OpenCreatePostDialog />

        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <article key={post.id} className="flex border p-4">
              <div className="flex flex-1 flex-col gap-4">
                <h1 className="text-xl font-bold">{post.name}</h1>
                <div>{post.body}</div>
              </div>
              <DeleteButton id={post.id} />
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
