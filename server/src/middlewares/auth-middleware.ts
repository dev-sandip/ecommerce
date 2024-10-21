import type { Context, Next } from "hono";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { Jwt } from "hono/utils/jwt";

import { COOKIE, STATUS_CODE } from "@/constants";
import env from "@/env";
import userModel from "@/models/user.model";

// Protect Route for Authenticated Users
export const protect = createMiddleware(async (c: Context, next: Next) => {
  const token = getCookie(c, COOKIE.AUTH);
  if (!token) {
    return c.json({ message: "Please login to access this resource" }, STATUS_CODE.UNAUTHORIZED);
  }

  try {
    const { id } = await Jwt.verify(token, env.JWT_SECRET || "");
    const user = await userModel.findById(id).select("-password");

    if (!user) {
      return c.json({ message: "User not found" }, STATUS_CODE.NOT_FOUND);
    }

    // Set the user in context
    c.set("user", user);

    // Capture the result of `next()`
    const response = await next();

    // Return the response to ensure it's propagated correctly
    return response;
  }
  catch (err) {
    c.var.logger.error(err);
    return c.json({ message: "Invalid token" }, STATUS_CODE.UNAUTHORIZED);
  }
});

export const protectAndIsAdmin = createMiddleware(async (c: Context, next: Next) => {
  const token = getCookie(c, COOKIE.AUTH);

  if (!token) {
    return c.json({ message: "Please login to access this resource" }, STATUS_CODE.UNAUTHORIZED);
  }

  try {
    // Verify JWT token
    const { id } = await Jwt.verify(token, env.JWT_SECRET || "");
    const user = await userModel.findById(id).select("-password");

    if (!user) {
      return c.json({ message: "User not found" }, STATUS_CODE.NOT_FOUND);
    }

    // Check if the user is an admin
    if (!user.isAdmin) {
      return c.json({ message: "Not authorized as an admin!" }, STATUS_CODE.UNAUTHORIZED);
    }

    // Set the user in context if admin
    c.set("user", user);

    // Proceed to the next middleware/handler
    const response = await next();

    return response;
  }
  catch (err) {
    return c.json({
      err,
      message: "Invalid token",
    }, STATUS_CODE.UNAUTHORIZED);
  }
});
