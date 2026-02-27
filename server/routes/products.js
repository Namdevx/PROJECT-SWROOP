const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET /api/products - list all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/products/:id - single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Invalid product id" });
  }
});

// POST /api/products - create product
router.post("/", async (req, res) => {
  try {
    const { name, category, imageUrl, description, price } = req.body;
    const product = new Product({
      name,
      category,
      imageUrl,
      description,
      price,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
});

module.exports = router;
