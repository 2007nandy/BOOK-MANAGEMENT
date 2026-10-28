import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/books", {
        ...book,
        price: Number(book.price),
      });

      alert("Book added successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Check the backend terminal.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Book 📚</h2>

      <form onSubmit={handleSubmit}>
        <label>Book Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter book title"
          value={book.title}
          onChange={handleChange}
          required
        />

        <label>Author</label>
        <input
          type="text"
          name="author"
          placeholder="Enter author name"
          value={book.author}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          placeholder="Enter category"
          value={book.category}
          onChange={handleChange}
          required
        />

        <label>Price (₹)</label>
        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={book.price}
          onChange={handleChange}
          min="0"
          required
        />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
