import React, { useState, useEffect } from "react";
import axios from "axios";
import { users_api, books_api, movies_api, admin_actions_api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const UserStats = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("ascending");
  const navigate = useNavigate();

  const adminId = "4be62897-6e9a-43ab-a488-d366859fa020";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, moviesResponse, booksResponse] =
          await Promise.all([
            axios.get(users_api + "/all"),
            axios.get(movies_api + "/all"),
            axios.get(books_api + "/all"),
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
        category === "movies" ? `${movies_api}/${id}` : `${books_api}/${id}`;

      await axios.delete(apiUrl);

      const deletedItem =
        category === "movies"
          ? movies.find((movie) => movie.id === id)
          : books.find((book) => book.id === id);

      if (category === "movies") {
        setMovies(movies.filter((movie) => movie.id !== id));
      } else if (category === "books") {
        setBooks(books.filter((book) => book.id !== id));
      }

      const actionInfo = `Deleted ${category.slice(0, -1)}: ${deletedItem.title}`;
      const actionTimestamp = new Date().toISOString();

      const actionPayload = {
        adminId,
        actionInfo,
        actionTimestamp,
      };

      await axios.post(admin_actions_api + "/add", actionPayload);
      console.log("Admin action logged:", actionPayload);
    } catch (error) {
      console.error("Error deleting item or logging action:", error);
    }
  };

  const handleUpdate = async (id, category) => {
    try {
      // Add logic for updating the item (either book or movie)
      const updatedItem =
        category === "movies"
          ? movies.find((movie) => movie.id === id)
          : books.find((book) => book.id === id);

      console.log("Updated item:", updatedItem);
      // This is a placeholder action, you can add actual logic for updating the item
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleSortChange = async () => {
    if (!sortColumn || !selectedCategory) return;

    try {
      const apiUrl =
        selectedCategory === "movies"
          ? `${movies_api}/all?orderByColumn=${sortColumn}&orderByDirection=${sortDirection}`
          : `${books_api}/all?orderByColumn=${sortColumn}&orderByDirection=${sortDirection}`;

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
              className="select select-bordered select-sm"
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
              className="select select-bordered select-sm"
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
        <div className="overflow-x-auto shadow-lg rounded-lg mt-4">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="font-semibold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (selectedCategory === "movies") {
      return (
        <div className="overflow-x-auto shadow-lg rounded-lg mt-4">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th className="text-left">Title</th>
                <th>Director</th>
                <th>Year</th>
                <th>Genre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td className="font-semibold">{movie.title}</td>
                  <td>{movie.director}</td>
                  <td>{movie.releaseyear}</td>
                  <td>{movie.genre}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(movie.id, "movies")}
                      className="btn btn-error btn-sm mr-2"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => navigate(`/admin-dashboard/update-movie/${movie.id}`)}
                      className="btn btn-warning btn-sm"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (selectedCategory === "books") {
      return (
        <div className="overflow-x-auto shadow-lg rounded-lg mt-4">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th className="text-left">Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Genre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="font-semibold">{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publishedyear}</td>
                  <td>{book.genre}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(book.id, "books")}
                      className="btn btn-error btn-sm mr-2"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => navigate(`/admin-dashboard/update-book/${book.id}`)}
                      className="btn btn-warning btn-sm"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto mt-8">
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
