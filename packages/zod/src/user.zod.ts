import { z } from "zod";

export const UsernameSchema = z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain alphanumeric characters and underscores"
    );

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})