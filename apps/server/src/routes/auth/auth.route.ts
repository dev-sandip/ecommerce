import { createRoute } from "@hono/zod-openapi";
import { RegisterSchema } from "@shared/zod";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

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
