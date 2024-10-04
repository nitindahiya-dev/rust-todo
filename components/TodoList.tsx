import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleStatus, setReminder } from "../slice/tasksSlice";
import { RootState } from "../store/store";
import { Trash2, Clock } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: number;
  task: string;
  status: string;
  reminder?: string; // Reminder stored as a string (ISO format)
}

const TodoList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks) as Task[];
  const dispatch = useDispatch();

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [removalQueue, setRemovalQueue] = useState<number | null>(null); // Track the task being removed
  const [remainingTimes, setRemainingTimes] = useState<{ [key: number]: string }>({});

  // Handle task removal after marking it as completed
  useEffect(() => {
    if (removalQueue !== null) {
      const timer = setTimeout(() => {
        dispatch(deleteTask(removalQueue));
        setRemovalQueue(null);
      }, 3000); // 3-second delay

      return () => clearTimeout(timer);
    }
  }, [removalQueue, dispatch]);

  // Function to set the reminder for a task
  const handleSetReminder = (id: number, reminderDate: Date | undefined) => {
    if (reminderDate) {
      dispatch(setReminder({ id, reminder: reminderDate.toISOString() })); // Store as ISO string
      setSelectedTaskId(null); // Close the reminder picker after setting
    }
  };

  // Function to handle toggling task status
  const handleToggleStatus = (id: number) => {
    dispatch(toggleStatus(id));

    // Add to the removal queue if the task is marked as completed
    const task = tasks.find((task) => task.id === id);
    if (task?.status === "Pending") {
      setRemovalQueue(id);
    }
  };

  // Function to handle deleting a task
  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id)); // Dispatch delete action
    setConfirmDeleteId(null); // Close the confirmation popup
  };

  // Function to calculate remaining time for reminders
  const calculateRemainingTime = (reminder: string) => {
    const now = new Date();
    const reminderDate = new Date(reminder);
    const remainingTime = reminderDate.getTime() - now.getTime();

    if (remainingTime < 0) {
      return "Reminder time has passed.";
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Update remaining times for reminders every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTimes: { [key: number]: string } = {};
      tasks.forEach(task => {
        if (task.reminder) {
          newRemainingTimes[task.id] = calculateRemainingTime(task.reminder);
        }
      });
      setRemainingTimes(newRemainingTimes);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount or tasks change
  }, [tasks]);

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
              exit={{ opacity: 0, height: 0, transition: { duration: 0.5 } }} // Smooth exit animation
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
                    <p className="font-semibold">Are you sure you want to delete this task?</p>
                    <div className="flex justify-end mt-4 space-x-2">
                      <button
                        className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Yes
                      </button>
                      <button
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-200"
                        onClick={() => setConfirmDeleteId(null)}
                      >
                        No
                      </button>
                    </div>
                  </PopoverContent>
                )}
              </Popover>

              {task.reminder ? (
                <p className="text-sm text-gray-500">
                  Remaining Time: {remainingTimes[task.id] || calculateRemainingTime(task.reminder)}
                </p>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Clock
                      className="cursor-pointer hover:text-blue-500 transition-colors"
                      onClick={() => setSelectedTaskId(task.id)}
                    />
                  </PopoverTrigger>

                  {selectedTaskId === task.id && (
                    <PopoverContent className="p-2 bg-black border shadow-md rounded-md">
                      <ShadcnCalendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          handleSetReminder(task.id, date);
                        }}
                      />
                    </PopoverContent>
                  )}
                </Popover>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodoList;
