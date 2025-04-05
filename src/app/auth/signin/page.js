"use client";

import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose a provider to sign in with
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="group flex w-full justify-center items-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
          
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="group flex w-full justify-center items-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <FaGithub className="mr-2" />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
} 