import express from "express";
import dotenv from "dotenv";
import { PORT, baseUrl, connectDB } from "./src/config/index.js";
import { categoryRouter } from "./src/routes/admin/index.js";
import { productRouter } from "./src/routes/common/index.js";
import { userRouter } from "./src/routes/website/index.js";
import { reviewRouter } from "./src/routes/website/reviews/index.js";
import multer from "multer";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

// Configure multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    // Use the original name of the file with its extension
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    callback(null, basename + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Make the 'uploads' folder accessible
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    console.log("file received", req.file);
    const host = req.hostname;
    const filePath =
      req.protocol + "://" + host + "/uploads/" + req.file.filename;
    return res.send({
      success: true,
      filePath: filePath,
    });
  }
});

// Server running and database connection
app.listen(PORT, () => {
  console.log(`App running on ${baseUrl}`);
});
connectDB();
