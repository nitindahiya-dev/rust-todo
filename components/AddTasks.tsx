
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../slice/tasksSlice'; // Import the addTask action
import { RootState } from '@/store/store'; // Import RootState type from the store

const AddTasks = () => {
  const [newTask, setNewTask] = useState('');
  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Get tasks from Redux store
  const dispatch = useDispatch(); // Get the dispatch function

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    // Dispatch the addTask action with a new task object
    dispatch(addTask({ id: tasks.length + 1, task: newTask }));

    setNewTask(''); // Clear the input after adding
  };

  return (
    <div className='flex flex-col justify-center gap-5 z-10'>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="What do you like to do?"
        className='md:w-96 bg-transparent border-b-2 text-2xl placeholder:text-2xl focus:outline-0'
      />
      <button onClick={handleAddTask} className='bg-red-500 px-5 py-1 rounded-md w-32 m-auto'>
        Add Task
      </button>
    </div>
  );
};

export default AddTasks;
