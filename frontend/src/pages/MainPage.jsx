import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { books_api, movies_api, users_api } from "../services/api";

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const getAllBooks = async () => {
    try {
      const offset = Math.floor(Math.random() * 20);
      const response = await axios.get(
        `${books_api}/all?orderByDirection=descending&limit=4&offset=${offset}`
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error.message);
    }
  };

  const getAllMovies = async () => {
    try {
      const offset = Math.floor(Math.random() * 20);
      const response = await axios.get(
        `${movies_api}/all?orderByDirection=descending&limit=4&offset=${offset}`
      );
      setMovies(response.data);
    } catch (error) {
      console.error("Failed to fetch movies:", error.message);
    }
  };

  const getUserName = async () => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      try {
        const response = await axios.get(`${users_api}/${userId}`);
        const firstName = response.data.name.split(" ")[0];
        setUserName(firstName);
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
      }
    }
  };

  useEffect(() => {
    getAllBooks();
    getAllMovies();
    getUserName();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center">
      <header className="text-center bg-base-100 shadow-xl rounded-lg p-10 mt-8 max-w-4xl w-full mx-4">
        <h1 className="text-6xl font-extrabold text-primary mb-4">
          {userName ? `Welcome ${userName} 😎` : "Welcome to LibraFlick"}
        </h1>
        <p className="text-gray-700 text-xl mb-6">
          Explore your favorite movies, books, and more!
        </p>
        <div className="flex justify-center gap-8">
          <a
            href="/books"
            className="btn btn-accent px-8 py-3 rounded-lg hover:bg-accent hover:text-black transition-all"
          >
            📚 View Books
          </a>
          <a
            href="/movies"
            className="btn btn-secondary px-8 py-3 rounded-lg hover:bg-secondary hover:text-black transition-all"
          >
            🎬 View Movies
          </a>
        </div>
      </header>

      <div className="w-full max-w-6xl mx-auto p-4 mt-12">
        <p className="text-5xl text-center font-bold text-primary mb-8">
          🎬 Movies
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="card card-compact bg-gray-300 hover:bg-gray-400 shadow-xl transition-all"
            >
              <figure>
                <img
                  src={movie.url}
                  alt={movie.title}
                  className="object-cover h-48 w-full rounded-t-lg"
                />
              </figure>
              <div className="card-body p-4 flex flex-col items-center">
                <h2 className="card-title text-xl text-center text-gray-800 truncate max-w-full overflow-hidden">
                  {movie.title}
                </h2>
                <div className="text-center text-sm text-gray-600">
                  <p>{movie.director}</p>
                  <p>{movie.releaseyear}</p>
                </div>
                <div className="card-actions justify-center mt-4">
                  <button
                    className="btn btn-outline btn-primary w-full"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    View Movie
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto p-4 mt-12">
        <p className="text-5xl text-center font-bold text-primary mb-8">
          📚 Books
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="card card-compact bg-gray-300 hover:bg-gray-400 shadow-xl transition-all"
            >
              <figure>
                <img
                  src={book.url}
                  alt={book.title}
                  className="object-cover h-48 w-full rounded-t-lg"
                />
              </figure>
              <div className="card-body p-4 flex flex-col items-center">
                <h2 className="card-title text-xl text-center text-gray-800 truncate max-w-full overflow-hidden">
                  {book.title}
                </h2>
                <div className="text-center text-sm text-gray-600">
                  <p>{book.author}</p>
                  <p>{book.publishedyear}</p>
                </div>
                <div className="card-actions justify-center mt-4">
                  <button
                    className="btn btn-outline btn-primary w-full"
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    View Book
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
