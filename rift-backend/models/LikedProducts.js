// models/LikedProducts.js
const mongoose = require("mongoose");

const likedProductsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  likedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure unique user-product like
likedProductsSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("LikedProducts", likedProductsSchema);