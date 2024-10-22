import type { Context } from "hono";

import { z } from "zod";

import { STATUS_CODE } from "@/constants";
import { uploadArrayOfImages, uploadFile } from "@/libs/file-upload";
import productModel from "@/models/product.model";
import { ProductSchema } from "@/schema/product";

// Function to parse and validate product data
function parseProductData(body: any) {
  return ProductSchema.parse({
    title: body.title,
    description: body.description,
    price: Number.parseFloat(body.price as string),
    discountPercentage: Number.parseFloat(body.discountPercentage as string),
    rating: Number.parseFloat(body.rating as string),
    stock: Number.parseInt(body.stock as string, 10),
    brand: body.brand,
    category: body.category,
  });
}

// Main function to create a product
export async function createProduct(c: Context) {
  try {
    const body = await c.req.parseBody();

    // Parse and validate the product data
    const productData = parseProductData(body);

    // Handle thumbnail upload if present
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

    // Handle images upload if present
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
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return c.json(
        {
          message: "Validation error",
          errors: error.errors,
        },
        STATUS_CODE.BAD_REQUEST,
      );
    }

    // Handle other errors
    return c.json(
      {
        message: "Internal server error",
      },
      STATUS_CODE.INTERNAL_SERVER_ERROR,
    );
  }
}
