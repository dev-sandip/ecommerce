import type { Context } from "hono";

import { compare, hash } from "bcrypt";
import { getCookie, setCookie } from "hono/cookie";
import { Jwt } from "hono/utils/jwt";
import { z } from "zod";

import { COOKIE, STATUS_CODE } from "@/constants";
import env from "@/env";
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
    const { password, ...userwithoutPassword } = newUser.toJSON();
    return c.json(
      {
        message: "User registered successfully",
        user: userwithoutPassword,
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
    const { password, ...userwithoutPassword } = user.toJSON();
    return c.json(
      {
        user: userwithoutPassword,
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
export async function logoutUser(c: Context) {
  try {
    setCookie(c, COOKIE.AUTH, "", {
      path: "/",
      maxAge: -1,
    });
    return c.json(
      {
        message: "Logged out successfully",
      },
      STATUS_CODE.OK,
    );
  }
  catch (error: unknown) {
    return c.json(
      {
        message: "Something went wrong",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      STATUS_CODE.INTERNAL_SERVER_ERROR,
    );
  }
}
export async function me(c: Context) {
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

    return c.json({ user }, STATUS_CODE.OK);
  }
  catch (err) {
    c.var.logger.error(err);
    return c.json({ message: "Invalid token" }, STATUS_CODE.UNAUTHORIZED);
  }
}
