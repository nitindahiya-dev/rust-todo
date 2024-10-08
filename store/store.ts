import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/slice/tasksSlice'; // Ensure the path is correct

// Create the store
const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// Export RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
