import express from "express";
import {
  getAllCategories,
  getCategory,
  deleteCategory,
  updateCategory,
  postCategory,
} from "../../controllers/index.js";
export const categoryRouter = express.Router();

categoryRouter.post("/add-category", postCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.put("/:id", updateCategory);
