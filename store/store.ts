import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/slice/tasksSlice'; // Adjust the path if necessary

// Create the store
const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// Export RootState type to use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
