const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");

// Get product list
router.get("/", (req, res) => {
  Product.find()
    .then((products) => {
      res.status(201).json(products);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Post a product
router.post("/add-product", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    images: req.body.images,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  try {
    const cat = await Category.findById(req.body.category);
    if (!cat) {
      res.status(400).send("Invalid category");
    }

    const prod = await product.save();
    if (!prod) {
      res.status(500).send("The Product can't be created!");
    }
    res.status(200).send({
      message: "Product created successfully!",
      ...prod,
    });
  } catch (error) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }
});

module.exports = router;
