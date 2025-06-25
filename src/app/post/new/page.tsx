import CreatePostForm from "@/components/CreatePostForm";
import { auth } from "auth";
import { redirect } from "next/navigation";

const NewPostPage = async () => {
  const session = await auth();

  if (!session) return redirect("/");

  return (
    <div className="max-w-2xl w-full mx-auto my-10 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center leading-snug">
        Criar Novo Post
      </h1>
      <div className="border border-zinc-300 p-4 rounded mt-8">
        <CreatePostForm />
      </div>
    </div>
  );
};

export default NewPostPage;
