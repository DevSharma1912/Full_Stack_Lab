const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const studentsRouter = require("./routes/students");
const booksRouter = require("./routes/books");
const resourceRouter = require("./routes/resource");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Task 11: Global request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Task 12: API-key middleware for /admin routes
function adminAuth(req, res, next) {
  if (!req.headers["x-api-key"]) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}

app.get("/", (req, res) => {
  res.send("Express Lab Running");
});

// Task 5
app.get("/about", (req, res) => {
  res.json({ name: "Dev Sharma", rollNo: "CU24250269" });
});

// Task 6
app.get("/courses", (req, res) => {
  res.json(["Full Stack Web Development", "Computer Vision", "Data Analytics"]);
});

// Task 7
app.post("/echo", (req, res) => {
  res.json(req.body);
});

// Task 12-13
app.use("/admin", adminAuth);

app.get("/admin/dashboard", (req, res) => {
  res.json({ message: "Admin dashboard", data: "Protected data" });
});

// Task 9
app.get("/search", (req, res) => {
  res.json({
    name: req.query.name || null,
    age: req.query.age || null
  });
});

// Task 10
app.get("/products/:category/:id", (req, res) => {
  res.json({
    category: req.params.category,
    id: req.params.id
  });
});

// Task 15
app.post("/register", (req, res) => {
  const { name } = req.body;
  res.json({
    message: `Registration successful for ${name}`
  });
});

// Task 16
app.post("/contact", (req, res) => {
  console.log(req.body);
  res.json({ message: "Thank you for contacting us." });
});

// Task 17-18
app.use("/api/students", studentsRouter);

// Task 19
app.use("/api/books", booksRouter);

// Task 20
app.use("/api/tasks", resourceRouter);

// Task 25
app.use(express.static(path.join(__dirname, "public")));

// Task 22: 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Task 23: centralized error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});