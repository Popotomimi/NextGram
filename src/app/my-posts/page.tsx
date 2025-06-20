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
    <div className="mx-auto my-10 p-4">
      <h1 className="text-[2rem] leading-10 font-semibold text-center mb-8">
        Minhas postagens
      </h1>
      {/* Deveres - Visualizar post, Editar post, dar like, comentar */}
      {posts.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 font-medium">Você ainda não tem postagens.</p>
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
