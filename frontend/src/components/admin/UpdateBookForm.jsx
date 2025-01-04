import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookFormValidation } from "../../lib/validation";
import axios from "axios";
import SubmitButton from "../SubmitButton";
import { books_api, admin_actions_api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBookForm = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [bookData, setBookData] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchBookData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${books_api}/${id}`);
        setBookData(response.data);
      } catch (error) {
        alert("Failed to load book data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  useEffect(() => {
    if (bookData) {
      form.reset({
        title: bookData.title || "",
        author: bookData.author || "",
        genre: bookData.genre || "",
        publishedyear: bookData.publishedyear || "",
        description: bookData.description || "",
        imgUrl: bookData.url || "",
      });
    }
  }, [bookData, form]);

  const handleUpdateBook = async (values) => {
    setIsLoading(true);
    try {
      const bookPayload = {
        id,
        title: values.title.trim(),
        author: values.author.trim(),
        genre: values.genre.trim(),
        publishedyear: values.publishedyear ? parseInt(values.publishedyear, 10) : 0,
        description: values.description.trim(),
        url: values.imgUrl.trim(),
      };

      await axios.put(`${books_api}/update/${id}`, bookPayload, {
        headers: { "Content-Type": "application/json" },
      });

      const adminId = sessionStorage.getItem("adminId");
      const actionInfo = `Updated book: ${values.title}`;
      const actionTimestamp = new Date().toISOString();

      const actionPayload = {
        adminId,
        actionInfo,
        actionTimestamp,
      };

      await axios.post(`${admin_actions_api}/add`, actionPayload);

      navigate("/admin-dashboard");
    } catch (error) {
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
          fieldType="number"
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
        <button type="submit" className="btn btn-primary mt-4 w-full">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBookForm;
