import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { carts_api, movies_api } from "../../services/api";

const AllMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const userId = "5fdc6f3c-9374-4505-a754-d87f655538c3";

  const getAllMovies = async () => {
    try {
      const response = await axios.get(
        `${movies_api}/all?orderByColumn=title&orderByDirection=ascending`,
        {
          withCredentials: true,
        }
      );
      setMovies(response.data);
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
      console.log("Sending payload:", payload);
      const response = await axios.post(`${carts_api}/${userId}/add`, payload, {
        withCredentials: true,
      });
      alert("Movie has been added to your cart!");
    } catch (error) {
      console.error(
        "Failed to add movie to cart:",
        error.response?.data || error.message
      );
      alert(
        `Error: ${error.response?.data?.message || "Something went wrong!"}`
      );
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Movies</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="card bg-base-100 shadow-lg rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="mt-2 text-gray-600">{movie.description}</p>
            <button
              className="btn btn-secondary mt-4"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              View
            </button>
            <button
              className="btn btn-primary mt-4"
              onClick={() => addToCart(movie.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMoviesPage;
