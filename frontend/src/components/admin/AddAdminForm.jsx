import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import CustomFormField from "../CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { users_api } from "../../services/api";
import { adminFormValidation } from "@/lib/validation";

const AddAdminForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with validation and default values
  const form = useForm({
    resolver: zodResolver(adminFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Handle form submission and admin creation
  const handleAddAdmin = async (values) => {
    setIsLoading(true);
    console.log("New Admin Data:", values);

    try {
      // Make API request to add admin
      const response = await axios.post(users_api, {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "admin",
      });

      // Success message and reset form on success
      alert("Admin account added successfully!");
      form.reset(); // Clear form fields after successful submission
    } catch (error) {
      // Error handling
      console.error("Failed to add admin:", error.response?.data || error.message);
      alert("Failed to add admin. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-base-300 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Add New Admin</h2>

      <form onSubmit={form.handleSubmit(handleAddAdmin)}>
        {/* Full Name Input */}
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Enter full name"
          errorMessage={form.formState.errors.name?.message} // Display error message
        />

        {/* Email Input */}
        <CustomFormField
          fieldType="email"
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter email address"
          errorMessage={form.formState.errors.email?.message} // Display error message
        />

        {/* Password Input */}
        <CustomFormField
          fieldType="password"
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter password"
          errorMessage={form.formState.errors.password?.message} // Display error message
        />

        {/* Submit Button */}
        <SubmitButton isLoading={isLoading}>Add Admin</SubmitButton>
      </form>
    </div>
  );
};

export default AddAdminForm;
