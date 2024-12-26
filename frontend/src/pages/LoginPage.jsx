import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/validation"; // Import validation schema
import SubmitButton from "../components/SubmitButton";
import CustomFormField from "../components/CustomFormField";
import axios from "axios";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Initialize useForm hook with Zod resolver
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
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email: values.email,
        password: values.password,
      });
      console.log("response: ", response.data);
  
      if (response.status === 200) {
        const user = response.data;
        const id = response.data.email;
        console.log("Login Successful:", id);
        sessionStorage.setItem("userId", id);
        navigate("/");
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
    <div className="max-w-md mx-auto mt-12 bg-base-300 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={form.handleSubmit(handleLogin)}>
        <CustomFormField
          name="email"
          control={form.control}
          label="Email"
          placeholder="Enter your email"
          fieldType="email"
          errorMessage={form.formState.errors.email?.message} // Display error message if validation fails
        />
        <CustomFormField
          name="password"
          control={form.control}
          label="Password"
          placeholder="Enter your password"
          fieldType="password"
          errorMessage={form.formState.errors.password?.message} // Display error message if validation fails
        />
        <button onClick={handleLogin}>Samira</button>
      </form>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 font-bold">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
