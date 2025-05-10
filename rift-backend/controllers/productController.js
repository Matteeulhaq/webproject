// controllers/productController.js
const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const { id, name, price, image, category, description } = req.body;
    if (!id || !name || !price || !category || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingProduct = await Product.findOne({ id });
    if (existingProduct) {
      return res.status(400).json({ message: "Product ID already exists" });
    }

    const product = new Product({
      id,
      name,
      price,
      image: image || "/src/assets/images/placeholder.jpg",
      category,
      sellerId: req.user.id, // username from JWT
      description,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("sellerId", "username");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id }).populate(
      "sellerId",
      "username"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, image, category, description } = req.body;
    const product = await Product.findOne({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.image = image || product.image;
    product.category = category || product.category;
    product.description = description || product.description;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};