import { Product, Review } from "../../../models/index.js";

// Get reviews list
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    if (!reviews) {
      res.status(404).json({
        success: false,
        error: "reviews not found",
      });
    }
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Get review by id
export const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      res.status(404).json({
        success: false,
        error: "Review not found",
      });
    }
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
// Get product reviews
export const getProductReviews = async (req, res) => {
  try {
    const productId = req.body.productId;

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    const reviews = await Review.find({ product: productId });
    res.status(200).json({
      success: true,
      reviews,
    });
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Post a review
export const postReview = async (req, res) => {
  try {
    const createdReview = new Review({
      product: req.body.product,
      reviewer_name: req.body.reviewer_name,
      reviewer_profile: req.body.reviewer_profile,
      review: req.body.review,
      stars: req.body.stars,
    });

    const review = await createdReview.save();
    if (!review) {
      res.status(404).json({
        success: false,
        error: "review can't be created",
      });
    }
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      res.status(404).json({
        success: false,
        error: "Review not found",
      });
    }
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};

// Update review
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndUpdate(id, {
      product: req.body.product,
      reviewer_name: req.body.reviewer_name,
      reviewer_profile: req.body.reviewer_profile,
      review: req.body.review,
      stars: req.body.stars,
    });
    if (!review) {
      res.status(400).json({
        success: false,
        error: "The review can't be updated",
      });
    }
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};
