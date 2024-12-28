// components/AddBookForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import axios from "axios";
import { bookFormValidation } from "../../lib/validation"; // Import the validation schema

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
    console.log("Book Added:", values);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/books/add",
        values
      );
      console.log("Book added successfully:", response.data);
      alert("Book added successfully!");
    } catch (error) {
      console.error("Failed to add book:", error.message);
      alert("Failed to add book. Please try again.");
    }

    setIsLoading(false);
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
          errorMessage={form.formState.errors.title?.message} // Passing error message here
        />
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="author"
          label="Author"
          placeholder="Enter the author's name"
          errorMessage={form.formState.errors.author?.message} // Passing error message here
        />
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="genre"
          label="Genre"
          placeholder="Enter the genre"
          errorMessage={form.formState.errors.genre?.message} // Passing error message here
        />
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="publishedyear"
          label="Published Year"
          placeholder="Enter the published year"
          errorMessage={form.formState.errors.publishedyear?.message} // Passing error message here
        />
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="description"
          label="Description"
          placeholder="Enter a brief description"
          errorMessage={form.formState.errors.description?.message} // Passing error message here
        />
        <CustomFormField
          fieldType="url"
          control={form.control}
          name="imgUrl"
          label="Book Image URL"
          placeholder="Enter the image URL"
          errorMessage={form.formState.errors.imgUrl?.message} // Passing error message here
        />
        <SubmitButton isLoading={isLoading}>Add Book</SubmitButton>
      </form>
    </div>
  );
};

export default AddBookForm;
