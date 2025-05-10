// routes/products/index.js
const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../../controllers/productController");
const { auth, adminAuth } = require("../../middleware/auth");

router.post("/", auth, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, adminAuth, deleteProduct);

module.exports = router;