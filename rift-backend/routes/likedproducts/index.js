const express = require('express');

const router = express.Router();

const {
    getLikedProducts,
    addLikedProduct,
    removeLikedProduct,
} = require('../../controllers/likedProductsController');
const { auth } = require("../../middleware/auth");
// Route to fetch liked products
router.get('/', auth, getLikedProducts);
// Route to add a product to liked products
router.post('/', auth, addLikedProduct);
// Route to remove a product from liked products
router.delete('/:productId', auth, removeLikedProduct);

module.exports = router;
