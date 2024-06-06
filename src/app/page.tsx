import { Heading } from "@radix-ui/themes";
import { api } from "~/trpc/server";
import { CreatePostForm } from "./_forms/create-post";
import { DeleteButton } from "./delete-button";

export default async function Home() {
  const hello = await api.post.hello({ text: "Craftzing" });
  const posts = await api.post.getLatest();

  return (
    <main className="p-10">
      <div className="container m-auto flex flex-col gap-8">
        <Heading as="h1" size="7" className="">
          {hello.greeting}
        </Heading>
        <div className="flex flex-col">
          <CreatePostForm />
        </div>
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
