import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { carts_api, book_api, movie_api } from "../services/api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [mediaDetails, setMediaDetails] = useState({});

  const getCartItems = async () => {
    try {
      const response = await axios.get(`${carts_api}/5fdc6f3c-9374-4505-a754-d87f655538c3`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const getMediaDetails = async () => {
    try {
      const mediaDetailsMap = {};
      for (const item of cartItems) {
        const api = item.mediaType === "book" ? book_api : movie_api;
        const response = await axios.get(`${api}/${item.mediaId}`);
        mediaDetailsMap[item.id] = response.data;
      }
      setMediaDetails(mediaDetailsMap);
    } catch (error) {
      console.error("Error fetching media details:", error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      getMediaDetails();
    }
  }, [cartItems]);

  const handleRatingChange = (id, rating) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, rating } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    if (isToday(date)) {
      return `Today, ${format(date, "p")}`;
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, "p")}`;
    } else {
      return format(date, "MMM d, yyyy, p");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Your Cart</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th className="text-left">Item</th>
              <th>Type</th>
              <th>Ranking</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="font-semibold">
                  {mediaDetails[item.id]?.title || "Loading..."}
                </td>
                <td>{item.mediaType}</td>
                <td>
                  <select
                    value={item.rating || 0}
                    onChange={(e) => handleRatingChange(item.id, parseInt(e.target.value))}
                    className="select select-bordered select-sm"
                  >
                    <option value={0}>Select</option>
                    <option value={1}>⭐</option>
                    <option value={2}>⭐⭐</option>
                    <option value={3}>⭐⭐⭐</option>
                    <option value={4}>⭐⭐⭐⭐</option>
                    <option value={5}>⭐⭐⭐⭐⭐</option>
                  </select>
                </td>
                <td>{formatDate(item.addedAt)}</td>
                <td>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="btn btn-error btn-sm"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center mt-8">
          <h2 className="text-2xl font-semibold text-gray-600">
            Your cart is empty! 🛒
          </h2>
        </div>
      ) : (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold text-primary">
            Thank you for ranking your favorites! 🌟
          </h2>
          <p className="text-gray-600">
            Your rankings help us recommend better content for you.
          </p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
