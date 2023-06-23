const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", (req, res) => {
  const carts = cartController.getCarts();
  res.json(carts);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const cart = cartController.getCartById(id);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

router.post("/", (req, res) => {
  const cartData = req.body;
  const newCart = cartController.createCart(cartData);
  res.status(201).json(newCart);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const cartData = req.body;
  const updatedCart = cartController.updateCart(id, cartData);
  if (updatedCart) {
    res.json(updatedCart);
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  cartController.deleteCart(id);
  res.status(204).end();
});

module.exports = router;
