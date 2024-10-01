import React from 'react';
import { Trash2 } from 'lucide-react';

const TodoList = () => {
    return (
        <div className="w-full px-10 z-10">
            <h4 className="text-xl font-semibold mb-4">Todo List</h4>
            <div className="grid grid-cols-3 max-h-96 gap-5 p-5 w-full items-center justify-items-center border border-gray-200 rounded-lg shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {/* Table Headers */}
                <p className='font-semibold text-lg'>Task</p>
                <p className='font-semibold text-lg'>Status</p>
                <p className='font-semibold text-lg'>Delete</p>

                {/* List Items */}
                <div className="col-span-3 border-t border-gray-300 my-2"></div> {/* Separator */}

                <p className='font-semibold text-md'>Go to gym</p>
                <p className="bg-yellow-400 px-4 py-1 rounded-md inline-block font-semibold text-md text-black">Pending</p>
                <Trash2 className="cursor-pointer hover:text-red-500 transition-colors" />

                <p className='font-semibold text-md'>Bank</p>
                <p className="bg-green-400 px-4 py-1 rounded-md inline-block font-semibold text-md text-black">Completed</p>
                <Trash2 className="cursor-pointer hover:text-red-500 transition-colors" />

                <p className='font-semibold text-md'>Call me</p>
                <p className="bg-yellow-400 px-4 py-1 rounded-md inline-block font-semibold text-md text-black">Pending</p>
                <Trash2 className="cursor-pointer hover:text-red-500 transition-colors" />

                <div className="col-span-3 border-t border-gray-300 my-2"></div> {/* Separator */}

                {/* Add more items as needed */}
            </div>
        </div>
    );
};

export default TodoList;
