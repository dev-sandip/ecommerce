import { LoginSchema, RegisterSchema } from "@shared/zod"; // Assuming the Zod schema is exported here
import { compare, hash } from "bcrypt";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { z } from "zod";

import type { AppRouteHandler } from "@/libs/types";

import userModel from "@/models/user.model";

import type { loginRoute, registerRoute } from "./auth.route";

export const register: AppRouteHandler<typeof registerRoute> = async (c: any) => {
  try {
    const data: typeof RegisterSchema = c.req.valid("json");
    const body = RegisterSchema.parse(data);

    const existingUser = await userModel.findOne({ email: body.email });
    if (existingUser) {
      return c.json(
        {
          message: "User already exists",
        },
        HttpStatusCodes.FORBIDDEN,
      );
    }

    const hashedPassword = await hash(body.password as string, 10);
    // eslint-disable-next-line new-cap
    const newUser = new userModel({
      ...body,
      password: hashedPassword,
    });

    await newUser.save();
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
      return c.json(
        {
          message: "Validation error",
          errors: err.errors,
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
export const login: AppRouteHandler<typeof loginRoute> = async (c: any) => {
  try {
    const data: typeof LoginSchema = c.req.valid("json");
    const body = LoginSchema.parse(data);

    const user
      = await userModel.findOne({ email: body.email }).select("+password");

    if (!user) {
      return c.json(
        {
          message: "User not found",
        },
        HttpStatusCodes.NOT_FOUND,
      );
    }

    const passwordMatch = await compare(body.password as string, user.password);
    if (!passwordMatch) {
      return c.json(
        {
          message: "Invalid credentials",
        },
        HttpStatusCodes.UNAUTHORIZED,
      );
    }

    return c.json(
      {
        message: `Welcome back, ${user.fname}`,
      },
      HttpStatusCodes.OK,
    );
  }
  catch (err) {
    if (err instanceof z.ZodError) {
      return c.json(
        {
          message: "Validation error",
          errors: err.errors,
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
