import React, { useState, useEffect } from "react";
import axios from "axios";

const UserStats = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("ascending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, moviesResponse, booksResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/users/all"),
          axios.get("http://localhost:8080/api/movies/all"),
          axios.get("http://localhost:8080/api/books/all"),
        ]);
        setUsers(usersResponse.data);
        setMovies(moviesResponse.data);
        setBooks(booksResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSortColumn(null);
    setSortDirection("ascending");
  };

  const handleDelete = async (id, category) => {
    try {
      const apiUrl =
        category === "movies"
          ? `http://localhost:8080/api/movies/${id}`
          : `http://localhost:8080/api/books/${id}`;

      await axios.delete(apiUrl);

      if (category === "movies") {
        setMovies(movies.filter((movie) => movie.id !== id));
      } else if (category === "books") {
        setBooks(books.filter((book) => book.id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSortChange = async () => {
    if (!sortColumn || !selectedCategory) return;

    try {
      const apiUrl =
        selectedCategory === "movies"
          ? `http://localhost:8080/api/movies/all?orderByColumn=${sortColumn}&orderByDirection=${sortDirection}`
          : `http://localhost:8080/api/books/all?orderByColumn=${sortColumn}&orderByDirection=${sortDirection}`;

      const response = await axios.get(apiUrl);

      if (selectedCategory === "movies") {
        setMovies(response.data);
      } else if (selectedCategory === "books") {
        setBooks(response.data);
      }
    } catch (error) {
      console.error("Error sorting data:", error);
    }
  };

  useEffect(() => {
    handleSortChange();
  }, [sortColumn, sortDirection]);

  const renderSortDropdown = () => {
    if (selectedCategory === "movies" || selectedCategory === "books") {
      const columns =
        selectedCategory === "movies"
          ? ["title", "director", "releaseyear", "genre"]
          : ["title", "author", "publishedyear", "genre"];

      return (
        <div className="mt-4 flex items-center gap-4">
          <div>
            <label htmlFor="sortColumnDropdown" className="mr-2">
              Sort by:
            </label>
            <select
              id="sortColumnDropdown"
              value={sortColumn || ""}
              onChange={(e) => setSortColumn(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="" disabled>
                Select column
              </option>
              {columns.map((column) => (
                <option key={column} value={column}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sortDirectionDropdown" className="mr-2">
              Direction:
            </label>
            <select
              id="sortDirectionDropdown"
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderTable = () => {
    if (selectedCategory === "users") {
      return (
        <table className="min-w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (selectedCategory === "movies") {
      return (
        <table className="min-w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Director</th>
              <th className="px-4 py-2 border">Year</th>
              <th className="px-4 py-2 border">Genre</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td className="px-4 py-2 border">{movie.title}</td>
                <td className="px-4 py-2 border">{movie.director}</td>
                <td className="px-4 py-2 border">{movie.releaseyear}</td>
                <td className="px-4 py-2 border">{movie.genre}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(movie.id, "movies")}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (selectedCategory === "books") {
      return (
        <table className="min-w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Author</th>
              <th className="px-4 py-2 border">Year</th>
              <th className="px-4 py-2 border">Genre</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td className="px-4 py-2 border">{book.title}</td>
                <td className="px-4 py-2 border">{book.author}</td>
                <td className="px-4 py-2 border">{book.publishedyear}</td>
                <td className="px-4 py-2 border">{book.genre}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(book.id, "books")}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return null;
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mt-4">
        <div
          className="p-6 bg-blue-100 rounded-lg shadow-lg text-center cursor-pointer hover:shadow-xl hover:ring-2 hover:ring-blue-500"
          onClick={() => handleCategoryClick("users")}
        >
          <h2 className="text-2xl font-bold">{users.length}</h2>
          <p>Registered Users</p>
        </div>

        <div
          className="p-6 bg-green-100 rounded-lg shadow-lg text-center cursor-pointer hover:shadow-xl hover:ring-2 hover:ring-green-500"
          onClick={() => handleCategoryClick("movies")}
        >
          <h2 className="text-2xl font-bold">{movies.length}</h2>
          <p>Movies Available</p>
        </div>

        <div
          className="p-6 bg-yellow-100 rounded-lg shadow-lg text-center cursor-pointer hover:shadow-xl hover:ring-2 hover:ring-yellow-500"
          onClick={() => handleCategoryClick("books")}
        >
          <h2 className="text-2xl font-bold">{books.length}</h2>
          <p>Books Available</p>
        </div>
      </div>

      {renderSortDropdown()}
      {renderTable()}
    </div>
  );
};

export default UserStats;
