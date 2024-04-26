import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 5,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      min: 20,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      min: 10,
    },
    quantity: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
    color: [],
    brands: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        star: Number,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//TODO:Remove enum from color and brands at last
export default mongoose.model("Product", ProductSchema);
