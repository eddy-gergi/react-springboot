import React, { useState } from "react";
import UserStats from "../components/admin/UserStats";
import AddMovieForm from "../components/admin/AddMovieForm";
import AddBookForm from "../components/admin/AddBookForm";
import AddAdminForm from "../components/admin/AddAdminForm";
import DeleteMovieForm from "../components/admin/DeleteMovieForm";
import DeleteAdminForm from "../components/admin/DeleteAdminForm";
import DeleteBookForm from "../components/admin/DeleteBookForm";
import SignOutButton from "../components/admin/SignOutButton";

const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState("UserStats");

  const renderContent = () => {
    switch (selectedOption) {
      case "UserStats":
        return <UserStats usersCount={120} moviesCount={50} booksCount={80} />;
      case "AddMovie":
        return <AddMovieForm />;
      case "AddBook":
        return <AddBookForm />;
      case "AddAdmin":
        return <AddAdminForm />;
      case "DeleteMovie":
        return <DeleteMovieForm />;
      case "DeleteAdmin":
        return <DeleteAdminForm />;
      case "DeleteBook":
        return <DeleteBookForm />;
      case "SignOut":
        return <SignOutButton />;
      default:
        return <UserStats usersCount={120} moviesCount={50} booksCount={80} />;
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex">
      <div className="w-1/4 h-7  text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Menu</h2>
        <nav>
          {[
            { name: "User Stats", key: "UserStats" },
            { name: "Add Movie", key: "AddMovie" },
            { name: "Add Book", key: "AddBook" },
            { name: "Add Admin", key: "AddAdmin" },
            { name: "Delete Movie", key: "DeleteMovie" },
            { name: "Delete Admin", key: "DeleteAdmin" },
            { name: "Delete Book", key: "DeleteBook" },
            { name: "Sign Out", key: "SignOut" }
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => setSelectedOption(option.key)}
              className={`w-full text-left mt-2 p-2 rounded hover:bg-gray-700 ${
                selectedOption === option.key ? "bg-gray-800" : "hover:bg-gray-700"
              }`}
            >
              {option.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="w-3/4 p-6 overflow-auto bg-base-100">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;
