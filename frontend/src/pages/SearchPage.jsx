import React, { useState } from "react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([
    { id: 1, title: "The Great Gatsby", type: "Book" },
    { id: 2, title: "Inception", type: "Movie" },
    { id: 3, title: "Moby Dick", type: "Book" },
    { id: 4, title: "Interstellar", type: "Movie" },
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredResults = results.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8 px-4">
      {/* Page Header */}
      <h1 className="text-4xl font-bold mb-4 text-center">Search</h1>

      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search for books or movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="input input-bordered input-primary w-full max-w-md rounded-lg py-3 text-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Search Results */}
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((item) => (
            <div
              key={item.id}
              className="rounded-lg shadow-lg overflow-hidden bg-slate-700 p-4 transition-transform duration-300 hover:scale-105 hover:bg-slate"
            >
              <h2 className="text-xl font-bold mb-2 truncate">{item.title}</h2>
              <p className="text-gray-600 mb-2 italic">{item.type}</p>

              <div className="mt-4 flex justify-between">
                <button className="btn btn-accent btn-sm px-4 py-2 rounded-lg hover:bg-accent">
                  Add to Cart
                </button>
                <button className="btn btn-outline btn-secondary btn-sm px-4 py-2 rounded-lg hover:bg-gray-200">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8 text-lg">
          No results found for <span className="font-bold">"{searchQuery}"</span>
        </p>
      )}
    </div>
  );
};

export default SearchPage;
