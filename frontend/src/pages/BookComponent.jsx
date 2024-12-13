import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookComponent = () => {
  const { id } = useParams();
  const [media, setMedia] = useState({});

  const findMedia = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/books/${id}`);
      setMedia(response.data);
    } catch (error) {
      console.error("Failed to fetch media:", error.message);
    }
  };

  useEffect(() => {
    findMedia();
  }, []);

  const handleAddToCart = () => {
    alert(`${media.title} has been added to your cart`);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-5xl bg-base-100 rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Image container */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-50">
          <img
            src={media.url}
            alt={media.title}
            className="w-full h-auto object-contain"
            style={{ maxHeight: "500px" }} // Ensures the image scales proportionally
          />
        </div>
        <div className="p-6 flex flex-col justify-between md:w-1/2 w-full">
          <h1 className="text-3xl font-bold mb-2">{media.title}</h1>
          <h2 className="text-gray-500 mb-4">
            {media.author}, {media.publishedyear}
          </h2>
          <p className="text-gray-600 mb-4">{media.description}</p>
          <button
            onClick={handleAddToCart}
            className="btn btn-accent mt-4 w-1/2 self-start"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookComponent;
