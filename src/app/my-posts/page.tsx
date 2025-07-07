import { getPostsByUser } from "@/actions";
import ButtonLink from "@/components/ButtonLink";
import { auth } from "auth";
import { redirect } from "next/navigation";
import PostGrid from "@/components/PostGrid";

const MyPostsPage: React.FC = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const userId = session.user.userId;
  const posts = await getPostsByUser(userId);

  return (
    <div className="w-[90%] sm:w-2/3 lg:max-w-2xl mx-auto my-10 px-4 sm:px-6 text-white animate-[fadeIn_0.4s_ease-out_forwards]">
      <h1 className="text-3xl font-semibold text-center mb-8 leading-snug">
        Minhas postagens
      </h1>
      {/* Deveres - Visualizar post, Editar post, dar like, comentar */}
      {posts.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg text-center">
          <p className="mb-4 text-gray-300 text-sm sm:text-base font-medium">
            Você ainda não tem postagens.
          </p>
          <div className="flex justify-center">
            <ButtonLink text="Criar postagem" url="/post/new" />
          </div>
        </div>
      ) : (
        <PostGrid posts={posts} userId={userId} />
      )}
    </div>
  );
};

export default MyPostsPage;
