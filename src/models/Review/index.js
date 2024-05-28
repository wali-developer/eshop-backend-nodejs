import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    reviewer_name: {
      type: String,
      required: true,
    },
    reviewer_profile: String,
    review: {
      type: String,
      required: true,
    },
    stars: Number,
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
