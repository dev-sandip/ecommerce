import mongoose from "mongoose";

/**
 * Represents the schema for a user in the application.
 * @remarks This schema contains the data of the user that is publicly available to other users
 */
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    min: 3,
    max: 40,
  },
  lastname: {
    type: String,
    required: true,
    min: 3,
    max: 40,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImg: {
    type: String,
    default: "https://res.cloudinary.com/dxxxkeonq/image/upload/v1705631570/website/xgolsvu8xejzsqj8jjku.jpg",
  },
  mobile: {
    type: String,
    required: true,
    min: 10,
    unique: true,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    min: 8,
    max: 20,
  },
  cart: {
    type: Array,
    default: []
  },
  address: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"

  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]
}, {
  timestamps: true,
});

export default mongoose.model("User", UserSchema);
