import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { z } from "zod";

const AddBookForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const bookFormValidation = z.object({
    title: z.string().nonempty("Book title is required"),
    imgUrl: z.string().url("Provide a valid image URL"),
  });

  const form = useForm({
    resolver: zodResolver(bookFormValidation),
    defaultValues: {
      title: "",
      imgUrl: "",
    },
  });

  const handleAddBook = async (values) => {
    setIsLoading(true);
    console.log("Book Added:", values);
    setIsLoading(false);
    alert("Book added successfully!");
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
        />
        <CustomFormField
          fieldType="url"
          control={form.control}
          name="imgUrl"
          label="Book Image URL"
          placeholder="Enter the image URL"
        />
        <SubmitButton isLoading={isLoading}>Add Book</SubmitButton>
      </form>
    </div>
  );
};

export default AddBookForm;
