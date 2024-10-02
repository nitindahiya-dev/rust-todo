"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleStatus } from '../slice/tasksSlice'; // Import toggleStatus action
import { RootState } from '../store/store'; // Import RootState type
import { Clock, Trash2 } from 'lucide-react';

const TodoList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks); // Get tasks from Redux
  const dispatch = useDispatch(); // Get the dispatch function

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id)); // Dispatch deleteTask with the task ID
  };

  const handleToggleStatus = (id: number) => {
    dispatch(toggleStatus(id)); // Dispatch toggleStatus to change the status
  };

  return (
    <div className="w-full md:px-10 z-10">
      <h4 className="text-xl font-semibold mb-4">Todo List</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 max-h-80 gap-5 py-5 md:p-5 w-full items-center justify-items-center border border-gray-200 rounded-lg shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {/* Table Headers */}
        <p className='font-semibold text-lg'>Task</p>
        <p className='font-semibold text-lg'>Status</p>
        <p className='font-semibold text-lg'>Delete</p>
        <p className='font-semibold text-lg'>Set Timer</p>
        
        {/* List Items */}
        {tasks.map(task => (
          <React.Fragment key={task.id}>
            <p className='font-semibold text-md'>{task.task}</p>

            {/* Status Button (Click to toggle) */}
            <button
              onClick={() => handleToggleStatus(task.id)}
              className={`px-4 py-1 rounded-md inline-block font-semibold text-md text-black ${
                task.status === 'Pending' ? 'bg-yellow-400' : 'bg-green-400'
              }`}
            >
              {task.status}
            </button>

            <Trash2 className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleDeleteTask(task.id)} />
            <Clock className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleDeleteTask(task.id)} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
