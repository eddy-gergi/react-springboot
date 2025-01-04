import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookFormValidation } from "../../lib/validation"; 
import axios from "axios";
import SubmitButton from "../SubmitButton";
import { books_api, admin_actions_api } from "../../services/api";
import { useParams } from "react-router-dom";  // For accessing URL parameters

const UpdateBookForm = () => {
  const { id } = useParams();  // Get the book id from the URL
  const [isLoading, setIsLoading] = useState(false);
  const [bookData, setBookData] = useState(null);

  const form = useForm({
    resolver: zodResolver(bookFormValidation),  // Use book validation schema
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      releaseyear: "",
      description: "",
      imgUrl: "",
    },
  });

  // Fetch book data based on the id from the URL
  useEffect(() => {
    const fetchBookData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${books_api}/${id}`);
        setBookData(response.data);
      } catch (error) {
        console.error("Failed to fetch book data:", error);
        alert("Failed to load book data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  useEffect(() => {
    if (bookData) {
      // Populate form with fetched book data once available
      form.reset({
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        releaseyear: bookData.releaseyear,
        description: bookData.description,
        imgUrl: bookData.url,
      });
    }
  }, [bookData, form]);

  const handleUpdateBook = async (values) => {
    setIsLoading(true);

    try {
      const bookPayload = {
        id: id,  // Use the id from the URL
        title: values.title.trim(),
        author: values.author.trim(),
        genre: values.genre.trim(),
        releaseyear: parseInt(values.releaseyear, 10),
        description: values.description.trim(),
        url: values.imgUrl.trim(),
      };

      console.log("Sending payload:", bookPayload);

      const response = await axios.put(`${books_api}/update/${id}`, bookPayload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Book updated successfully!");
      console.log(response.data);

      const adminId = "4be62897-6e9a-43ab-a488-d366859fa020"; // Replace with dynamic Id
      const actionInfo = `Updated book: ${values.title}`;
      const actionTimestamp = new Date().toISOString();

      const actionPayload = {
        adminId,
        actionInfo,
        actionTimestamp,
      };

      await axios.post(admin_actions_api + "/add", actionPayload);
    } catch (error) {
      console.error("Failed to update book:", error);
      alert("Failed to update book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!bookData) {
    return <div className="text-center">Book not found</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-base-300 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Update Book</h2>

      <form onSubmit={form.handleSubmit(handleUpdateBook)}>
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
          label="Book Image URL"
          placeholder="Enter the image URL"
          errorMessage={form.formState.errors.imgUrl?.message}
        />
        <SubmitButton isLoading={isLoading}>Update Book</SubmitButton>
      </form>
    </div>
  );
};

export default UpdateBookForm;
