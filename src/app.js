const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productController = require("../src/controllers/productController");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración de Handlebars como motor de plantillas
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middleware para el manejo de datos JSON
app.use(express.json());

// Rutas de productos y carritos
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

// Ruta de la página de inicio
app.get("/", (req, res) => {
  const products = productController.getProducts();
  res.render("home", { products });
});

// Ruta de la vista de productos en tiempo real
app.get("/realtimeproducts", (req, res) => {
  const products = productController.getProducts();
  res.render("realTimeProducts", { products });
});

// Configuración de Socket.IO
io.on("connection", (socket) => {
  console.log("A user connected");

  // Emitir lista de productos en tiempo real al cliente
  const products = productController.getProducts();
  socket.emit("products", products);

  // Manejar eventos de creación y eliminación de productos
  socket.on("createProduct", (product) => {
    productController.createProduct(product);
    io.emit("products", productController.getProducts());
  });

  socket.on("deleteProduct", (productId) => {
    productController.deleteProduct(productId);
    io.emit("products", productController.getProducts());
  });

  // Manejar evento de desconexión del cliente
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Inicio del servidor
const port = 8080;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
