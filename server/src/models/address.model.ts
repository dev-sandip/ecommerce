import type { Document } from "mongoose";

import { model, Schema } from "mongoose";

import type { AddressFormData } from "@/schema/address";

// Define the Mongoose schema with equivalent validation
const MongooseAddressSchema = new Schema<AddressFormData & Document>({
  fullName: { type: String, required: true, minlength: 3 },
  addressLine1: { type: String, required: true, minlength: 5 },
  addressLine2: { type: String },
  city: { type: String, required: true, minlength: 2 },
  state: { type: String, required: true, minlength: 2 },
  zipCode: {
    type: String,
    required: true,
    match: [/^\d{5}(-\d{4})?$/, "Invalid ZIP code"],
  },
  country: { type: String, required: true, minlength: 2 },
  userId: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to User model
});

// Create the Mongoose model
const AddressModel = model<AddressFormData>("Address", MongooseAddressSchema);

export default AddressModel;
