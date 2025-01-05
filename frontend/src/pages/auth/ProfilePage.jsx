import React, { useEffect, useState } from "react";
import axios from "axios";
import { users_api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${users_api}/${userId}`, { withCredentials: true });
        setUserData(response.data);
        setFormData({ name: response.data.name, email: response.data.email, password: response.data.password });
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      navigate("/login");
    }
  }, [userId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${users_api}/${userId}`, formData, { withCredentials: true });
      setUserData(formData);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error.message);
      alert("Error: Could not update profile.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${users_api}/${userId}`, { withCredentials: true });
      sessionStorage.removeItem("userId");
      navigate("/login");
      alert("Account deleted successfully.");
    } catch (error) {
      console.error("Failed to delete account:", error.message);
      alert("Error: Could not delete account.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (loading) {
    return <div className="container mx-auto mt-8 text-center">Loading...</div>;
  }

  if (!userData) {
    return <div className="container mx-auto mt-8 text-center">User not found</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-6 bg-base-100 shadow-lg rounded-lg flex md:flex-row flex-col">
      <div className="w-full md:w-1/3 bg-gray-800 p-8 rounded-lg flex flex-col items-center justify-between space-y-6">
        <div className="w-40 h-40 rounded-full bg-primary text-white flex items-center justify-center text-5xl font-bold">
          {userData.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="flex flex-col space-y-6 w-full">
          <button onClick={() => setEditing(true)} className="btn btn-primary w-full text-lg py-3">
            Edit Profile
          </button>
          <button onClick={handleDeleteAccount} className="btn btn-danger  w-full text-lg py-3">
            Delete Account
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("userId");
              navigate("/login");
            }}
            className="btn btn-warning w-full text-lg py-3"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="w-full md:w-2/3 p-8 bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-5xl font-bold text-primary mb-8">Profile</h1>
        <div className="space-y-6">
          <div>
            <label className="font-bold text-gray-600 block text-lg">Name</label>
            {editing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full text-xl p-3"
              />
            ) : (
              <p className="text-xl">{userData.name || "N/A"}</p>
            )}
          </div>
          <div>
            <label className="font-bold text-gray-600 block text-lg">Email</label>
            {editing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered w-full text-xl p-3"
              />
            ) : (
              <p className="text-xl">{userData.email || "N/A"}</p>
            )}
          </div>
          <div>
            <label className="font-bold text-gray-600 block text-lg">Password</label>
            {editing ? (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input input-bordered w-full text-xl p-3"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                </span>
              </div>
            ) : (
              <p className="text-xl">{userData.password ? "●●●●●●" : "N/A"}</p>
            )}
          </div>
        </div>
        {editing && (
          <div className="mt-8 flex space-x-4">
            <button onClick={handleUpdate} className="btn btn-primary text-lg py-2 px-6">
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setFormData({ name: userData.name, email: userData.email, password: userData.password });
              }}
              className="btn btn-secondary text-lg py-2 px-6"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
