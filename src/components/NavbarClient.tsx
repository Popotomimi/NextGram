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
    <div className="flex items-center relative">
      {/* Ícone hambúrguer – visível apenas no mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-white hover:text-blue-400 transition-colors focus:outline-none ml-auto">
        {isMenuOpen ? (
          <RiCloseLargeFill size={24} />
        ) : (
          <GiHamburgerMenu size={24} />
        )}
      </button>

      {/* Menu Desktop */}
      <div className="hidden md:flex gap-4 items-center text-sm">
        {user ? (
          <>
            <p className="text-gray-300">{user.name}</p>
            {user.image && (
              <Image
                src={user.image}
                alt={`Perfil de: ${user.name}`}
                width={40}
                height={40}
                className="rounded-full border border-gray-600"
              />
            )}
            <Link
              href="/profile"
              className="hover:text-blue-400 transition-colors">
              Perfil
            </Link>
            <Link
              href="/post/new"
              className="hover:text-blue-400 transition-colors">
              Criar Postagem
            </Link>
            <Link
              href="/my-posts"
              className="hover:text-blue-400 transition-colors">
              Minhas Postagens
            </Link>
            <form action={signOutAction}>
              <Button text="Sair" danger type="submit" />
            </form>
          </>
        ) : (
          <ButtonLink text="Entrar" url="/signin" />
        )}
      </div>

      {/* Menu Mobile com animação */}
      <div
        className={`absolute top-full right-0 z-50 mt-2 w-[75vw] max-w-sm bg-gray-800 rounded-lg flex flex-col gap-3 md:hidden text-sm text-white px-4 py-3 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0 max-h-screen"
            : "opacity-0 -translate-y-4 max-h-0 overflow-hidden"
        }`}>
        {user ? (
          <>
            <p className="text-gray-300">{user.name}</p>
            <Link
              href="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-400 transition-colors">
              Perfil
            </Link>
            <Link
              href="/post/new"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-400 transition-colors">
              Criar Postagem
            </Link>
            <Link
              href="/my-posts"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-blue-400 transition-colors">
              Minhas Postagens
            </Link>
            <form action={signOutAction}>
              <Button text="Sair" danger type="submit" />
            </form>
          </>
        ) : (
          <ButtonLink text="Entrar" url="/signin" />
        )}
      </div>
    </div>
  );
};

export default NavbarClient;
