const express = require("express");
const router = express.Router();

const students = [
  { id: 1, name: "Dev Sharma", course: "CSE" },
  { id: 2, name: "Riya Shukla", course: "CSE" },
  { id: 3, name: "Aabra ka dabra", course: "CSE" }
];

// Task 8
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const student = students.find((item) => String(item.id) === id);

  if (!student) {
    const err = new Error("Student not found");
    err.status = 404;
    return next(err);
  }

  res.json({ id, message: "Student details" });
});

module.exports = router;
