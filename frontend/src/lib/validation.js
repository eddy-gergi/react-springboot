
import { z } from "zod";

export const UserFormValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(1, { message: "Full name cannot be empty" }),
});
