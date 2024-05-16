import express from "express";
import { getProductList, postProduct } from "../../controllers/index.js";
export const productRouter = express.Router();

productRouter.get("/", getProductList);
productRouter.post("/add-product", postProduct);
