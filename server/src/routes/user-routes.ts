import { Hono } from "hono";

import { auth } from "../controllers";
// import { isAdmin, protect } from "../middlewares";

const users = new Hono();

// Create User
users.post("/register", c => auth.register(c));

// Login User
users.post("/login", c => auth.loginUser(c));

export default users;
