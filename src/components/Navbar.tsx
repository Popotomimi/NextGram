import { getUserByEmail } from "@/actions";
import { auth } from "auth";
import Link from "next/link";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  const session = await auth();
  const user = await getUserByEmail(session?.user.email);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
          NextGram
        </Link>

        <div className="flex items-center gap-4">
          {/* Botão 'Entrar' visível apenas no desktop */}
          <NavbarClient user={user!} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
