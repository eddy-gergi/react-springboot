// components/UserStats.jsx
import React from "react";

const UserStats = ({ usersCount, moviesCount, booksCount }) => {
  return (
    <div className="grid grid-cols-3 gap-6 mt-4">
      <div className="p-6 bg-blue-100 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold">{usersCount}</h2>
        <p>Registered Users</p>
      </div>

      <div className="p-6 bg-green-100 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold">{moviesCount}</h2>
        <p>Movies Available</p>
      </div>

      <div className="p-6 bg-yellow-100 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold">{booksCount}</h2>
        <p>Books Available</p>
      </div>
    </div>
  );
};

export default UserStats;
