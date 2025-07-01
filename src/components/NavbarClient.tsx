"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeFill } from "react-icons/ri";
import { User } from "types/User";
import { signOutAction } from "@/signout";

const NavbarClient = ({ user }: { user: User }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {isMenuOpen ? (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden">
          <RiCloseLargeFill />
        </button>
      ) : (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden">
          <GiHamburgerMenu />
        </button>
      )}

      <div className="hidden md:flex gap-4 items-center">
        {user ? (
          <>
            <p>{user.name}</p>
            {user.image && (
              <Image
                src={user.image}
                alt={`Perfil de: ${user.name}`}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <Link href="/profile">Perfil</Link>
            <Link href="/post/new">Criar Postagem</Link>
            <Link href="/my-posts">Minhas Postagens</Link>
            <form action={signOutAction}>
              <Button text="Sair" danger type="submit" />
            </form>
          </>
        ) : (
          <ButtonLink text="Entrar" url="/signin" />
        )}
      </div>

      {isMenuOpen && (
        <div className="mt-4 flex flex-col gap-2 md:hidden">
          {user ? (
            <>
              <p>{user.name}</p>
              <Link href="/profile">Perfil</Link>
              <Link href="/post/new">Criar Postagem</Link>
              <Link href="/my-posts">Minhas Postagens</Link>
              <form action={signOutAction}>
                <Button text="Sair" danger type="submit" />
              </form>
            </>
          ) : (
            <ButtonLink text="Entrar" url="/signin" />
          )}
        </div>
      )}
    </>
  );
};

export default NavbarClient;
