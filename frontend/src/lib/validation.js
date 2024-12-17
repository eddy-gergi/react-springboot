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
