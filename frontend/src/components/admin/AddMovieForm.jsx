import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieFormValidation } from "../../lib/validation";
import axios from "axios";
import SubmitButton from "../SubmitButton";
import { movies_api, admin_actions_api } from "../../services/api";

const AddMovieForm = () => {
  const [isLoading, setIsLoading] = useState(false);
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

    try {
      const moviePayload = {
        id: crypto.randomUUID(),
        title: values.title.trim(),
        director: values.director.trim(),
        genre: values.genre.trim(),
        releaseyear: parseInt(values.releaseyear, 10),
        description: values.description.trim(),
        url: values.imgUrl.trim(),
      };

      console.log("Sending payload:", moviePayload);

      const response = await axios.post(movies_api + "/add", moviePayload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Movie added successfully!");
      console.log(response.data);
      const adminId = "4be62897-6e9a-43ab-a488-d366859fa020"; // Replace with dynamic Id
      const actionInfo = `Added movie:  ${values.title}`;
      const actionTimestamp = new Date().toISOString();

      const actionPayload = {
        adminId,
        actionInfo,
        actionTimestamp,
      };

      await axios.post(admin_actions_api + "/add", actionPayload);
    } catch (error) {
      console.error(
        "Failed to add movie or log action:",
        error.response?.data || error.message
      );
      alert("Failed to add movie. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          errorMessage={form.formState.errors.title?.message}
        />
        <CustomFormField
          fieldType="text"
          control={form.control}
          name="director"
          label="Director"
          placeholder="Enter the director's name"
          errorMessage={form.formState.errors.director?.message}
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
          name="releaseyear"
          label="Release Year"
          placeholder="Enter the release year"
          errorMessage={form.formState.errors.releaseyear?.message}
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
          label="Movie Image URL"
          placeholder="Enter the image URL"
          errorMessage={form.formState.errors.imgUrl?.message}
        />
        <SubmitButton isLoading={isLoading}>Add Movie</SubmitButton>
      </form>
    </div>
  );
};

export default AddMovieForm;
