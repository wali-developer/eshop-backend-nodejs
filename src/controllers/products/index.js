import { Product } from "../../models/index.js";

// Get product list
export const getProductList = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(404).json({
        success: false,
        error: "Products not found",
      });
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Post a product
export const postProduct = async (req, res) => {
  try {
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

    const cat = await Category.findById(req.body.category);
    if (!cat) {
      res.status(400).json({
        success: false,
        error: "Invalid category",
      });
    }

    const prod = await product.save();
    if (!prod) {
      res.status(500).json({
        success: false,
        error: "The Product can't be created!",
      });
    }
    res.status(200).json({
      success: true,
      ...prod,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};
