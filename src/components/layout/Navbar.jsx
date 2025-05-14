"use client";

import React from "react";
import Button from "../common/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <nav className="bg-dark-100 border-b border-border z-10 fixed w-full left-0 right-0">
      <div className="flex h-16 px-10 justify-between items-center">
        <Link href="/" className="text-light-100 text-2xl font-bold">
          Study Sync
        </Link>
        <div className="flex gap-3 text-sm items-center">
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-600 animate-pulse rounded"></div>
          ) : session ? (
            <>
              <span className="text-light-100">Hello, {session.user.name}</span>
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                children={"Sign Out"}
                ClassName="border-none"
                variant="inactive"
              />
            </>
          ) : (
            <>
              <Button
                onClick={() => signIn()}
                children={"Sign In"}
                ClassName="border-none"
                variant="inactive"
              />
              <Link href="/auth/signin">
                <Button children={"Sign Up"} />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
