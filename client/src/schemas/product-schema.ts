import { z } from "zod";
export const productSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  discountPercentage: z.number().min(0).max(100),
  rating: z.number().min(0).max(5).step(0.5),
  stock: z.number().int().positive({ message: 'Stock must be a positive integer' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  thumbnail: z.any().refine((file) => file instanceof File, "Thumbnail must be a file"),
  images: z.array(z.any().refine((file) => file instanceof File, "Each image must be a file")).max(5, { message: 'Maximum 5 images allowed' }),
})
export type ProductType = z.infer<typeof productSchema>;
export const FileSchema = z.object({
  fileId: z.string().optional(),
  name: z.string().optional(),
  url: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
});

export const FetchProductSchema = z.object({
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
export type Product = z.infer<typeof FetchProductSchema>;