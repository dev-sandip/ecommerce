import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const RegisterSchema = z.object({
  fname: z.string().min(3),
  lname: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});
