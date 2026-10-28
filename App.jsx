import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import AddBook from "./pages/AddBook.jsx";
import ViewBooks from "./pages/ViewBooks.jsx";
import EditBook from "./pages/EditBook.jsx";
import "./index.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/books" element={<ViewBooks />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </>
  );
}

export default App;
