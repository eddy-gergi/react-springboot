import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookFormValidation } from "../../lib/validation";
import axios from "axios";
import SubmitButton from "../SubmitButton";
import { books_api, admin_actions_api } from "../../services/api";

const AddBookForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(bookFormValidation),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      publishedyear: "",
      description: "",
      imgUrl: "",
    },
  });

  const handleAddBook = async (values) => {
    setIsLoading(true);

    try {
      const bookPayload = {
        id: crypto.randomUUID(),
        title: values.title.trim(),
        author: values.author.trim(),
        genre: values.genre.trim(),
        publishedyear: parseInt(values.publishedyear, 10),
        description: values.description.trim(),
        url: values.imgUrl.trim(),
      };

      console.log("Sending payload:", bookPayload);

      const response = await axios.post(books_api + "/add", bookPayload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Book added successfully!");
      console.log(response.data);
      const adminId = sessionStorage.getItem("adminId");
      const actionInfo = `Added book:  ${values.title}`;
      const actionTimestamp = new Date().toISOString();

      const actionPayload = {
        adminId,
        actionInfo,
        actionTimestamp,
      };

      await axios.post(admin_actions_api + "/add", actionPayload);
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      alert("Failed to add book. Please check your input and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-base-300 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Add New Book</h2>

      <form onSubmit={form.handleSubmit(handleAddBook)}>
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="title"
          label="Book Title"
          placeholder="Enter the book title"
          errorMessage={form.formState.errors.title?.message}
        />
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="author"
          label="Author"
          placeholder="Enter the author's name"
          errorMessage={form.formState.errors.author?.message}
        />
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="genre"
          label="Genre"
          placeholder="Enter the genre"
          errorMessage={form.formState.errors.genre?.message}
        />
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="publishedyear"
          label="Published Year"
          placeholder="Enter the published year"
          errorMessage={form.formState.errors.publishedyear?.message}
        />
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="description"
          label="Description"
          placeholder="Enter a brief description"
          errorMessage={form.formState.errors.description?.message}
        />
        <CustomFormField
          fieldType="url"
          control={form.control}
          name="imgUrl"
          label="Book Image URL"
          placeholder="Enter the image URL"
          errorMessage={form.formState.errors.imgUrl?.message}
        />
        <SubmitButton isLoading={isLoading}>Add Book</SubmitButton>
      </form>
    </div>
  );
};

export default AddBookForm;
