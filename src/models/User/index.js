import mongoose from "mongoose";
const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: String,
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("Users", usersSchema);
