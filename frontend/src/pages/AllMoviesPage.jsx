import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const getAllMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/movies/all", {
        withCredentials: true,
      });
      setMovies(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Movies</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="card bg-base-100 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="mt-2 text-gray-600">{movie.description}</p>
            <button className="btn btn-primary mt-4">Add to Cart</button>
            <button className="btn btn-secondary mt-4" onClick={()=> navigate(`/movie/${movie.id}`)}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMoviesPage;
