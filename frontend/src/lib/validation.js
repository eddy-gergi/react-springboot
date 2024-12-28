import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name must be less than 50 characters." })
    .nonempty({ message: "Name is required." }),

  email: z
    .string()
    .email({ message: "Invalid email format." })
    .nonempty({ message: "Email is required." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(50, { message: "Password must be less than 50 characters." })
    .nonempty({ message: "Password is required." })
    .regex(/[A-Za-z]/, { message: "Password must contain at least one letter." })
    .regex(/\d/, { message: "Password must contain at least one number." }),
});


// Define the schema for validating the form data
export const bookFormValidation = z.object({
  title: z.string().nonempty("Book title is required"),
  author: z.string().nonempty("Author is required"),
  genre: z.string().nonempty("Genre is required"),
  publishedyear: z
    .string()
    .nonempty("Published year is required")
    .regex(/^\d{4}$/, "Published year must be a 4-digit number"),
  description: z.string().nonempty("Description is required"),
  imgUrl: z.string().url("Provide a valid image URL"),
});


// Movie form validation schema
export const movieFormValidation = z.object({
  title: z.string().nonempty("Movie title is required"),
  director: z.string().nonempty("Director is required"),
  genre: z.string().nonempty("Genre is required"),
  releaseyear: z
    .string()
    .nonempty("Release year is required")
    .regex(/^\d{4}$/, "Year must be a 4-digit number"), // Validate that it's a 4-digit number
  description: z.string().nonempty("Description is required"),
  imgUrl: z.string().url("Provide a valid image URL"),
});

export const adminFormValidation = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  // validation.js



// Define validation schema for admin login
export const adminFormValidationLogin = z.object({
  email: z
    .string()
    .email("Invalid email address") // Ensure the email is in a valid format
    .min(1, "Email is required"), // Ensure email is not empty
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long") // Minimum password length
    .min(1, "Password is required"), // Ensure password is not empty
});
