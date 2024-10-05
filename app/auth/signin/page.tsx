// app/auth/signin/page.tsx
"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-2xl">Sign In</h1>
      <button
        onClick={() => signIn("google")}
        className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
      <button
        onClick={() => signIn("github")}
        className="px-4 py-2 bg-gray-800 text-white rounded"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
