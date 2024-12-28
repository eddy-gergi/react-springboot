import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieFormValidation } from "../../lib/validation"; 
import axios from "axios";  
import SubmitButton from "../SubmitButton";

const AddMovieForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form using react-hook-form and Zod resolver
  const form = useForm({
    resolver: zodResolver(movieFormValidation),
    defaultValues: {
      title: "",
      director: "",
      genre: "",
      releaseyear: "",
      description: "",
      imgUrl: "",
    },
  });

  const handleAddMovie = async (values) => {
    setIsLoading(true);
    console.log("Form values:", values);

    try {
      const response = await axios.post("http://localhost:8080/api/movies/add", values);
      console.log("Movie added successfully:", response.data);
      alert("Movie added successfully!");
    } catch (error) {
      console.error("Failed to add movie:", error.message);
      alert("Failed to add movie. Please try again.");
    }

    setIsLoading(false);
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
          errorMessage={form.formState.errors.title?.message} // Pass error message for title
        />
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="director"
          label="Director"
          placeholder="Enter the director's name"
          errorMessage={form.formState.errors.director?.message} // Pass error message for director
        />
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="genre"
          label="Genre"
          placeholder="Enter the genre"
          errorMessage={form.formState.errors.genre?.message} // Pass error message for genre
        />
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="releaseyear"
          label="Release Year"
          placeholder="Enter the release year"
          errorMessage={form.formState.errors.releaseyear?.message} // Pass error message for release year
        />
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="description"
          label="Description"
          placeholder="Enter a brief description"
          errorMessage={form.formState.errors.description?.message} // Pass error message for description
        />
        <CustomFormField
          fieldType="url"
          control={form.control}
          name="imgUrl"
          label="Movie Image URL"
          placeholder="Enter the image URL"
          errorMessage={form.formState.errors.imgUrl?.message} // Pass error message for image URL
        />
        <SubmitButton isLoading={isLoading}>Add Movie</SubmitButton>
      </form>
    </div>
  );
};

export default AddMovieForm;
