import { ProductSchema } from "@shared/zod";
import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/libs/types";

import productModel from "@/models/product.model";

import type { createProductRoute, listProductsRoute } from "./product.route";

export const createProduct: AppRouteHandler<typeof createProductRoute> = async (c: any) => {
  const data: typeof ProductSchema = c.req.valid("json");
  const body = ProductSchema.parse(data);
  const newProduct = await productModel.create(body);
  if (!newProduct) {
    return c.json(
      {
        message: "Failed to create product",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  return c.json(
    {
      message: "Product created successfully",
      product: newProduct,
    },
    HttpStatusCodes.CREATED,
  );
};

export const listProducts: AppRouteHandler<typeof listProductsRoute> = async (c: any) => {
  const products = await productModel.find({});
  return c.json(
    {
      products,
    },
    HttpStatusCodes.OK,
  );
};
