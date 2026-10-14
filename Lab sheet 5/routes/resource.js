const express = require("express");
const router = express.Router();

let tasks = [
  { id: 1, title: "Complete Lab Sheet 5", completed: false },
  { id: 2, title: "Test API", completed: false }
];

// GET all
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET one - Task 24 uses next(err)
router.get("/:id", (req, res, next) => {
  const task = tasks.find((item) => item.id === Number(req.params.id));

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }

  res.json(task);
});

// POST
router.post("/", (req, res) => {
  const task = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    ...req.body
  };

  tasks.push(task);
  res.status(201).json(task);
});

// PUT
router.put("/:id", (req, res) => {
  const index = tasks.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
});

// DELETE
router.delete("/:id", (req, res) => {
  const index = tasks.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deleted = tasks.splice(index, 1)[0];
  res.json(deleted);
});

module.exports = router;
