import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewBooks() {
  const [books, setBooks] = useState([]);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete book
  const deleteBook = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);

      alert("Book deleted successfully!");

      // Refresh book list
      fetchBooks();
    } catch (error) {
      console.log("Error deleting book:", error);
      alert("Failed to delete book!");
    }
  };

  return (
    <div className="books-container">
      <h2>📚 All Books</h2>

      <div style={{ marginBottom: "20px" }}>
        <Link to="/add">
          <button>Add New Book</button>
        </Link>
      </div>

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>₹{book.price}</td>

                <td>
                  <Link to={`/edit/${book._id}`}>
                    <button
                      style={{
                        backgroundColor: "#2563eb",
                        color: "white",
                        marginRight: "8px",
                      }}
                    >
                      Update
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteBook(book._id)}
                    style={{
                      backgroundColor: "#dc2626",
                      color: "white",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewBooks;
