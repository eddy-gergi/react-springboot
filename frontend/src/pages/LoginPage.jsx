import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/validation";
import SubmitButton from "../components/SubmitButton";
import CustomFormField from "../components/CustomFormField";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

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
      console.log("Logging in with:", values);
      // Call your login API endpoint here
      // await loginUser(values);
    } catch (error) {
      console.error("Login Error:", error);
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
        Are you an admin?
        <Link to="/adminlogin" className="text-blue-500 font-bold"> Press Here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
