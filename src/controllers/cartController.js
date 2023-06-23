const fs = require("fs");
const path = require("path");

const cartsPath = path.join(__dirname, "..", "data", "carts.json");

function getCarts() {
  const cartsData = fs.readFileSync(cartsPath, "utf8");
  return JSON.parse(cartsData);
}

function saveCarts(carts) {
  fs.writeFileSync(cartsPath, JSON.stringify(carts, null, 2), "utf8");
}

function getCartById(cartId) {
  const carts = getCarts();
  return carts.find((cart) => cart.id === cartId);
}

function createCart(cartData) {
  const carts = getCarts();
  const newCart = { id: Date.now().toString(), ...cartData };
  carts.push(newCart);
  saveCarts(carts);
  return newCart;
}

function updateCart(cartId, cartData) {
  const carts = getCarts();
  const updatedCarts = carts.map((cart) => {
    if (cart.id === cartId) {
      return { ...cart, ...cartData };
    }
    return cart;
  });
  saveCarts(updatedCarts);
  return getCartById(cartId);
}

function deleteCart(cartId) {
  const carts = getCarts();
  const updatedCarts = carts.filter((cart) => cart.id !== cartId);
  saveCarts(updatedCarts);
}

module.exports = {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
};
