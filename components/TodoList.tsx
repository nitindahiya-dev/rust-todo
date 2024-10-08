import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleStatus, setTasks } from "../slice/tasksSlice"; // Import setTasks correctly
import { RootState } from "../store/store";
import { Trash2, Clock } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";

// Define Task interface
interface Task {
  id: number;
  task: string;
  status: "Pending" | "Completed";
  reminder?: string | null; // Allow reminder to be null or undefined
}

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Fetch tasks from Redux state
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [removalQueue, setRemovalQueue] = useState<number | null>(null);

  // Function to handle deleting a task
  const handleDeleteTask = useCallback(async (id: number) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      dispatch(deleteTask(id)); // Dispatch deleteTask action
      setConfirmDeleteId(null);
      // Refresh tasks after delete (if needed, or rely on existing Redux state)
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }, [dispatch]);

  // Fetch tasks from API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Dispatch action to set tasks in Redux
        dispatch(setTasks(data)); // Dispatching the fetched tasks to Redux
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  // Handle task removal after marking it as completed
  useEffect(() => {
    if (removalQueue !== null) {
      const timer = setTimeout(() => {
        handleDeleteTask(removalQueue); // Call delete API
        setRemovalQueue(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [removalQueue, handleDeleteTask]); // Added handleDeleteTask to the dependency array

  // Function to set the reminder for a task
  const handleSetReminder = async (id: number, reminderDate: Date | undefined) => {
    if (reminderDate) {
      try {
        await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reminder: reminderDate.toISOString() }),
        });
        setSelectedTaskId(null);
      } catch (error) {
        console.error("Failed to set reminder:", error);
      }
    }
  };

  // Function to handle toggling task status
  const handleToggleStatus = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const newStatus = task.status === "Pending" ? "Completed" : "Pending";
      try {
        await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });
        dispatch(toggleStatus(id)); // Dispatch the toggleStatus action
        setRemovalQueue(newStatus === "Completed" ? id : null);
      } catch (error) {
        console.error("Failed to toggle task status:", error);
      }
    }
  };

  return (
    <div className="w-full md:px-10 z-10">
      <h4 className="text-xl font-semibold mb-4">Todo List</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 max-h-80 gap-5 py-5 md:p-5 w-full items-center justify-items-center border border-gray-200 rounded-lg shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <p className="font-semibold text-lg">Task</p>
        <p className="font-semibold text-lg">Status</p>
        <p className="font-semibold text-lg">Delete</p>
        <p className="font-semibold text-lg">Set Reminder</p>

        <AnimatePresence>
          {tasks.map((task: Task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, height: 0, overflow: "hidden" }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 0.3 }}
              className="contents"
            >
              <p className="font-semibold text-md">{task.task}</p>
              <button
                onClick={() => handleToggleStatus(task.id)}
                className={`px-4 py-1 rounded-md inline-block font-semibold text-md text-black ${
                  task.status === "Pending" ? "bg-yellow-400" : "bg-green-400"
                }`}
              >
                {task.status}
              </button>

              <Popover>
                <PopoverTrigger asChild>
                  <Trash2
                    className="cursor-pointer hover:text-red-500 transition-colors"
                    onClick={() => setConfirmDeleteId(task.id)}
                  />
                </PopoverTrigger>

                {confirmDeleteId === task.id && (
                  <PopoverContent className="p-4 bg-white border shadow-md rounded-md">
                    <p>Are you sure you want to delete this task?</p>
                    <button onClick={() => handleDeleteTask(task.id)}>Yes</button>
                    <button onClick={() => setConfirmDeleteId(null)}>No</button>
                  </PopoverContent>
                )}
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Clock
                    className="cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() => setSelectedTaskId(task.id)}
                  />
                </PopoverTrigger>

                {selectedTaskId === task.id && (
                  <PopoverContent className="p-4 bg-white border shadow-md rounded-md">
                    <ShadcnCalendar
                      selected={undefined} // Removed unused `selectedDate`
                      onSelect={(date: Date | undefined) => handleSetReminder(task.id, date)}
                    />
                  </PopoverContent>
                )}
              </Popover>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodoList;
