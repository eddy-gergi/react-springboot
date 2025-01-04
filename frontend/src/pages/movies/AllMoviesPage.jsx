import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { carts_api, movies_api } from "../../services/api";

const AllMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortDirection, setSortDirection] = useState("ascending");
  const moviesPerPage = 6;
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const getAllMovies = async () => {
    try {
      const response = await axios.get(
        `${movies_api}/all?orderByColumn=title&orderByDirection=${sortDirection}`,
        { withCredentials: true }
      );
      setMovies(response.data);
      setTotalPages(Math.ceil(response.data.length / moviesPerPage));
    } catch (error) {
      console.error("Failed to fetch movies:", error.message);
    }
  };

  const addToCart = async (id) => {
    try {
      const payload = {
        mediaId: id,
        mediaType: "movie",
      };
      const response = await axios.post(`${carts_api}/${userId}/add`, payload, {
        withCredentials: true,
      });
      alert("Movie has been added to your cart!");
    } catch (error) {
      console.error("Failed to add movie to cart:", error.response?.data || error.message);
      alert("Error: Something went wrong!");
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "ascending" ? "descending" : "ascending"));
  };

  useEffect(() => {
    getAllMovies();
  }, [sortDirection]);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold flex items-center">
          Movies
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
        {displayedMovies.map((movie) => (
          <div key={movie.id} className="card bg-base-100 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="mt-2 text-gray-600">{movie.description}</p>
            <button className="btn btn-secondary mt-4" onClick={() => navigate(`/movie/${movie.id}`)}>
              View
            </button>
            <button className="btn btn-primary mt-4" onClick={() => addToCart(movie.id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMoviesPage;
