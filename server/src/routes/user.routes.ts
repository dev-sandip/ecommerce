import { Hono } from "hono";

import { protect } from "@/middlewares/auth-middleware";

import { auth } from "../controllers";

const users = new Hono();

// Create User
users.post("/register", c => auth.register(c));

// Login User
users.post("/login", c => auth.loginUser(c));
// logout user
users.get("/logout", c => auth.logoutUser(c));
// Get User Profile
users.get("/me", protect, c => auth.me(c));
export default users;
