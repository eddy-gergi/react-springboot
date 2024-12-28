import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/validation"; 
import SubmitButton from "../components/SubmitButton";
import CustomFormField from "../components/CustomFormField";
import axios from "axios";
import { users_api } from "../services/api"; // Assuming the API endpoint is in this file

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${users_api}/login`, {
        email: values.email,
        password: values.password,
      });

      console.log("Login Successful:", response.data);
      if (response.status === 200) {
        // Store the user information or token in the sessionStorage or context
        sessionStorage.setItem("userId", response.data.id);
        navigate("/"); // Redirect to home or dashboard after successful login
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={form.handleSubmit(handleLogin)}>
        <CustomFormField
          name="email"
          control={form.control}
          label="Email"
          placeholder="Enter your email"
          fieldType="email"
          errorMessage={form.formState.errors.email?.message}
          icon="src/assets/email.svg" 
        />
        <CustomFormField
          name="password"
          control={form.control}
          label="Password"
          placeholder="Enter your password"
          fieldType="password"
          errorMessage={form.formState.errors.password?.message}
          icon="src/assets/password.svg"
        />
        
        {/* Submit button */}
        <button type="submit" className="btn btn-primary w-full mt-4" disabled={isLoading}>Login</button>
      </form>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 font-bold">
          Sign Up
        </Link>
        <br />
        Are you an admin? If yes, {" "}
        <Link to="/adminlogin" className="text-blue-500 font-bold">
          Click here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
