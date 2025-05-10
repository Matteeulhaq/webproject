// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Numeric ID from mock data
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "/src/assets/images/placeholder.jpg" },
  category: { type: String, required: true },
  sellerId: { type: String, ref: "User", required: true }, // References User._id
  description: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);