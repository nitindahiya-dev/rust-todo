import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Task interface with a reminder field
interface Task {
  id: number;
  task: string;
  status: "Pending" | "Completed";
  reminder: string | null; // Update to string | null
}


// Define the initial state interface
interface TasksState {
  tasks: Task[];
}

// Initial state
const initialState: TasksState = {
  tasks: [],
};

// Create the slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "status" | "reminder">>) => {
      state.tasks.push({ ...action.payload, status: "Pending", reminder: null });
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleStatus: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = task.status === "Pending" ? "Completed" : "Pending";
      }
    },
    setReminder: (state, action: PayloadAction<{ id: number; reminder: string }>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.reminder = action.payload.reminder;
      }
    },
  },
});

// Export actions
export const { addTask, deleteTask, toggleStatus, setReminder } = tasksSlice.actions;

// Export the reducer
export default tasksSlice.reducer;
