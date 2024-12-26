import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { carts_api } from "../services/api";

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const userId = "5fdc6f3c-9374-4505-a754-d87f655538c3";

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

  const addToCart = async (id) => {
    console.log("Book ID to add to cart:", id); // Debugging
    try {
      const payload = {
        mediaId: id,
        mediaType: "book",
      };
      console.log("Sending payload:", payload); // Debugging
      const response = await axios.post(`${carts_api}/${userId}/add`, payload, {
        withCredentials: true,
      });
      alert("Item has been added to your cart!");
    } catch (error) {
      console.error("Failed to add media to cart:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
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
            <button
              className="btn btn-primary mt-4"
              onClick={() => addToCart(book.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooksPage;
