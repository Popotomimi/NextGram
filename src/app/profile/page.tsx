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
    <div className="max-w-2xl w-full mx-auto my-10 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center leading-snug">
        Perfil de {user.name}
      </h1>

      {user.image && (
        <div className="flex justify-center my-6">
          <Image
            src={user.image}
            alt={`Imagem de perfil de ${user.name}`}
            className="rounded-full object-cover w-32 h-32 sm:w-40 sm:h-40"
            width={160}
            height={160}
          />
        </div>
      )}

      <ProfileForm user={user} />
    </div>
  );
}
