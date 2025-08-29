import mongoose, { Document, Schema, Types } from "mongoose";
import type {  IUserWithPassword } from "../../../domain/entities/user.js";

export type IUserDocument = Document & IUserWithPassword &{
  _id: Types.ObjectId,
}

const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"]},
}, {timestamps: true});

export const UserModel = mongoose.model("User", userSchema);
