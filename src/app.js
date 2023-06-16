// app.js

const express = require("express");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
