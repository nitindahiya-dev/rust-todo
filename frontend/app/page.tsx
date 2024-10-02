"use client"
import React from "react";
import AddTasks from "@/components/AddTasks";
import Heading from "@/components/Heading";
import TodoList from "@/components/TodoList";
import { Provider } from 'react-redux';
import store from '@/store/store'; // Import the store

export default function Home() {
  return (
    <Provider store={store}>
    <div className="flex items-center justify-center flex-col gap-10 mt-[15vh] p-5 md:p-10 max-w-6xl m-auto border rounded-lg">
      <Heading />
      <AddTasks />
      <TodoList />
    </div>
</Provider>
  );
}
