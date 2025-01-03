import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { books_api, carts_api } from "../../services/api";

const BookComponent = () => {
  const { id } = useParams();
  const [media, setMedia] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userId = sessionStorage.getItem("userId");
  //const userId = "5fdc6f3c-9374-4505-a754-d87f655538c3";

  const findMedia = async () => {
    try {
      const response = await axios.get(books_api + "/" + id);
      setMedia(response.data);
    } catch (error) {
      console.error("Failed to fetch media:", error.message);
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(carts_api + "/" + userId + "/add", {
        mediaId: id,
        mediaType: "book",
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
  }, [id]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-5xl bg-base-100 rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-50">
          <img
            src={media.url}
            alt={media.title}
            className="w-full h-auto object-contain"
            style={{ maxHeight: "500px" }}
          />
        </div>
        <div className="p-6 flex flex-col justify-between md:w-1/2 w-full">
          <h1 className="text-3xl font-bold mb-2">
            {media.title || "Loading..."}
          </h1>
          <h2 className="text-gray-500 mb-4">
            {media.author}, {media.publishedyear}
          </h2>
          <h2 className="text-gray-500 mb-4">Genre: {media.genre}</h2>
          <p className="text-gray-600 mb-4">{media.description}</p>
          <button
            onClick={handleAddToCart}
            className={`btn btn-accent mt-4 w-1/2 self-start ${
              isLoading ? "btn-disabled loading" : ""
            }`}
            disabled={isLoading}
          >
            🛒 {isLoading ? "Adding to Cart..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookComponent;
