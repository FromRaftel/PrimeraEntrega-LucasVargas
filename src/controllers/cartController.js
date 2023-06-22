// cartController.js

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const cartsFilePath = "./src/data/carts.json";

// Crear un nuevo carrito
const createCart = (req, res) => {
  const newCart = {
    id: uuidv4(),
    products: [],
  };
  const carts = JSON.parse(fs.readFileSync(cartsFilePath, "utf-8"));
  carts.push(newCart);
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts));
  res.status(201).json(newCart);
};

// Obtener un carrito por su ID
const getCartById = (req, res) => {
  const { cid } = req.params;
  const carts = JSON.parse(fs.readFileSync(cartsFilePath, "utf-8"));
  const cart = carts.find((c) => c.id === cid);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
};

// Agregar un producto a un carrito
const addProductToCart = (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const carts = JSON.parse(fs.readFileSync(cartsFilePath, "utf-8"));
  const cartIndex = carts.findIndex((c) => c.id === cid);
  if (cartIndex !== -1) {
    const productIndex = carts[cartIndex].products.findIndex(
      (p) => p.product === pid
    );
    if (productIndex !== -1) {
      carts[cartIndex].products[productIndex].quantity += quantity;
    } else {
      carts[cartIndex].products.push({ product: pid, quantity });
    }
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts));
    res.json(carts[cartIndex]);
  } else {
    res.status(404).json({ message: "Cart not found" });
  }
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
};
