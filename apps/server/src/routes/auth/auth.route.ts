import { createRoute } from "@hono/zod-openapi";
import { LoginSchema, RegisterSchema } from "@shared/zod";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { protect, protectAndIsAdmin } from "@/middlewares/auth-middleware";

const tags = ["auth"];
export const registerRoute = createRoute({
  method: "post",
  path: "/auth/register",
  request: {
    body: jsonContentRequired(RegisterSchema, "For Registering a new user"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      RegisterSchema,
      "User registered successfully",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(RegisterSchema),
      "The validation error(s)",
    ),
  },
});
export const loginRoute = createRoute({
  method: "post",
  path: "/auth/login",

  request: {
    body: jsonContentRequired(LoginSchema, "For logging in a user"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      LoginSchema,
      "User logged in successfully",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(LoginSchema),
      "The validation error(s)",
    ),
  },
});
export const middlewarecheck = createRoute({
  method: "get",
  path: "/auth/middlewarecheck",
  middleware: [protectAndIsAdmin],
  tags,
  responses: {
    [HttpStatusCodes.OK]: {
      description: "Middleware check",
    },
  },
});
