// controllers/cartController.js
const cart = require('../models/Cart');
exports.printCart = async (req, res) => {
  try {
    const cartItems = await cart.find({ userId: req.user.id }).populate('productId');
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const existingCartItem = await cart.findOne({ userId: req.user.id, productId });
    if (existingCartItem) {
      return res.status(400).json({ message: 'Product already in cart' });
    }

    const newCartItem = new cart({
      userId: req.user.id,
      productId,
    });

    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const cartItem = await cart.findOneAndDelete({ userId: req.user.id, productId });
    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
