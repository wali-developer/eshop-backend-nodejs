import express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import {
  deleteProduct,
  getProductDetails,
  getProductList,
  postProduct,
  updateProduct,
} from "../../../controllers/common/index.js";

export const productRouter = express.Router();

productRouter.get("/", getProductList);
productRouter.post("/add-product", upload.single("file"), postProduct);
productRouter.get("/:id", getProductDetails);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", updateProduct);
