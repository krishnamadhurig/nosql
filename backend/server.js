const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();


// Middleware to read JSON
app.use(express.json());


// Connect MongoDB
connectDB();


// Create User Route
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Find User By ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.delete("/cart/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find user
    const user = await User.findById(userId);

    // Remove product from cart
    user.cart = user.cart.filter(
      (item) => item.toString() !== productId
    );

    // Save updated cart
    await user.save();

    res.json({
      message: "Product deleted from cart",
      cart: user.cart,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});