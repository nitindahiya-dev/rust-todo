// app/page.tsx
"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import AddTasks from "@/components/AddTasks";
import Heading from "@/components/Heading";
import TodoList from "@/components/TodoList";
import { Provider } from "react-redux";
import store from "@/store/store"; // Import the store

export default function Home() {
  const { data: session } = useSession();

  return (
    <Provider store={store}>
      <div className="absolute top-5 right-10 ">
        {session ? (
          <p className="bg-red-500 py-2 px-3  font-bold cursor-pointer" onClick={() => signOut()}>Logout</p> // Show Logout if user is logged in
        ) : (
          <p className="bg-green-300 text-black py-2 px-3  font-bold cursor-pointer" onClick={() => signIn()}>Login</p> // Show Login if user is not logged in
        )}
      </div>
      <div className="flex items-center justify-center flex-col gap-10 mt-[15vh] p-5 md:p-10 max-w-6xl m-auto border rounded-lg">
        <Heading />
        {session ? (
          <>
            <AddTasks />
            <TodoList />
          </>
        ) : (
          <p>Please log in to manage your tasks.</p>
        )}
      </div>
    </Provider>
  );
}
