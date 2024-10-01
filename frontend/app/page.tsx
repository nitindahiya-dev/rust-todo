import AddTasks from "@/components/AddTasks";
import Heading from "@/components/Heading";
import TodoList from "@/components/TodoList";

import React from "react";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col gap-10 mt-[15vh] p-10 max-w-6xl m-auto border rounded-lg">
      <Heading />
      <AddTasks />
      <TodoList />
    </div>

  );
}
