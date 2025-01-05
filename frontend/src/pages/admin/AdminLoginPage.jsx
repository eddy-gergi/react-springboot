import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { users_api } from "../../services/api"; 

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${users_api}/login`, {
        params: {
          email: values.email,
          password: values.password,
        },
      });

      if (response.status === 200 && response.data && response.data.role === "admin") { 
        sessionStorage.setItem("adminId", response.data.id); 
        navigate("/admin-dashboard"); 
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = { email, password };
    handleLogin(values); 
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="bg-base-100 shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">Admin Login</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={isLoading} 
          >
            {isLoading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="btn btn-outline mt-4 w-full"
        >
          ← Return to Home
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;
