import mongoose from "mongoose";
const { Schema } = mongoose;

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: String,
    color: String,
  },
  { timestamps: true }
);

export const Category = mongoose.model("Categories", categoriesSchema);
