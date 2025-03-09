const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];
let nextId = 1;

const findTaskById = (id) => tasks.find((task) => task.id === id);

app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  const newTask = {
    id: nextId++,
    title,
    description,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = findTaskById(taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = findTaskById(taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  task.title = title;
  task.description = description;

  res.status(200).json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: "Task deleted successfully" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
