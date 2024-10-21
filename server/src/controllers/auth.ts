import type { Context } from "hono";

import { compare, hash } from "bcrypt";
import { setCookie } from "hono/cookie";
import { z } from "zod";

import { COOKIE, STATUS_CODE } from "@/constants";
import genToken from "@/libs/generate-token";
import userModel from "@/models/user.model";
import { LoginSchema, RegisterSchema } from "@/schema/auth";

export async function getUsers(c: Context) {
  return c.json({
    message: "Hello World from controller",
  });
}

export async function register(c: Context) {
  try {
    const data: typeof RegisterSchema = await c.req.json();
    const body = RegisterSchema.parse(data);

    const existingUser = await userModel.findOne({ email: body.email });
    if (existingUser) {
      return c.json(
        {
          message: "User already exists",
        },
        STATUS_CODE.FORBIDDEN,
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
      STATUS_CODE.CREATED,
    );
  }
  catch (err) {
    if (err instanceof z.ZodError) {
      return c.json(
        {
          message: "Validation error",
          errors: err.errors,
        },
        STATUS_CODE.BAD_REQUEST,
      );
    }

    // Handle other errors
    return c.json(
      {
        message: "Something went wrong",
      },
      STATUS_CODE.INTERNAL_SERVER_ERROR,
    );
  }
};

export async function loginUser(c: Context) {
  try {
    const data: typeof LoginSchema = await c.req.json();
    const body = LoginSchema.parse(data);

    const user
      = await userModel.findOne({ email: body.email }).select("+password");

    if (!user) {
      return c.json(
        {
          message: "User not found",
        },
        STATUS_CODE.NOT_FOUND,
      );
    }

    const passwordMatch = await compare(body.password as string, user.password);
    if (!passwordMatch) {
      return c.json(
        {
          message: "Invalid credentials",
        },
        STATUS_CODE.UNAUTHORIZED,
      );
    }
    const token = await genToken(user._id as string);
    setCookie(c, COOKIE.AUTH, token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });
    return c.json(
      {
        message: `Welcome back, ${user.fname}`,
      },
      STATUS_CODE.OK,
    );
  }
  catch (err) {
    if (err instanceof z.ZodError) {
      return c.json(
        {
          message: "Validation error",
          errors: err.errors,
        },
        STATUS_CODE.BAD_REQUEST,
      );
    }

    // Handle other errors
    return c.json(
      {
        message: "Something went wrong",
      },
      STATUS_CODE.INTERNAL_SERVER_ERROR,
    );
  }
};
