import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieComponent = () => {
  const { id } = useParams();
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = "5fdc6f3c-9374-4505-a754-d87f655538c3";
  const carts_api = "http://localhost:8080/api/carts";

  const findMedia = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/movies/${id}`);
      setMedia(response.data);
    } catch (error) {
      console.error("Failed to fetch media:", error.message);
    }
  };

  useEffect(() => {
    findMedia();
  }, []);

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

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="max-w-4xl bg-base-100 rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
        <img
          src={media.url}
          alt={media.title}
          className="h-64 w-full object-cover md:w-1/2"
        />
        <div className="p-6 flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-2">{media.title}</h1>
          <p className="text-gray-600 mb-4">{media.description}</p>
          <button
            onClick={handleAddToCart}
            className="btn btn-accent mt-4 w-1/2 self-start"
            disabled={isLoading}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
