const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", (req, res) => {
  const products = productController.getProducts();
  res.json(products);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = productController.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.post("/", (req, res) => {
  const productData = req.body;
  const newProduct = productController.createProduct(productData);
  res.status(201).json(newProduct);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  const updatedProduct = productController.updateProduct(id, productData);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  productController.deleteProduct(id);
  res.status(204).end();
});

module.exports = router;
