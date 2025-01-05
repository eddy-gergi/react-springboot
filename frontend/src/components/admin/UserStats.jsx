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

  const adminId = sessionStorage.getItem("adminId");
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
      const updatedItem =
        category === "movies"
          ? movies.find((movie) => movie.id === id)
          : books.find((book) => book.id === id);

      console.log("Updated item:", updatedItem);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleSortChange = (column) => {
    if (!selectedCategory) return;

    const newSortDirection =
      sortColumn === column && sortDirection === "ascending"
        ? "descending"
        : "ascending";

    setSortColumn(column);
    setSortDirection(newSortDirection);

    const apiUrl =
      selectedCategory === "users"
        ? `${users_api}/all?orderByColumn=${column}&orderByDirection=${newSortDirection}`
        : selectedCategory === "movies"
        ? `${movies_api}/all?orderByColumn=${column}&orderByDirection=${newSortDirection}`
        : `${books_api}/all?orderByColumn=${column}&orderByDirection=${newSortDirection}`;

    axios.get(apiUrl).then((response) => {
      if (selectedCategory === "movies") {
        setMovies(response.data);
      } else if (selectedCategory === "books") {
        setBooks(response.data);
      } else if (selectedCategory === "users") {
        setUsers(response.data);
      }
    }).catch((error) => {
      console.error("Error sorting data:", error);
    });
  };

  const renderSortArrow = (column) => {
    if (sortColumn === column) {
      return sortDirection === "ascending" ? "↑" : "↓";
    }
    return "";
  };

  const renderTable = () => {
    if (selectedCategory === "users") {
      return (
        <div className="overflow-x-auto shadow-lg rounded-lg mt-4">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th
                  className="text-left cursor-pointer"
                  onClick={() => handleSortChange("name")}
                >
                  Name {renderSortArrow("name")}
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSortChange("email")}
                >
                  Email {renderSortArrow("email")}
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSortChange("role")}
                >
                  Role {renderSortArrow("role")}
                </th>
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
                <th
                  className="text-left cursor-pointer"
                  onClick={() => handleSortChange("title")}
                >
                  Title {renderSortArrow("title")}
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSortChange("director")}
                >
                  Director {renderSortArrow("director")}
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSortChange("releaseyear")}
                >
                  Year {renderSortArrow("releaseyear")}
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSortChange("genre")}
                >
                  Genre {renderSortArrow("genre")}
                </th>
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
                <th
                  className="text-left cursor-pointer"
                  onClick={() => handleSortChange("title")}
                >
                  Title {renderSortArrow("title")}
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSortChange("author")}
                >
                  Author {renderSortArrow("author")}
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSortChange("publishedyear")}
                >
                  Year {renderSortArrow("publishedyear")}
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSortChange("genre")}
                >
                  Genre {renderSortArrow("genre")}
                </th>
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
          className="p-6 bg-slate-700 rounded-lg shadow-lg text-center cursor-pointer hover:shadow-xl hover:ring-2 hover:ring-gray-500"
          onClick={() => handleCategoryClick("users")}
        >
          <h2 className="text-2xl font-bold">{users.length}</h2>
          <p>Registered Users</p>
        </div>

        <div
          className="p-6 bg-gray-700 rounded-lg shadow-lg text-center cursor-pointer hover:shadow-xl hover:ring-2 hover:ring-gray-500"
          onClick={() => handleCategoryClick("movies")}
        >
          <h2 className="text-2xl font-bold">{movies.length}</h2>
          <p>Movies Available</p>
        </div>

        <div
          className="p-6 bg-gray-700 rounded-lg shadow-lg text-center cursor-pointer hover:shadow-xl hover:ring-2 hover:ring-gray-500"
          onClick={() => handleCategoryClick("books")}
        >
          <h2 className="text-2xl font-bold">{books.length}</h2>
          <p>Books Available</p>
        </div>
      </div>

      {renderTable()}
    </div>
  );
};

export default UserStats;
