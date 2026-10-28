const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET: Display all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// GET: Display one book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: "Error fetching book" });
  }
});

// POST: Add a book
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();

    res.status(201).json({
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    res.status(400).json({ message: "Error adding book" });
  }
});

// PUT: Update a book
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: "Error updating book" });
  }
});

// DELETE: Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting book" });
  }
});

module.exports = router;
