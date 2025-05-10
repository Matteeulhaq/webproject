// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // username as primary key
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: "/src/assets/images/placeholder.jpg" },
  followers: [{ type: String, ref: "User" }], // References User._id
  following: [{ type: String, ref: "User" }],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Ensure _id and username are the same
userSchema.pre("save", function (next) {
  if (this._id !== this.username) {
    this._id = this.username;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);