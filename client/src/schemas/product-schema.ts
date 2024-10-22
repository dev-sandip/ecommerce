import { z } from "zod";
/**
 * Schema for validating file objects.
 *
 * This schema ensures that a file object contains the following properties:
 * - `fileId`: A string representing the unique identifier of the file.
 * - `name`: A string representing the name of the file.
 * - `url`: A string representing the URL of the file, which must be a valid URL.
 * - `thumbnailUrl`: An optional string representing the URL of the file's thumbnail, which must be a valid URL if provided.
 */
export const FileSchema = z.object({
  fileId: z.string().optional(),
  name: z.string().optional(),
  url: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
});
/**
 * @file Defines the schema for a product in the ecommerce application.
 */

/**
 * ProductSchema defines the structure and validation rules for a product object.
 *
 * Properties:
 * - `title`: A string representing the product title. Must be at least 3 characters long.
 * - `description`: A string representing the product description. Must be at least 3 characters long.
 * - `price`: A string representing the product price. Transformed to a number and must be a positive value.
 * - `discountPercentage`: A string representing the discount percentage. Transformed to a number and must be between 0% and 100%.
 * - `rating`: A string representing the product rating. Transformed to a number and must be between 0 and 5.
 * - `stock`: A string representing the stock quantity. Transformed to an integer and must be a positive value.
 * - `brand`: A string representing the product brand.
 * - `category`: A string representing the product category.
 * - `thumbnail`: An optional file representing the product thumbnail.
 * - `images`: An optional array of files representing the product images.
 */
export const ProductSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(3, "Description must be at least 3 characters long"),
  price: z.string().transform((val) => {
    const parsed = Number.parseFloat(val);
    if (Number.isNaN(parsed)) {
      throw new TypeError("Price must be a valid number");
    }
    return parsed;
  }).refine(val => val >= 0, {
    message: "Price must be a positive number",
  }),
  discountPercentage: z.string().transform((val) => {
    const parsed = Number.parseFloat(val);
    if (Number.isNaN(parsed)) {
      throw new TypeError("Discount must be a valid number");
    }
    return parsed;
  }).refine(val => val >= 0, {
    message: "Discount must be at least 0%",
  }).refine(val => val <= 100, {
    message: "Discount must be at most 100%",
  }),
  rating: z.string().transform((val) => {
    const parsed = Number.parseFloat(val);
    if (Number.isNaN(parsed)) {
      throw new TypeError("Rating must be a valid number");
    }
    return parsed;
  }).refine(val => val >= 0, {
    message: "Rating must be at least 0",
  }).refine(val => val <= 5, {
    message: "Rating must be at most 5",
  }),
  stock: z.string().transform((val) => {
    const parsed = Number.parseInt(val, 10);
    if (Number.isNaN(parsed)) {
      throw new TypeError("Stock must be a valid integer");
    }
    return parsed;
  }).refine(val => Number.isInteger(val), {
    message: "Stock must be a valid integer",
  }).refine(val => val >= 0, {
    message: "Stock must be a positive number",
  }),
  brand: z.string(),
  category: z.string(),
  thumbnail: FileSchema,
  images: z.array(FileSchema),
});
export type File = z.infer<typeof FileSchema>;
export type Product = z.infer<typeof ProductSchema>;