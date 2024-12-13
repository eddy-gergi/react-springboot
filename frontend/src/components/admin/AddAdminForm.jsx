import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import CustomFormField from "../CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const AddAdminForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const adminFormValidation = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm({
    resolver: zodResolver(adminFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleAddAdmin = async (values) => {
    setIsLoading(true);
    console.log("New Admin Added:", values);

    try {
      // Call your API or perform actions to add an admin
      // await addAdminAPI(values);
      alert("Admin account added successfully!");
    } catch (error) {
      console.error("Failed to add admin:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-base-300 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Add New Admin</h2>

      <form onSubmit={form.handleSubmit(handleAddAdmin)}>
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Enter full name"
        />
        <CustomFormField
          fieldType="email"
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter email address"
        />
        <CustomFormField
          fieldType="password"
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter password"
        />
        <SubmitButton isLoading={isLoading}>Add Admin</SubmitButton>
      </form>
    </div>
  );
};

export default AddAdminForm;
