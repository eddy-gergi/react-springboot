import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { books_api, movies_api } from "../../services/api";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchResults = async () => {
    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }

    setIsLoading(true);

    try {
      const [booksResponse, moviesResponse] = await Promise.all([
        axios.get(`${books_api}/all?search=${searchQuery}`),
        axios.get(`${movies_api}/all?search=${searchQuery}`),
      ]);

      const books = booksResponse.data.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        publishedyear: book.publishedyear,
        type: "Book",
      }));

      const movies = moviesResponse.data.map((movie) => ({
        id: movie.id,
        title: movie.title,
        director: movie.director,
        genre: movie.genre,
        releaseyear: movie.releaseyear,
        type: "Movie",
      }));

      setResults([...books, ...movies]);
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleView = (item) => {
    if (item.type === "Movie") {
      navigate(`/movie/${item.id}`);
    } else if (item.type === "Book") {
      navigate(`/book/${item.id}`);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Search</h1>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search for books or movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="input input-bordered input-primary w-full max-w-md rounded-lg py-3 text-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {isLoading && (
        <p className="text-center text-gray-600 mt-4">Loading...</p>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <div
              key={item.id}
              className="rounded-lg shadow-lg overflow-hidden bg-slate-700 p-4 transition-transform duration-300 hover:scale-105 hover:bg-slate"
            >
              <h2 className="text-xl font-bold mb-2 truncate">{item.title}</h2>
              <p className="text-gray-500 mb-2 italic">{item.type}</p>

              {item.type === "Book" && (
                <>
                  <p className="text-gray-100 mb-2">
                    <strong>Author:</strong> {item.author}
                  </p>
                  <p className="text-gray-100 mb-2">
                    <strong>Genre:</strong> {item.genre}
                  </p>
                  <p className="text-gray-100 mb-2">
                    <strong>Published Year:</strong> {item.publishedyear}
                  </p>
                </>
              )}
              {item.type === "Movie" && (
                <>
                  <p className="text-gray-100 mb-2">
                    <strong>Director:</strong> {item.director}
                  </p>
                  <p className="text-gray-100 mb-2">
                    <strong>Genre:</strong> {item.genre}
                  </p>
                  <p className="text-gray-100 mb-2">
                    <strong>Release Year:</strong> {item.releaseyear}
                  </p>
                </>
              )}

              <div className="mt-4 flex justify-between">
                <button
                  className="btn btn-outline btn-secondary btn-sm px-4 py-2 rounded-lg hover:bg-gray-200"
                  onClick={() => handleView(item)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="text-center text-gray-600 mt-8 text-lg">
            No results found for{" "}
            <span className="font-bold">"{searchQuery}"</span>
          </p>
        )
      )}
    </div>
  );
};

export default SearchPage;
