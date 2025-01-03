import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminFormValidation } from "../../lib/validation";
import axios from "axios";
import SubmitButton from "../SubmitButton";
import { users_api, admin_actions_api } from "../../services/api";

const AddAdminForm = () => {
  const [isLoading, setIsLoading] = useState(false);

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

    try {
      const adminPayload = {
        id: crypto.randomUUID(),
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
        role: "admin",
      };

      console.log("Sending payload:", adminPayload);

      const response = await axios.post(users_api , adminPayload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Admin added successfully!");
      console.log(response.data);

      const adminId = "4be62897-6e9a-43ab-a488-d366859fa020"; // Replace with dynamic Id
      const actionInfo = `Added admin: ${values.name}`;
      const actionTimestamp = new Date().toISOString();

      const actionPayload = {
        adminId,
        actionInfo,
        actionTimestamp,
      };

      await axios.post(admin_actions_api + "/add", actionPayload);
      form.reset();
    } catch (error) {
      console.error(
        "Failed to add admin or log action:",
        error.response?.data || error.message
      );
      alert("Failed to add admin. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          errorMessage={form.formState.errors.name?.message}
        />
        <CustomFormField
          fieldType="email"
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter email address"
          errorMessage={form.formState.errors.email?.message}
        />
        <CustomFormField
          fieldType="password"
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter password"
          errorMessage={form.formState.errors.password?.message}
        />
        <SubmitButton isLoading={isLoading}>Add Admin</SubmitButton>
      </form>
    </div>
  );
};

export default AddAdminForm;
