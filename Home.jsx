import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <p className="welcome">WELCOME TO YOUR DIGITAL LIBRARY</p>

        <h1>
          Discover Your Next
          <br />
          <span>Favourite Book.</span>
        </h1>

        <p className="hero-description">
          Manage your books and discover your favourite reads in one place.
        </p>

        <div className="hero-buttons">
          <Link to="/books" className="button">
            Explore Books →
          </Link>

          <Link to="/add" className="button secondary-button">
            + Add a Book
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>My Collection</h3>
          <p>View and organize your books.</p>
          <Link to="/books">View Collection →</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📖</div>
          <h3>Add New Books</h3>
          <p>Add books to your collection.</p>
          <Link to="/add">Add Books →</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">✏️</div>
          <h3>Manage Books</h3>
          <p>Edit and delete existing books.</p>
          <Link to="/books">Manage Now →</Link>
        </div>
      </section>
    </div>
  );
}
