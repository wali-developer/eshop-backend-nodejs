import { Category } from "../../../models/index.js";

// Get categories list
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      res.status(404).json({
        success: false,
        error: "Categories not found",
      });
    }
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Get category by id
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Post a Category
export const postCategory = async (req, res) => {
  try {
    const cat = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });

    const category = await cat.save();
    if (!category) {
      res.status(404).json({
        success: false,
        error: "Category can't be created",
      });
    }
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });
    if (!category) {
      res.status(400).json({
        success: false,
        error: "The cateory can't be updated",
      });
    }
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};
