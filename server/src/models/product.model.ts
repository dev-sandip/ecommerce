import type { Document, Model } from "mongoose";

import mongoose, { Schema } from "mongoose";

interface Product {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string;
}
const ProductSchema: Schema = new Schema<Product>({
  title: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 3 },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: String, required: true },
});
interface ProductDocument extends Product, Document { }
const productModel: Model<ProductDocument> = mongoose.model<ProductDocument>("Product", ProductSchema);
export default productModel;
