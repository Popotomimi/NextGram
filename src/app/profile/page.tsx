import { getUserByEmail } from "@/actions";
import ProfileForm from "@/components/ProfileForm";
import { auth } from "auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function UserProfile() {
  const session = await auth();

  // Não tem session, vai para home
  if (!session || !session.user?.email) return redirect(`/`);

  const user = await getUserByEmail(session.user.email);

  // Não tem usuário vai para home
  if (!user) {
    return redirect(`/`);
  }

  return (
    <div className=" w-[90%] max-w-2xl mx-auto my-10 px-4 sm:px-6 bg-gray-900 rounded-xl shadow-md py-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center text-white mb-6 transition-opacity duration-300">
        Perfil de {user.name}
      </h1>

      {user.image && (
        <div className="flex justify-center mb-6">
          <Image
            src={user.image}
            alt={`Imagem de perfil de ${user.name}`}
            className="rounded-full object-cover border-4 border-blue-400 shadow-lg w-32 h-32 sm:w-40 sm:h-40 transition-transform duration-300 hover:scale-105"
            width={160}
            height={160}
          />
        </div>
      )}

      <ProfileForm user={user} />
    </div>
  );
}
