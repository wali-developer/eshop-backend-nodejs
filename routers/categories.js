const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Get categories list
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      res.status(404).send("Categories not found");
    }
    res.status(200).send(categories);
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
});

// Get category by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).send("Category not found");
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
});

// Get category by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      res.status(404).send("Category not found");
    }
    res.status(200).json({
      message: "Cateory deleted successfully!",
      category: category,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
});

// Get category by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });
    if (!category) {
      res.status(400).send("The cateory can't be updated");
    }
    res.status(200).json({
      message: "Cateory updated successfully!",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
});

// Post a Category
router.post("/add-category", async (req, res) => {
  const cat = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  try {
    const category = await cat.save();
    if (!category) {
      res.status(404).send("Category can't be created");
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

module.exports = router;
