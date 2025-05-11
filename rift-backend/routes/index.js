// routes/index.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to RIFT API" });
});

router.use("/products", require("./products"));
router.use("/users", require("./users"));
router.use("/cart", require("./cart"));
router.use("/liked", require("./likedproducts"));
router.use("/orders", require("./orders"));

module.exports = router;