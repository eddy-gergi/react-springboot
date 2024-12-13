import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const getAllBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/books/all", {
        withCredentials: true,
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error.message);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="card bg-base-100 shadow-lg rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold">{book.title}</h2>
            <p className="mt-2 text-gray-600">{book.description}</p>
            <button
              className="btn btn-secondary mt-4"
              onClick={() => navigate(`/book/${book.id}`)} 
            >
              View
            </button>
            <button className="btn btn-primary mt-4">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooksPage;
