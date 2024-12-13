import React, { useState } from "react";
import axios from "axios";

const DeleteMovieForm = () => {
  const [movieId, setMovieId] = useState("");

  const handleDeleteMovie = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/movies/${movieId}`);
      alert(`Movie with ID ${movieId} has been successfully deleted.`);
      setMovieId("");
    } catch (error) {
      console.error("Failed to delete movie:", error.message);
      alert("Failed to delete the movie. Please check the ID and try again.");
    }
  };

  return (
    <div>
      <h2 className="text-center text-3xl mt-4">Delete Movie</h2>
      <input
        type="text"
        placeholder="Enter Movie ID"
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
        className="input mt-4"
      />
      <button
        onClick={handleDeleteMovie}
        className="btn btn-error mt-4"
      >
        Delete Movie
      </button>
    </div>
  );
};

export default DeleteMovieForm;
