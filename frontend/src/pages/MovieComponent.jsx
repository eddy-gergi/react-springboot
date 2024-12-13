import axios from "axios";
import React, { useEffect , useState} from "react";
import { useParams } from "react-router-dom";


const MovieComponent = () => {
  const {id} = useParams();
  const [media, setMedia] = useState([]);

  const findMedia = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/books/${id}`);
      setMedia(response.data);
      
    } catch (error) {
      console.error("Failed to fetch media:", error.message);
    }
  }
  
  useEffect(() => {
    findMedia();
  }, []);

  const handleAddToCart = () => {
    alert(`${movie.title} has been added to your cart`);
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
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
