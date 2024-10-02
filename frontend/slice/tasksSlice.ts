import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Task interface with a status field
interface Task {
  id: number;
  task: string;
  status: 'Pending' | 'Completed'; // Add status
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
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'status'>>) => {
      state.tasks.push({ ...action.payload, status: 'Pending' }); // Add new task with 'Pending' status by default
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload); // Remove task by ID
    },
    toggleStatus: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        // Toggle the task's status between 'Pending' and 'Completed'
        task.status = task.status === 'Pending' ? 'Completed' : 'Pending';
      }
    },
  },
});

// Export actions
export const { addTask, deleteTask, toggleStatus } = tasksSlice.actions;

// Export the reducer to be used in the store
export default tasksSlice.reducer;
