// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure unique product per user cart
cartSchema.index({ userId: 1, "items.productId": 1 }, { unique: true });

module.exports = mongoose.model("Cart", cartSchema);