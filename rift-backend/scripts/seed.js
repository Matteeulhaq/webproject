// scripts/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const connectDB = require("../config/db");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const mockUsers = [
  {
    id: "user1",
    username: "thriftking",
    password: "password123",
    email: "thriftking@example.com",
    avatar: "/src/assets/images/placeholder.jpg",
    followers: [],
    following: [],
    role: "user",
  },
  {
    id: "user2",
    username: "styleguru",
    password: "pass456",
    email: "styleguru@example.com",
    avatar: "/src/assets/images/placeholder.jpg",
    followers: [],
    following: [],
    role: "user",
  },
  {
    id: "admin1",
    username: "admin",
    password: "admin123",
    email: "admin@example.com",
    avatar: "/src/assets/images/placeholder.jpg",
    followers: [],
    following: [],
    role: "admin",
  },
];

const mockProducts = [
  {
    id: 1,
    name: "Vintage Denim Jacket",
    price: 45.99,
    image: "/src/assets/images/placeholder.jpg",
    category: "Jackets",
    sellerId: "user1",
    description: "Classic blue denim jacket, slightly worn for that perfect vintage look.",
  },
  {
    id: 2,
    name: "Graphic Tee",
    price: 14.99,
    image: "/src/assets/images/placeholder.jpg",
    category: "Tops",
    sellerId: "user2",
    description: "Black tee with bold graphic print, great for casual outfits.",
  },
  {
    id: 3,
    name: "Slim Fit Chinos",
    price: 29.99,
    image: "/src/assets/images/placeholder.jpg",
    category: "Bottoms",
    sellerId: "user1",
    description: "Comfortable beige chinos, perfect for smart-casual looks.",
  },
  {
    id: 4,
    name: "Leather Sneakers",
    price: 59.99,
    image: "/src/assets/images/placeholder.jpg",
    category: "Shoes",
    sellerId: "user3",
    description: "White leather sneakers, stylish and versatile.",
  },
  {
    id: 5,
    name: "Wool Trench Coat",
    price: 89.99,
    image: "/src/assets/images/placeholder.jpg",
    category: "Jackets",
    sellerId: "user2",
    description: "Elegant black trench coat, ideal for cooler days.",
  },
  {
    id: 6,
    name: "High-Waisted Jeans",
    price: 39.99,
    image: "/src/assets/images/placeholder.jpg",
    category: "Bottoms",
    sellerId: "user1",
    description: "Dark wash jeans with a flattering high-waisted fit.",
  },
  {
    id: 7,
    name: "Running Shoes",
    price: 49.99,
    image: "/src/assets/images/placeholder.jpg",
    category: "Shoes",
    sellerId: "user3",
    description: "Lightweight running shoes with excellent support.",
  },
  {
    id: 8,
    name: "Crew Neck Sweater",
    price: 24.99,
    image: "/src/assets/images/placeholder.jpg",
    category: "Tops",
    sellerId: "user2",
    description: "Soft cotton sweater in navy blue, great for layering.",
  },
];

const mockOrders = [
  {
    id: "order1",
    userId: "user1",
    items: [{ productId: 1, quantity: 1, price: 45.99 }],
    total: 45.99,
    address: {
      street: "123 Thrift St",
      city: "Fashion City",
      state: "CA",
      zip: "90210",
    },
    billing: {
      cardNumber: "**** **** **** 1234",
      expiration: "12/25",
      cvv: "***",
    },
    status: "Delivered",
    date: "2025-04-20T10:00:00Z",
  },
  {
    id: "order2",
    userId: "user1",
    items: [{ productId: 2, quantity: 2, price: 14.99 }],
    total: 29.98,
    address: {
      street: "456 Style Ave",
      city: "Trend Town",
      state: "NY",
      zip: "10001",
    },
    billing: {
      cardNumber: "**** **** **** 5678",
      expiration: "06/26",
      cvv: "***",
    },
    status: "Pending",
    date: "2025-04-22T15:00:00Z",
  },
];

const seedDB = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    // Transform and insert users with hashed passwords
    const users = await Promise.all(
      mockUsers.map(async (user) => ({
        _id: user.username,
        username: user.username,
        password: await bcrypt.hash(user.password, 10),
        email: user.email,
        avatar: user.avatar,
        followers: user.followers,
        following: user.following,
        role: user.role,
      }))
    );
    await User.insertMany(users);
    console.log("Users seeded:", users.map((u) => u.username));

    // Transform products (update sellerId to username)
    const products = mockProducts.map((product) => ({
      ...product,
      sellerId: product.sellerId === "user1" ? "thriftking" : product.sellerId === "user2" ? "styleguru" : "sneakerhead",
    }));
    await Product.insertMany(products);
    console.log("Products seeded:", products.map((p) => p.name));

    // Transform orders (update userId to username)
    const orders = mockOrders.map((order) => ({
      ...order,
      userId: order.userId === "user1" ? "thriftking" : order.userId === "user2" ? "styleguru" : "sneakerhead",
    }));
    await Order.insertMany(orders);
    console.log("Orders seeded:", orders.map((o) => o.id));

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();