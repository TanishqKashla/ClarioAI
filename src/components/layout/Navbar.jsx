"use client";

import React from "react";
import Button from "../common/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "../theme/ModeToggle";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <nav className="bg-dark-100 border-b border-border z-10 fixed w-full left-0 right-0">
      <div className="flex h-16 px-10 justify-between items-center">
        <Link href="/" className="text-light-100 text-2xl font-bold font-styrene">
          ClarioAI
        </Link>
        <div>
         
        </div>
        <div className="flex gap-3 text-sm items-center">
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-600 animate-pulse rounded"></div>
          ) : session ? (
            <>
              {console.log(session)}
              <span className="text-light-100">Hello, {session.user.name}</span>
              <img src={session.user.image} alt="User Image" className="w-8 h-8 rounded-full" />
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                children={"Sign Out"}
                className="border-none"
                variant="inactive"
              />
            </>
          ) : (
            <>
              <Button
                onClick={() => signIn("google")}
                children={"Sign In with Google"}
                className="border-none"
                variant="inactive"
              />
              {/* If you want to keep signup button (optional) */}
              {/* <Link href="/auth/signin">
                <Button children={"Sign Up"} />
              </Link> */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
