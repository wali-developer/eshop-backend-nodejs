const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const products = require("./routers/products");
const categories = require("./routers/categories");

dotenv.config();
const PORT = 3000 || process.env.PORT;
const app = express();
app.use(express.json());

app.use("/api/products", products);
app.use("/api/categories", categories);

// Server runing and database connecton
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
connectDB();
