import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const getAllBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/books/all?orderByDirection=descending&limit=3"
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error.message);
    }
  };

  const getAllMovies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/movies/all?orderByDirection=descending&limit=3"
      );
      setMovies(response.data);
    } catch (error) {
      console.error("Failed to fetch movies:", error.message);
    }
  };

  useEffect(() => {
    getAllBooks();
    getAllMovies();
  }, []);

  return (
    <div className="min-h-screen bg-slate flex flex-col items-center">
      <div className="text-center bg-base-100 shadow-xl rounded-lg p-8 mt-8 max-w-4xl w-full mx-4">
        <h1 className="text-5xl font-bold text-primary mb-2">
          Welcome to LibraFlick
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Explore your favorite movies, books, and more!
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <a
            href="/books"
            className="btn btn-accent px-6 py-2 rounded-lg hover:bg-accent hover:text-black transition-all"
          >
            📚 View Books
          </a>
          <a
            href="/movies"
            className="btn btn-secondary px-6 py-2 rounded-lg hover:bg-secondary hover:text-black transition-all"
          >
            🎬 View Movies
          </a>
        </div>
      </div>
      {/* Movies Section */}
      <div className="mt-12 w-full max-w-6xl mx-auto p-4">
        <p className="text-5xl text-center font-bold text-primary mb-4">
          🎬 Movies
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="rounded-lg shadow-lg overflow-hidden flex flex-col h-96 bg-gray-50"
            >
              <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={movie.imgUrl}
                  alt={movie.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-lg text-center truncate">
                  {movie.title}
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    className="btn btn-outline btn-secondary px-4 py-2"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Books Section */}
      <div className="mt-12 w-full max-w-6xl mx-auto p-4">
        <p className="text-5xl text-center font-bold text-primary mb-4">
          📚 Books
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="rounded-lg shadow-lg overflow-hidden flex flex-col h-96 bg-gray-50"
            >
              <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={book.url}
                  alt={book.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <p className="font-bold text-lg text-center truncate">
                  {book.title}
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    className="btn btn-outline btn-secondary px-4 py-2"
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
