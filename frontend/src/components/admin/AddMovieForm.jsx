import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "../CustomFormField";
import { z } from "zod";

const AddMovieForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const movieFormValidation = z.object({
    title: z.string().nonempty("Movie title is required"),
    imgUrl: z.string().url("Provide a valid image URL"),
  });

  const form = useForm({
    resolver: zodResolver(movieFormValidation),
    defaultValues: {
      title: "",
      imgUrl: "",
    },
  });

  const handleAddMovie = async (values) => {
    setIsLoading(true);
    console.log("Movie Added:", values);
    setIsLoading(false);
    alert("Movie added successfully!");
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-base-300 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Add New Movie</h2>

      <form onSubmit={form.handleSubmit(handleAddMovie)}>
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="title"
          label="Movie Title"
          placeholder="Enter the movie title"
        />
        <CustomFormField
          fieldType="url"
          control={form.control}
          name="imgUrl"
          label="Movie Image URL"
          placeholder="Enter the image URL"
        />
        <SubmitButton isLoading={isLoading}>Add Movie</SubmitButton>
      </form>
    </div>
  );
};

export default AddMovieForm;
