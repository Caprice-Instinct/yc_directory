import Link from "next/link";
import Image from "next/image";
import React from "react";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlusIcon, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Use of async since the component is a server component; client components don't use async functions
// ✅ Server Components → Can be async and use await directly.
// ❌ Client Components → Cannot be async; use useEffect() for async operations.
const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={140} height={10} />
        </Link>
        {/* Only displayed if the user is logged in - through user session */}
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            // If user is logged in, provide the following content
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlusIcon className="size-6 sm:hidden" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit">
                <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
              <Link href={`/user/${session.id}`}>
                <Avatar className="size-10">
                  <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''}/>
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            // Extend HTML <form> to allow server actions
            // to be invoked with the action prop
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
