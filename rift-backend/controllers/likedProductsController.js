// controllers/likedProductsController.js
const LikedProduct = require('../models/LikedProducts'); 

// Controller to fetch and display liked products
exports.getLikedProducts = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in the request object
        const likedProducts = await LikedProduct.find({ userId }).populate('product'); // Populate product details

        if (!likedProducts || likedProducts.length === 0) {
            return res.status(404).json({ message: 'No liked products found.' });
        }

        res.status(200).json({ likedProducts });
    } catch (error) {
        console.error('Error fetching liked products:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
// Controller to add a product to liked products
exports.addLikedProduct = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in the request object
        const { productId } = req.body; // Product ID to be liked

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required.' });
        }

        const existingLikedProduct = await LikedProduct.findOne({ userId, productId });

        if (existingLikedProduct) {
            return res.status(400).json({ message: 'Product already liked.' });
        }

        const newLikedProduct = new LikedProduct({ userId, productId });
        await newLikedProduct.save();

        res.status(201).json({ message: 'Product liked successfully.', newLikedProduct });
    } catch (error) {
        console.error('Error adding liked product:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
// Controller to remove a product from liked products
exports.removeLikedProduct = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in the request object
        const { productId } = req.params; // Product ID to be unliked

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required.' });
        }

        const likedProduct = await LikedProduct.findOneAndDelete({ userId, productId });

        if (!likedProduct) {
            return res.status(404).json({ message: 'Liked product not found.' });
        }

        res.status(200).json({ message: 'Product unliked successfully.', likedProduct });
    } catch (error) {
        console.error('Error removing liked product:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};