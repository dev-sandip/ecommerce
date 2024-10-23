import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 character long!"),
});

export const RegisterSchema = z.object({
    fname: z.string().min(3),
    lname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 character long!"),
});
