import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "../../lib/validation";
import axios from "axios";
import SubmitButton from "../../components/SubmitButton";
import CustomFormField from "../../components/CustomFormField";
import { users_api } from "../../services/api";
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
      const userPayload = {
        id: crypto.randomUUID(),
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
        role: "user",
      };

      const response = await axios.post(users_api , userPayload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Sign-Up Successful!");
      navigate("/login");
    } catch (error) {
      console.error("Sign-Up Error:", error.response?.data || error.message);
      alert("Failed to sign up. Please check your input and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-base-300 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>

      <form onSubmit={form.handleSubmit(handleSignUp)}>
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          errorMessage={form.formState.errors.name?.message}
        />
        <CustomFormField
          fieldType="email"
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          errorMessage={form.formState.errors.email?.message}
        />
        <CustomFormField
          fieldType="password"
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          errorMessage={form.formState.errors.password?.message}
        />
        <SubmitButton isLoading={isLoading}>Sign Up</SubmitButton>
      </form>
    </div>
  );
};

export default SignUpPage;
