const express = require("express");
const router = express.Router();

let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "1984", author: "George Orwell" }
];

// GET /api/books
router.get("/", (req, res) => {
  res.json(books);
});

// GET /api/books/:id
router.get("/:id", (req, res) => {
  const book = books.find((item) => item.id === Number(req.params.id));

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

// POST /api/books
router.post("/", (req, res) => {
  const book = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    ...req.body
  };

  books.push(book);
  res.status(201).json(book);
});

module.exports = router;
