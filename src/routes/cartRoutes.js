// cartRoutes.js

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Ruta POST /api/carts/
// Crear un nuevo carrito
router.post("/", cartController.createCart);

// Ruta GET /api/carts/:cid
// Obtener un carrito por su ID
router.get("/:cid", cartController.getCartById);

// Ruta POST /api/carts/:cid/product/:pid
// Agregar un producto a un carrito
router.post("/:cid/product/:pid", cartController.addProductToCart);

module.exports = router;
