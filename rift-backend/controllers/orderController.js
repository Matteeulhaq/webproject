const Order = require('../models/Order');

// Controller to get all orders of a user
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user
        const orders = await Order.find({ user: userId });

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: error.message,
        });
    }
};
const createOrder = async (req, res) => {
    try {
        const { userId, products } = req.body;
        const newOrder = new Order({ user: userId, products });
        await newOrder.save();

        res.status(201).json({
            success: true,
            data: newOrder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error.message,
        });
    }
};

module.exports = {
    getUserOrders,
    createOrder,
};