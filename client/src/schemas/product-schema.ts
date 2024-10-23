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
