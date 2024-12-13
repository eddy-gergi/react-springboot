// src/pages/AllMoviesPage.jsx
import React from "react";

const AllMoviesPage = () => {
  const movies = [
    { id: 1, title: "Inception", description: "Mind-bending thriller" },
    { id: 2, title: "The Matrix", description: "Reality and illusion clash" },
    { id: 3, title: "Interstellar", description: "Space and time adventure" },
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Movies</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="card bg-base-100 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="mt-2 text-gray-600">{movie.description}</p>
            <button className="btn btn-primary mt-4">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMoviesPage;
