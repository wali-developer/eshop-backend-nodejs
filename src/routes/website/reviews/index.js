import express from "express";
import {
  deleteReview,
  getAllReviews,
  getReview,
  postReview,
  updateReview,
} from "../../../controllers/website/reviews/index.js";
export const reviewRouter = express.Router();

reviewRouter.post("/add-review", postReview);
reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:id", getReview);
reviewRouter.delete("/:id", deleteReview);
reviewRouter.put("/:id", updateReview);
