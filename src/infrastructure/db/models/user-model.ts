import mongoose, { Document, Schema } from "mongoose";
import type { IUser } from "../../../domain/entities/user.js";

export interface IUserDocument extends Document, Omit<IUser, 'id'> {}

const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});


export const UserModel = mongoose.model('User', userSchema)