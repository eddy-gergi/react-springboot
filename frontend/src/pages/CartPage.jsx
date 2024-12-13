import React, { useState } from "react";

const CartPage = () => {
  const initialCartItems = [
    { id: 1, title: "The Great Gatsby", type: "Book", rating: 0 },
    { id: 2, title: "Inception", type: "Movie", rating: 0 },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  // Handle ranking change
  const handleRatingChange = (id, rating) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, rating } : item
      )
    );
  };

  // Handle item removal
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Your Cart</h1>

      {/* Cart Items */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th className="text-left">Item</th>
              <th>Type</th>
              <th>Ranking</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="font-semibold">{item.title}</td>
                <td>{item.type}</td>
                <td>
                  <select
                    value={item.rating}
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

      {/* Feedback Section */}
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
            Your rankings helps us recommend better content for you.
          </p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
