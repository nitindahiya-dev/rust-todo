// app/dashboard/page.tsx
"use client";

import React from "react";
import { useSession, signIn } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  // Show loading state while session is being fetched
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // If the user is not authenticated, show a message and a sign-in button
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4">You need to be signed in to access the dashboard.</p>
        <button
          onClick={() => signIn()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sign In
        </button>
      </div>
    );
  }

  // If the user is authenticated, display the dashboard content
  return (
   <div className="">Dashboard</div>
  );
}
