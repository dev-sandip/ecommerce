import type { Document, Model } from "mongoose";

import mongoose, { Schema } from "mongoose";

import type { IProduct } from "@/interfaces";

import { FileSchema } from "./file.schema";

// fine the Product schema
const ProductSchema: Schema<ProductDocument> = new Schema<ProductDocument>({
  title: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 3 },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: FileSchema, required: true }, // Single file for thumbnail
  images: { type: [FileSchema], required: true }, // Array of files for images
});

// Extend the Document interface
interface ProductDocument extends IProduct, Document { }

// Create the Product model
const productModel: Model<ProductDocument> = mongoose.model<ProductDocument>("Product", ProductSchema);
export default productModel;
