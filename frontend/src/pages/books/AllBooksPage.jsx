import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { carts_api, books_api } from "../../services/api";

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortDirection, setSortDirection] = useState("ascending");
  const booksPerPage = 6;
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const getAllBooks = async () => {
    try {
      const response = await axios.get(
        `${books_api}/all?orderByColumn=title&orderByDirection=${sortDirection}`,
        { withCredentials: true }
      );
      setBooks(response.data);
      setTotalPages(Math.ceil(response.data.length / booksPerPage));
    } catch (error) {
      console.error("Failed to fetch books:", error.message);
    }
  };

  const addToCart = async (id) => {
    try {
      const payload = {
        mediaId: id,
        mediaType: "book",
      };
      await axios.post(`${carts_api}/${userId}/add`, payload, {
        withCredentials: true,
      });
      alert("Item has been added to your cart!");
    } catch (error) {
      console.error("Failed to add media to cart:", error.response?.data || error.message);
      alert("Error: Something went wrong!");
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedBooks = books.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "ascending" ? "descending" : "ascending"));
  };

  useEffect(() => {
    getAllBooks();
  }, [sortDirection]);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold flex items-center">
          Books
          <button onClick={toggleSortDirection} className="ml-2">
            {sortDirection === "ascending" ? (
              <span className="text-xl">&#8593;</span> 
            ) : (
              <span className="text-xl">&#8595;</span> 
            )}
          </button>
        </h1>
        <div className="flex items-center">
          <button
            className="btn btn-accent mx-2 rounded-full w-8 h-8 flex items-center justify-center text-sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <span className="text-xl">{'<'}</span>
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-accent mx-2 rounded-full w-8 h-8 flex items-center justify-center text-sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <span className="text-xl">{'>'}</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedBooks.map((book) => (
          <div key={book.id} className="card bg-base-100 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold">{book.title}</h2>
            <p className="mt-2 text-gray-600">{book.description}</p>
            <button className="btn btn-secondary mt-4" onClick={() => navigate(`/book/${book.id}`)}>
              View
            </button>
            <button className="btn btn-primary mt-4" onClick={() => addToCart(book.id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooksPage;
