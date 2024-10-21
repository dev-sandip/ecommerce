import type { Document, Model } from "mongoose";

import mongoose, { Schema } from "mongoose";

interface UserInput {
  fname: string;
  lname: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

const UserSchema: Schema = new Schema<UserInput>({
  fname: { type: String, required: true, minlength: 3 },
  lname: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, select: false },
  isAdmin: { type: Boolean, default: false },
});

interface UserDocument extends UserInput, Document { }

const userModel: Model<UserDocument> = mongoose.model<UserDocument>("User", UserSchema);

export default userModel;
