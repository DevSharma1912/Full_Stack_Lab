const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom global logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Authentication middleware for write operations only
const authMiddleware = (req, res, next) => {
  const key = req.headers["x-api-key"];

  if (!key || key !== API_KEY) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Valid x-api-key header is required"
    });
  }

  next();
};

// In-memory task data
let tasks = [
  { id: 1, title: "Complete Lab Sheet 6", completed: false },
  { id: 2, title: "Build REST API", completed: true },
  { id: 3, title: "Test API in Postman", completed: false },
  { id: 4, title: "Create Plain JS Client", completed: false },
  { id: 5, title: "Create React Client", completed: false }
];

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// GET one task
app.get("/api/tasks/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    const error = new Error("Task not found");
    error.status = 404;
    return next(error);
  }

  res.json(task);
});

// POST task
app.post("/api/tasks", authMiddleware, (req, res) => {
  const { title, completed = false } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Bad Request",
      message: "title is required"
    });
  }

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    title,
    completed: Boolean(completed)
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT task
app.put("/api/tasks/:id", authMiddleware, (req, res, next) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    const error = new Error("Task not found");
    error.status = 404;
    return next(error);
  }

  const { title, completed } = req.body;

  if (title !== undefined) tasks[index].title = title;
  if (completed !== undefined) tasks[index].completed = Boolean(completed);

  res.json(tasks[index]);
});

// DELETE task
app.delete("/api/tasks/:id", authMiddleware, (req, res, next) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    const error = new Error("Task not found");
    error.status = 404;
    return next(error);
  }

  const deletedTask = tasks.splice(index, 1)[0];
  res.json({
    message: "Task deleted successfully",
    task: deletedTask
  });
});

// 404 handler - keep after all routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `No route found for ${req.method} ${req.originalUrl}`
  });
});

// Centralized error handler - 4 parameters
app.use((err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;

  res.status(status).json({
    error: status === 500 ? "Internal Server Error" : err.message,
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});