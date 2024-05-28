import express from "express";
import {
  postCategory,
  getAllCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} from "../../../controllers/admin/index.js";
export const categoryRouter = express.Router();

categoryRouter.post("/add-category", postCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.put("/:id", updateCategory);
