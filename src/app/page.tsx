import { Heading } from "@radix-ui/themes";
import { api } from "~/trpc/server";
import { CreatePostForm } from "./_forms/create-post";

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
            <article key={post.id} className="border p-4">
              <Heading as="h2" size="4">
                {post.name}
              </Heading>
              <div>{post.body}</div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
