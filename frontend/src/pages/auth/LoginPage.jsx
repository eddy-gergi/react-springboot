import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValidation } from "../../lib/validation";
import axios from "axios";
import CustomFormField from "../../components/CustomFormField";
import SubmitButton from "../../components/SubmitButton";
import { users_api } from "../../services/api";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${users_api}/login`, {
        params: {
          email: values.email,
          password: values.password,
        },
      });

      if (response.status === 200 && response.data) {
        sessionStorage.setItem("userId", response.data.id);
        navigate("/");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch {
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 rounded-lg shadow-lg bg-base-300">
      <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <CustomFormField
          name="email"
          control={form.control}
          label="Email"
          placeholder="Enter your email"
          fieldType="email"
          errorMessage={form.formState.errors.email?.message}
        />
        <CustomFormField
          name="password"
          control={form.control}
          label="Password"
          placeholder="Enter your password"
          fieldType="password"
          errorMessage={form.formState.errors.password?.message}
        />
        <SubmitButton isLoading={isLoading}>Login</SubmitButton>
      </form>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 font-bold">
          Sign Up
        </Link>
        <br />
        Are you an admin?{" "}
        <Link to="/adminlogin" className="text-blue-500 font-bold">
          Click here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
