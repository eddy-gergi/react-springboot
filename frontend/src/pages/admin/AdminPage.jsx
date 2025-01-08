import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserStats from "../../components/admin/UserStats";
import AddMovieForm from "../../components/admin/AddMovieForm";
import AddBookForm from "../../components/admin/AddBookForm";
import AddAdminForm from "../../components/admin/AddAdminForm";
import AdminActions from "../../components/admin/AdminActions";



const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState("UserStats");
  const navigate = useNavigate();

  useEffect(() => {
    const adminId = sessionStorage.getItem("adminId");
    if (!adminId) {
      navigate("/not-allowed"); 
    }
  }, [navigate]);

  const handleSignOut = () => {
    sessionStorage.removeItem("adminId");
    alert("Signing out ...");
    navigate("/");
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "LibraryStats":
        return <UserStats />;
      case "AddMovie":
        return <AddMovieForm />;
      case "AddBook":
        return <AddBookForm />;
      case "AddAdmin":
        return <AddAdminForm />;
      case "AdminActions":
        return <AdminActions />;
      default:
        return <UserStats />;
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex">
      <div className="w-1/4 h-7 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Menu</h2>
        <nav>
          {[  
            { name: "Library Stats", key: "LibraryStats" },
            { name: "Add Movie", key: "AddMovie" },
            { name: "Add Book", key: "AddBook" },
            { name: "Add Admin", key: "AddAdmin" },
            { name: "Admin Actions", key: "AdminActions" },
            { name: "Sign Out", key: "SignOut" },
          ].map((option) => (
            <button
              key={option.key}
              onClick={
                option.key === "SignOut"
                  ? handleSignOut
                  : () => setSelectedOption(option.key)
              }
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
