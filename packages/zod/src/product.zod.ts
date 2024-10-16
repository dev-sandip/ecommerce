import { z } from "zod";

// Zod schema for Product
export const ProductSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(3, "Description must be at least 3 characters long"),
    price: z.number().positive("Price must be a positive number"),
    discountPercentage: z.number().min(0).max(100, "Discount must be between 0 and 100"),
    rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
    stock: z.number().int().min(0, "Stock must be a non-negative integer"),
    brand: z.string().min(1, "Brand is required"),
    category: z.string().min(1, "Category is required"),
    thumbnail: z.string().url("Thumbnail must be a valid URL"),
    images: z.string().url("Images must be a valid URL"),
});
