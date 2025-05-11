const express = require('express');
const orderController = require('../../controllers/orderController');

const router = express.Router();

// Route to get all orders
router.get('/', orderController.getUserOrders);
// Route to create a new order
router.post('/', orderController.createOrder);


module.exports = router;