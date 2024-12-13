import React from "react";

const RankingPage = () => {
  const rankings = [
    { id: 1, title: "Inception", rating: 5 },
    { id: 2, title: "1984", rating: 4.5 },
    { id: 3, title: "The Great Gatsby", rating: 4.8 },
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Top Rankings</h1>
      {rankings.map((item) => (
        <div key={item.id} className="card bg-base-100 shadow-lg rounded-lg p-6 mb-4">
          <h2 className="text-2xl font-bold">{item.title}</h2>
          <p>Rating: ⭐ {item.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default RankingPage;
