// productController.js

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const productsFilePath =
  "C:\\Users\\Lucas\\Desktop\\PreEntrega1-LucasVargas\\src\\data\\products.json";

// Obtener todos los productos
const getAllProducts = (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
  res.json(products);
};

// Obtener un producto por su ID
const getProductById = (req, res) => {
  const { pid } = req.params;
  const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
  const product = products.find((p) => p.id === pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Agregar un nuevo producto
const addProduct = (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  const newProduct = {
    id: uuidv4(),
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails,
  };
  const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
  products.push(newProduct);
  fs.writeFileSync(productsFilePath, JSON.stringify(products));
  res.status(201).json(newProduct);
};

// Actualizar un producto existente
const updateProduct = (req, res) => {
  const { pid } = req.params;
  const updatedFields = req.body;
  const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
  const productIndex = products.findIndex((p) => p.id === pid);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedFields };
    fs.writeFileSync(productsFilePath, JSON.stringify(products));
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Eliminar un producto por su ID
const deleteProduct = (req, res) => {
  const { pid } = req.params;
  const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
  const updatedProducts = products.filter((p) => p.id !== pid);
  if (products.length !== updatedProducts.length) {
    fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts));
    res.json({ message: "Product deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
