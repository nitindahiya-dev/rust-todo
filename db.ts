import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Fetch all tasks
export const getTasks = async () => {
  return await pool.query("SELECT * FROM tasks ORDER BY id");
};

// Add a new task
export const addTask = async (task: string) => {
  return await pool.query("INSERT INTO tasks (task) VALUES ($1) RETURNING *", [task]);
};

// Update task status
export const updateTaskStatus = async (id: number, status: string) => {
  return await pool.query("UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *", [status, id]);
};

// Set a reminder for a task
export const setTaskReminder = async (id: number, reminder: string) => {
  return await pool.query("UPDATE tasks SET reminder = $1 WHERE id = $2 RETURNING *", [reminder, id]);
};

// Delete a task
export const deleteTask = async (id: number) => {
  return await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
};
