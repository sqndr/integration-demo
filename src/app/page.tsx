import { api } from "~/trpc/server";
import { CreatePostForm } from "./_forms/create-post";
import { Heading } from "@radix-ui/themes";

export default async function Home() {
  const hello = await api.post.hello({ text: "Craftzing" });

  return (
    <main className="p-10">
      <div className="container m-auto flex flex-col gap-8">
        <Heading as="h1" size="7" className="">
          {hello.greeting}
        </Heading>
        <div className="flex flex-col">
          <CreatePostForm />
        </div>
      </div>
    </main>
  );
}
