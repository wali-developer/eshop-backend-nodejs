import Joi from "joi";
import { Category, Product } from "../../../models/index.js";

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  richDescription: Joi.string(),
  image: Joi.string().required(),
  images: Joi.array(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  countInStock: Joi.number().required(),
  rating: Joi.string().optional(),
  numReviews: Joi.string().optional(),
  isFeatured: Joi.string().optional(),
});

// Post a product
export const postProduct = async (req, res) => {
  console.log(req.file);
  console.log(req.images);
  return;

  const message = productSchema.validate({ ...req.body });
  if (message.error) {
    const err = {};
    const fieldName = message.error.details[0]?.context.label;
    err[fieldName] = message.error.details[0].message;

    res.status(422).json({
      success: false,
      error: err,
    });
  } else {
    try {
      const cat = await Category.findById(req.body.category);
      if (!cat) {
        res.status(400).json({
          success: false,
          error: "Invalid category",
        });
      }

      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      });

      const prod = await product.save();
      if (!prod) {
        res.status(500).json({
          success: false,
          error: "The Product can't be created!",
        });
      }
      res.status(200).json({
        success: true,
        product: prod,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  }
};

// Get product list
export const getProductList = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Get product details
export const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, {
      ...req.body,
    });
    if (!product) {
      res.status(400).json({
        success: false,
        error: "The product can't be updated",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};
