import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Task interface
interface Task {
  id: number;
  task: string;
  status: "Pending" | "Completed";
  reminder?: string | null; // Optional reminder field
}

// Define the initial state for tasks
interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

// Create the tasks slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload; // Set the tasks in the state
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload); // Delete task by id
    },
    toggleStatus: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload); // Find the task
      if (task) {
        task.status = task.status === "Pending" ? "Completed" : "Pending"; // Toggle status
      }
    },
  },
});

// Export actions
export const { setTasks, deleteTask, toggleStatus } = tasksSlice.actions;

// Export the reducer
export default tasksSlice.reducer;
