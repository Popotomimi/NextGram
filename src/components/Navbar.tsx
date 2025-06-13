import { getUserByEmail } from "@/actions";
import { auth, signOut } from "auth";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

const Navbar = async () => {
  const session = await auth();

  const user = await getUserByEmail(session?.user.email);

  return (
    <nav className="bg-gray-800 text-white px-10 py-5 flex justify-between items-center">
      <Link
        href="/"
        className="text-white hover:text-zinc-200 text-lg font-bold">
        NextGram
      </Link>
      <div>
        {user ? (
          // logado
          <div className="flex gap-4 items-center">
            <p className="text-white font-medium">{user.name}</p>
            {user.image && (
              <Image
                src={user.image}
                alt={`Perfil de: ${user.name}`}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
            )}
            <Link
              href={"/profile"}
              className="text-white font-medium hover:text-zinc-200">
              Perfil
            </Link>
            <Link
              href={"/post/new"}
              className="text-white font-medium hover:text-zinc-200">
              Criar Postagem
            </Link>
            <Link
              href={"/my-posts"}
              className="text-white font-medium hover:text-zinc-200">
              Minhas Postagens
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}>
              <Button text="Sair" danger={true} type="submit" />
            </form>
          </div>
        ) : (
          //deslogado
          <ButtonLink text="Entrar" url="/signin" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
