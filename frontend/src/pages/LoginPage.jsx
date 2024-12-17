import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/validation";
import SubmitButton from "../components/SubmitButton";
import CustomFormField from "../components/CustomFormField";
import axios from "axios";
import { users_api } from "../services/api";

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
    console.log("Form submitted with values:", values); 

    setIsLoading(true);

    try {

      const response = await axios.get('http://localhost:8080/api/users/login', {
        email: values.email,
        password: values.password,
      });

      console.log("Response received:", response);
      const id = response.data.id;
      sessionStorage.setItem("userId", id);

      console.log("Login Successful! Redirecting...");
      navigate("/cart"); 
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
          fieldType="email"
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          fieldType="password"
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          iconSrc="/assets/icons/password.svg"
          iconAlt="password"
        />

        <SubmitButton isLoading={isLoading}>Log In</SubmitButton>
      </form>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 font-bold">
          Sign Up
        </Link>
        <br />
        Are you an admin?{" "}
        <Link to="/adminlogin" className="text-blue-500 font-bold">
          Press Here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
