import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/validation"; 
import SubmitButton from "../components/SubmitButton";
import CustomFormField from "../components/CustomFormField";
import axios from "axios";
import { users_api } from "../services/api";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (values) => {
    setIsLoading(true);

    try {
      const response = await axios.post(users_api, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      console.log("Sign-Up Successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Sign-Up Error:", error.response?.data || error.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 rounded-lg shadow-lg bg-base-300">
      <h2 className="text-center text-2xl font-bold mb-4">Create Account</h2>

      <form onSubmit={form.handleSubmit(handleSignUp)}>
        {/* Name Input with Icon */}
        <CustomFormField
          name="name"
          control={form.control}
          label="Full Name"
          placeholder="Enter your full name"
          fieldType="text"
          errorMessage={form.formState.errors.name?.message} 
          icon="src/assets/user.svg" // Add your icon path
        />

        {/* Email Input with Icon */}
        <CustomFormField
          name="email"
          control={form.control}
          label="Email"
          placeholder="Enter your email"
          fieldType="email"
          errorMessage={form.formState.errors.email?.message} 
          icon="src/assets/email.svg" // Add your icon path
        />

        {/* Password Input with Icon */}
        <CustomFormField
          name="password"
          control={form.control}
          label="Password"
          placeholder="Enter your password"
          fieldType="password"
          errorMessage={form.formState.errors.password?.message} 
          icon="src/assets/password.svg" // Add your icon path
        />

        {/* Submit Button */}
        <SubmitButton isLoading={isLoading}>Sign Up</SubmitButton>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 font-bold">
          Log In
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

export default SignUpPage;
