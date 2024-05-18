import express from "express";
import dotenv from "dotenv";
import {
  categoryRouter,
  productRouter,
  userRouter,
} from "./src/routes/index.js";
import { PORT, baseUrl, connectDB } from "./src/config/index.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter);

// Server runing and database connecton
app.listen(PORT, () => {
  console.log(`App running on ${baseUrl}`);
});
connectDB();
