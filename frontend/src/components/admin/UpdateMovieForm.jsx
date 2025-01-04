import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieFormValidation } from "../../lib/validation";
import axios from "axios";
import SubmitButton from "../SubmitButton";
import { movies_api, admin_actions_api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom"; 

const UpdateMovieForm = () => {
  const { id } = useParams(); 
  const [isLoading, setIsLoading] = useState(false);
  const [movieData, setMovieData] = useState(null);
  const navigate = useNavigate();

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

  
  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${movies_api}/${id}`);
        setMovieData(response.data);
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
        alert("Failed to load movie data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  useEffect(() => {
    if (movieData) {
      form.reset({
        title: movieData.title,
        director: movieData.director,
        genre: movieData.genre,
        releaseyear: movieData.releaseyear,
        description: movieData.description,
        imgUrl: movieData.url,
      });
    }
  }, [movieData, form]);

  const handleUpdateMovie = async (values) => {
    setIsLoading(true);

    try {
      const moviePayload = {
        id: id, 
        title: values.title.trim(),
        director: values.director.trim(),
        genre: values.genre.trim(),
        releaseyear: parseInt(values.releaseyear, 10),
        description: values.description.trim(),
        url: values.imgUrl.trim(),
      };

      console.log("Sending payload:", moviePayload);

      const response = await axios.put(
        `${movies_api}/update/${id}`,
        moviePayload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Movie updated successfully!");
      console.log(response.data);

      const adminId = sessionStorage.getItem("adminId"); 
      const actionInfo = `Updated movie: ${values.title}`;
      const actionTimestamp = new Date().toISOString();

      const actionPayload = {
        adminId,
        actionInfo,
        actionTimestamp,
      };

      await axios.post(admin_actions_api + "/add", actionPayload);
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Failed to update movie:", error);
      alert("Failed to update movie. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!movieData) {
    return <div className="text-center">Movie not found</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-base-300 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Update Movie</h2>

      <form onSubmit={form.handleSubmit(handleUpdateMovie)}>
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
        <SubmitButton isLoading={isLoading}>Update Movie</SubmitButton>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
