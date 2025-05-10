// routes/index.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to RIFT API" });
});

router.use("/products", require("./products"));
router.use("/users", require("./users"));

module.exports = router;