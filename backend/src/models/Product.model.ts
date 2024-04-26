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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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
    color: {
      type: String,
      enum: [
        "red",
        "blue",
        "green",
        "yellow",
        "black",
        "white",
        "purple",
        "pink",
        "orange",
        "brown",
        "grey",
        "silver",
        "gold",
        "other",
      ],
    },
    brands: {
      type: String,
      enum: [
        "Apple",
        "Samsung",
        "Microsoft",
        "Lenovo",
        "Asus",
        "HP",
        "Dell",
        "Acer",
        "Toshiba",
        "Sony",
        "Canon",
        "Nikon",
        "Fujifilm",
        "Olympus",
        "Other",
      ],
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

export default mongoose.model("Product", ProductSchema);
