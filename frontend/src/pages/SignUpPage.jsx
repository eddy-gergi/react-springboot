import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/validation";
import SubmitButton from "../components/SubmitButton";
import CustomFormField from "../components/CustomFormField";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);

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
      console.log("Signing up with:", values);
      // Call your sign-up API endpoint here
      // await createUser(values);
    } catch (error) {
      console.error("Sign-Up Error:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12  p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Create Account</h2>

      <form onSubmit={form.handleSubmit(handleSignUp)}>
        <CustomFormField
          fieldType="input"
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="name"
        />
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
        <SubmitButton isLoading={isLoading}>Sign Up</SubmitButton>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 font-bold">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
