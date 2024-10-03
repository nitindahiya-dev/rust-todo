import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleStatus, setReminder } from "../slice/tasksSlice";
import { RootState } from "../store/store";
import { Trash2, Clock } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: number;
  task: string;
  status: string;
  reminder?: Date; // Update to allow only Date
}

const TodoList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks) as Task[];
  const dispatch = useDispatch();

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined); // Update to allow undefined
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
    setConfirmDeleteId(null); // Reset confirmation ID after deletion
  };

  const handleToggleStatus = (id: number) => {
    dispatch(toggleStatus(id));
  };

  const handleSetReminder = (id: number, reminderDate: Date | undefined) => {
    if (reminderDate) {
      dispatch(setReminder({ id, reminder: reminderDate }));
      setSelectedTaskId(null); // Close the popover after setting the reminder
    }
  };

  return (
    <div className="w-full md:px-10 z-10">
      <h4 className="text-xl font-semibold mb-4">Todo List</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 max-h-80 gap-5 py-5 md:p-5 w-full items-center justify-items-center border border-gray-200 rounded-lg shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <p className="font-semibold text-lg">Task</p>
        <p className="font-semibold text-lg">Status</p>
        <p className="font-semibold text-lg">Delete</p>
        <p className="font-semibold text-lg">Set Timer</p>

        <AnimatePresence>
          {tasks.map((task: Task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
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
                        onClick={() => setConfirmDeleteId(null)} // Close the popover
                      >
                        No
                      </button>
                    </div>
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
                  <PopoverContent className="p-2 bg-black border shadow-md rounded-md">
                    <ShadcnCalendar
                      mode="single"
                      selected={selectedDate} // This is now Date | undefined
                      onSelect={(date) => {
                        setSelectedDate(date); // Set selectedDate to the selected date
                        handleSetReminder(task.id, date); // Pass the date to your reminder handler
                      }}
                    />
                  </PopoverContent>
                )}
              </Popover>

              {/* Countdown display */}
              {task.reminder && (
                <p className="text-sm text-gray-500">
                  Reminder: {formatDistanceToNow(new Date(task.reminder))} left
                </p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodoList;
