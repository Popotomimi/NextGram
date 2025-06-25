import { getUserByEmail } from "@/actions";
import { auth } from "auth";
import Link from "next/link";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  const session = await auth();
  const user = await getUserByEmail(session?.user.email);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-lg font-bold hover:text-zinc-200">
          NextGram
        </Link>
        {user && <NavbarClient user={user} />}
      </div>
    </nav>
  );
};

export default Navbar;
