import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { carts_api, rankings_api } from "../../services/api";

const MovieComponent = () => {
  const { id } = useParams();
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const userId = sessionStorage.getItem("userId");

  const findMedia = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/movies/${id}`);
      setMedia(response.data);
    } catch (error) {
      console.error("Failed to fetch media:", error.message);
    }
  };

  const findAverageRating = async () => {
    try {
      const response = await axios.get(`${rankings_api}/${id}`);
      const rankings = response.data;
      const totalRating = rankings.reduce((sum, ranking) => sum + ranking.ranking, 0);
      const average = rankings.length > 0 ? totalRating / rankings.length : 0;
      setAverageRating(isNaN(average) ? 0 : average.toFixed(1));
    } catch (error) {
      console.error("Failed to fetch average ranking:", error.message);
      setAverageRating(0);
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${carts_api}/${userId}/add`, {
        mediaId: id,
        mediaType: "movie",
      });
      alert(`${media.title} has been added to your cart!`);
    } catch (error) {
      console.error("Failed to add media to cart:", error.message);
      alert("There was an error adding the media to your cart.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findMedia();
    findAverageRating();
  }, [id]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="max-w-4xl bg-base-100 rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Image */}
        <div className="h-full w-full md:w-1/2 overflow-hidden">
          <img
            src={media.url}
            alt={media.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Movie Details */}
        <div className="p-6 flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-2">{media.title}</h1>
          <h2 className="text-gray-500 mb-4">
            {media.director}, {media.releaseyear}
          </h2>
          <h2 className="text-gray-500 mb-4">
            Genre: {media.genre}
          </h2>
          <p className="text-gray-600 mb-4">{media.description}</p>
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Average Rating: ⭐ {averageRating || 0}
          </p>
          <button
            onClick={handleAddToCart}
            className={`btn btn-accent mt-4 w-1/2 self-start ${isLoading ? "btn-disabled loading" : ""}`}
            disabled={isLoading}
          >
            🛒 {isLoading ? "Adding to Cart..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
