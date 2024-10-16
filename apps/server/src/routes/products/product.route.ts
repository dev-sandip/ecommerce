import { createRoute } from "@hono/zod-openapi";
import { ProductSchema } from "@shared/zod";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { protectAndIsAdmin } from "@/middlewares/auth-middleware";

const tags = ["products"];
export const createProductRoute = createRoute({
  method: "post",
  path: "/products/create",
  middleware: [protectAndIsAdmin],
  request: {
    body: jsonContentRequired(ProductSchema, "For creating a new product"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      ProductSchema,
      "Product created successfully",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(ProductSchema),
      "The validation error(s)",
    ),
  },
});
export const listProductsRoute = createRoute({
  method: "get",
  path: "/products",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      ProductSchema.array(),
      "List of products",
    ),
  },
});
