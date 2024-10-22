import type { Context } from "hono";

import { z } from "zod";

import { STATUS_CODE } from "@/constants";
import { uploadArrayOfImages, uploadFile } from "@/libs/file-upload";
import productModel from "@/models/product.model";
import { ProductSchema } from "@/schema/product";

export async function createProduct(c: Context) {
  try {
    const body = await c.req.parseBody();
    const productData = ProductSchema.parse(body); // Parse the basic product data first

    // Handle thumbnail upload
    if (body.thumbnail && body.thumbnail instanceof File) {
      const thumbnail = await uploadFile(body.thumbnail, "product-thumbnail");
      if (thumbnail) {
        productData.thumbnail = {
          fileId: thumbnail.fileId,
          url: thumbnail.url,
          name: thumbnail.name,
          thumbnailUrl: thumbnail.thumbnailUrl,
        };
      }
    }

    // Handle images upload
    if (body["images[]"] && Array.isArray(body["images[]"])) {
      productData.images = await uploadArrayOfImages(body["images[]"], "product-images");
    }

    // Create the new product in the database
    const newProduct = await productModel.create(productData);

    return c.json({
      message: "Product created successfully",
      newProduct,
    }, STATUS_CODE.CREATED);
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({
        message: "Validation error",
        errors: error.errors,
      }, STATUS_CODE.BAD_REQUEST);
    }

    return c.json({
      message: "Internal server error",
    }, STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function getProducts(c: Context) {
  try {
    const products = await productModel.find();
    return c.json({
      products,
    });
  }
  catch (error) {
    return c.json({
      error,
      message: "Internal server error",
    }, STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
}
export async function getProductById(c: Context) {
  try {
    const id = c.req.param("id");
    const product = await productModel.findById(id);
    if (!product) {
      return c.json({
        message: "Product not found",
      }, STATUS_CODE.NOT_FOUND);
    }
    return c.json({
      message: "Product fetched successfully",
      product,
    }, STATUS_CODE.OK);
  }
  catch (error) {
    return c.json({
      error,
      message: "Internal server error",
    }, STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
}
