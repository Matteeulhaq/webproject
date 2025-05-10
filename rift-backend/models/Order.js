// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // String ID from mock data
  userId: { type: String, ref: "User", required: true }, // References User._id
  items: [
    {
      productId: { type: Number, required: true }, // Matches Product.id
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  billing: {
    cardNumber: { type: String, required: true },
    expiration: { type: String, required: true },
    cvv: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["Pending", "Delivered", "Cancelled"],
    default: "Pending",
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);