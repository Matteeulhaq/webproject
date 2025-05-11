const express = require('express');
const cartController = require('../../controllers/cartController');

const router = express.Router();
const { auth } = require("../../middleware/auth");

// Route to get all items in the cart
router.get('/', auth, cartController.printCart);
// Route to add an item to the cart
router.post('/', auth, cartController.addToCart);
// Route to remove an item from the cart
router.delete('/:productId', auth, cartController.removeFromCart);



module.exports = router;