const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "..", "data", "products.json");

function getProducts() {
  const productsData = fs.readFileSync(productsPath, "utf8");
  return JSON.parse(productsData);
}

function saveProducts(products) {
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), "utf8");
}

function getProductById(productId) {
  const products = getProducts();
  return products.find((product) => product.id === productId);
}

function createProduct(productData) {
  const products = getProducts();
  const newProduct = { id: Date.now().toString(), ...productData };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

function updateProduct(productId, productData) {
  const products = getProducts();
  const updatedProducts = products.map((product) => {
    if (product.id === productId) {
      return { ...product, ...productData };
    }
    return product;
  });
  saveProducts(updatedProducts);
  return getProductById(productId);
}

function deleteProduct(productId) {
  const products = getProducts();
  const updatedProducts = products.filter(
    (product) => product.id !== productId
  );
  saveProducts(updatedProducts);
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
