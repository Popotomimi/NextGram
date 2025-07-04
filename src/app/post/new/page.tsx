import CreatePostForm from "@/components/CreatePostForm";
import { auth } from "auth";
import { redirect } from "next/navigation";

const NewPostPage = async () => {
  const session = await auth();

  if (!session) return redirect("/");

  return (
    <div className="w-[90%] sm:w-2/3 lg:max-w-2xl mx-auto my-10 px-4 sm:px-6 text-white animate-fade-in">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center leading-snug mb-6">
        Criar Novo Post
      </h1>
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg transition-all duration-300">
        <CreatePostForm />
      </div>
    </div>
  );
};

export default NewPostPage;
