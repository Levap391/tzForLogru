import { Schema, model } from "mongoose";
import { IUser } from "./interface";

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

export default model<IUser>("user", userSchema);
