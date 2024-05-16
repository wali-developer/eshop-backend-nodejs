import mongoose from "mongoose";
const { Schema } = mongoose;

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: String,
  color: String,
});

export const Category = mongoose.model("Categories", categoriesSchema);
