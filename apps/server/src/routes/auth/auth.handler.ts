import { RegisterSchema } from "@shared/zod"; // Assuming the Zod schema is exported here
import * as HttpStatusCodes from "stoker/http-status-codes";
import { z } from "zod";

import type { AppRouteHandler } from "@/libs/types";

import userModel from "@/models/user.model";

import type { registerRoute } from "./auth.route";

export const register: AppRouteHandler<typeof registerRoute> = async (c: any) => {
  try {
    // Validate request body using Zod
    const body = RegisterSchema.parse(c.req.valid("json"));

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email: body.email });
    if (existingUser) {
      return c.json(
        {
          message: "User already exists",
        },
        HttpStatusCodes.FORBIDDEN,
      );
    }

    // Create a new user
    // eslint-disable-next-line new-cap
    const newUser = new userModel(body);
    await newUser.save(); // Save the new user in the database

    return c.json(
      {
        message: "User registered successfully",
        user: newUser,
      },
      HttpStatusCodes.CREATED,
    );
  }
  catch (err) {
    if (err instanceof z.ZodError) {
      // If validation fails, send back the Zod error message
      return c.json(
        {
          message: "Validation error",
          errors: err.errors, // Return detailed validation errors
        },
        HttpStatusCodes.BAD_REQUEST,
      );
    }

    // Handle other errors
    return c.json(
      {
        message: "Something went wrong",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};
