// index.js or index.mjs
import express from "express";
import cors from "cors"; // If you need CORS
import pkg from "pg"; // Import pg as a default export

const { Pool } = pkg; // Destructure Pool from pkg

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// PostgreSQL connection setup
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "simpletododb",
  password: "strongPassword",
  port: 5432, // Default PostgreSQL port
});

// Sample route to fetch tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks"); // Assuming you have a 'tasks' table
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
