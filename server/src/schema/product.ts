import { z } from "zod";

import { FileSchema } from "./file";

/**
 * Schema definition for a Product using Zod.
 * This schema validates the following properties:
 * - `title`: A string with a minimum length of 3 characters.
 * - `description`: A string with a minimum length of 3 characters.
 * - `price`: A number that must be a positive value.
 * - `discountPercentage`: A number between 0 and 100.
 * - `rating`: A number between 0 and 5.
 * - `stock`: A number that must be a positive value.
 * - `brand`: A string representing the brand of the product.
 * - `category`: A string representing the category of the product.
 * - `thumbnail`: A file schema representing the thumbnail image of the product.
 * - `images`: An array of file schemas representing additional images of the product.
 */
export const ProductSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(3, "Description must be at least 3 characters long"),
  price: z.number().min(0, "Price must be a positive number"),
  discountPercentage: z.number().min(0).max(100, "Discount must be between 0 and 100"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  stock: z.number().min(0, "Stock must be a positive number"),
  brand: z.string(),
  category: z.string(),
  thumbnail: FileSchema.optional(),
  images: z.array(FileSchema).optional(),
});
