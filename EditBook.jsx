import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);

  // Get existing book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/books/${id}`,
        );

        setBook({
          title: response.data.title || "",
          author: response.data.author || "",
          category: response.data.category || "",
          price: response.data.price ?? "",
        });
      } catch (error) {
        console.log("Error fetching book:", error);
        alert("Unable to load book details!");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  // Update book
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, {
        ...book,
        price: Number(book.price),
      });

      alert("Book updated successfully!");
      navigate("/books");
    } catch (error) {
      console.log("Error updating book:", error);
      alert("Failed to update book!");
    }
  };

  if (loading) {
    return <p>Loading book details...</p>;
  }

  return (
    <div className="form-container">
      <h2>✏️ Update Book</h2>

      <form onSubmit={handleSubmit}>
        <label>Book Title</label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
        />

        <label>Author</label>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={book.category}
          onChange={handleChange}
          required
        />

        <label>Price (₹)</label>
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          min="0"
          required
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditBook;
