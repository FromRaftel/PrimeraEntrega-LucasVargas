// productRoutes.js

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Ruta GET /api/products/
// Listar todos los productos
router.get("/", productController.getAllProducts);

// Ruta GET /api/products/:pid
// Obtener un producto por su ID
router.get("/:pid", productController.getProductById);

// Ruta POST /api/products/
// Agregar un nuevo producto
router.post("/", productController.addProduct);

// Ruta PUT /api/products/:pid
// Actualizar un producto existente
router.put("/:pid", productController.updateProduct);

// Ruta DELETE /api/products/:pid
// Eliminar un producto por su ID
router.delete("/:pid", productController.deleteProduct);

module.exports = router;
