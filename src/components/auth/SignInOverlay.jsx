import React from 'react';
import { signIn } from 'next-auth/react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const SignInOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-dark-100 p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-light-100 mb-4">Sign in to continue</h2>
        <p className="text-light-200 mb-6">
          Please sign in to create and save your study plans.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/newsubject" })}
            className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors"
          >
            <FaGoogle className="text-xl" />
            Sign in with Google
          </button>
          
          <button
            onClick={() => signIn("github", { callbackUrl: "/newsubject" })}
            className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg transition-colors"
          >
            <FaGithub className="text-xl" />
            Sign in with GitHub
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-light-200 hover:text-light-100 w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignInOverlay; 